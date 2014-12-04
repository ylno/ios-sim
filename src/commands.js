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
    util = require('util'),
    simctl,
    bplist;


function processDeviceTypeId(devicetypeid) {
    // the object to return
    var ret_obj = {
        name : null,
        id : null,
        runtime : null
    };
    
    var arr = [];
    if (devicetypeid) {
        arr = devicetypeid.split(',');
    }
    
    // get the deviceid from --devicetypeid
    // --devicetypeid is a string in the form "devicetype, runtime_version" (optional: runtime_version)
    if (arr.length < 1) {
      console.error('--devicetypeid was not specified.');
      process.exit(1);
    }

    var devicetype = arr[0].trim();
    
    if (arr.length > 1) {
        ret_obj.runtime = arr[1].trim();
    }
    
    // now find the devicename from the devicetype
    var options = { 'silent': true };
    var list = simctl.list(options).json;
    
    for (var i=0; i < list.devicetypes.length; ++i) {
        if (list.devicetypes[i].id === devicetype) {
            ret_obj.name = list.devicetypes[i].name;
        }
    }
    
    // device name not found, exit
    if (!ret_obj.name) {
      console.error(util.format('Device type "%s" could not be found.', devicetype));
      process.exit(1);
    }
    
    // if runtime_version was not specified, we use a default. Use first available
    var check_runtime_availability = true;
    
    if (!ret_obj.runtime) {
        for (var i=0; i < list.runtimes.length; ++i) {
            if (list.runtimes[i].available) {
                ret_obj.runtime = list.runtimes[i].name;
                check_runtime_availability = false;
                break;
            }
        }
    }
    
    // prepend iOS to runtime version, if necessary
    if (ret_obj.runtime.indexOf('iOS') === -1) {
        ret_obj.runtime = util.format('iOS %s', ret_obj.runtime);
    }

    var runtime_found = !check_runtime_availability;
    
    if (check_runtime_availability) {
        for (var i=0; i < list.runtimes.length; ++i) {
            if (list.runtimes[i].name === ret_obj.runtime && list.runtimes[i].available) {
                runtime_found = true;
                break;
            }
        }
    }
    
    if (!runtime_found) {
        console.error(util.format('Runtime "%s" could not be found, or is not available.', ret_obj.runtime));
        process.exit(1);
    }
    
    // now find the deviceid
    var deviceid;
    for (var i=0; i < list.devices.length; ++i) {
        if (list.devices[i].runtime === ret_obj.runtime) { // found the runtime, now find the actual device matching devicename
            var devlist = list.devices[i].devices;
            for (var j=0; j < devlist.length; ++j) {
                if (devlist[j].name === ret_obj.name) {
                    ret_obj.id = devlist[j].id;
                }
            }
        }
    }
    
    if (!ret_obj.id) {
        console.error(util.format('Device id for device "%s" and runtime "%s" could not be found, or is not available.', ret_obj.name, ret_obj.runtime));
        process.exit(1);
    }
    
    return ret_obj;
}

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
            app_identifier,
            argv,
            app_path,
            info_plist_path;

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
            argv = args.args || [];

            // get the deviceid from --devicetypeid
            // --devicetypeid is a string in the form "devicetype, runtime_version" (optional: runtime_version)
            var device = processDeviceTypeId(args.devicetypeid);
            
            // so now we have the deviceid, we can proceed
            simctl.extensions.start(device.id);
            simctl.install(device.id, app_path);
            simctl.launch(wait_for_debugger, device.id, app_identifier, argv);
            simctl.extensions.log(device.id, args.log);
        });
    },
    
    start : function(args) {
        var device = {};
        try  {
            device = processDeviceTypeId(args.devicetypeid);
        } catch (e) {
            // do nothing
        }
        
        simctl.extensions.start(device.id);
    }
}

module.exports = command_lib;

