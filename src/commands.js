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
    help = require('./help'),
    simctl;

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
            app_path = null;

        if (args.argv.remain.length < 2) {
            help();
            process.exit(1);
        }
        
        app_path = args.argv.remain[1];
        argv = args.args;
        
        // TODO: get the app_identifier from the app_path
        // TODO: get the device from --devicetypeid
        
        simctl(wait_for_debugger, device, app_identifier, argv)
    },
    
    start : function(args) {
        // TODO: launch without app
        console.log("TODO: start");
    }
}

module.exports = command_lib;

