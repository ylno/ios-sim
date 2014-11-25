/*
The MIT License (MIT)

Copyright (c) 2014 Shazron Abdullah

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var path = require('path'),
    fs = require('fs'),
    help = require('./help'),
    simctl,
    bplist;

var command_lib = {
    
    init : function() {
        if (!simctl) {
            simctl = require('simctl');
        }
        var output = simctl.check_prerequisites();
        if (output.code !== 0) {
            console.error(output.output);
            process.exit(2);
        }
        
        if (!bplist) {
            bplist = require('bplist-parser');
        }
    },
    
    showsdks : function(args) {
        var options = { 'runtimes' : true };
        simctl.list(options);
    },
    
    showdevicetypes : function(args) {
        var options = { 'devicetypes': true };
        simctl.list(options);
    },
    
    launch : function(args) {
        var wait_for_debugger = false,
            device = null,
            app_identifier = null,
            argv = [],
            app_path = null,
            info_plist_path = null;

        if (args.argv.remain.length < 2) {
            help();
            process.exit(1);
        }
        
        app_path = args.argv.remain[1];
        info_plist_path = path.join(app_path,'Info.plist');
        if (!fs.existsSync(info_plist_path)) {
            console.error(info_plist_path + " file not found.");
            process.exit(1);
        }
        
        bplist.parseFile(info_plist_path, function(err, obj) {
          if (err) {
              throw err;
          }

          app_identifier = obj[0].CFBundleIdentifier;
          argv = args.args;
        
          // TODO: get the deviceid from --devicetypeid
          // simctl.list needs to return the stdout data in JSON format
          // --devicetypeid is a string in the form "devicetype, runtime_version"
          // simctl.list({ devicetypes: true}) returns list of device types in the form of "devicename (devicetype)"
          // from this, you can get the devicename from the devicetype
          // simctl.list({ devices: true}) returns list of devices in the form of "devicename, (deviceid) (bootstate)". These are listed in sections "iOS runtime_version"
          // From:
          // --devicetypeid --> devicetype, runtime_version
          // devicetype --> devicename
          // devicename, runtime_version -> deviceid
          
          //simctl.launch(wait_for_debugger, deviceid, app_identifier, argv)
        });
    },
    
    start : function(args) {
        // TODO: launch without app
        console.log("TODO: start");
    }
}

module.exports = command_lib;

