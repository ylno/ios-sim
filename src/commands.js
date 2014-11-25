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
    simctl = require('simctl');

var command_lib = {
    
    showsdks : function(args) {
        // TODO:
        console.log("TODO: showsdks");
        /* Legacy:
Simulator SDK Roots:
'iOS 7.0' (7.0)
	/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator7.0.sdk
'iOS 8.1' (8.1)
	/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator.sdk
'iOS 7.1' (7.1)
	/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator7.1.sdk        */
    },
    
    showdevicetypes : function(args) {
        // TODO:
        console.log("TODO: showdevicetypes");
        
        /* Legacy:
com.apple.CoreSimulator.SimDeviceType.iPhone-4s, 8.1
com.apple.CoreSimulator.SimDeviceType.iPhone-5, 8.1
com.apple.CoreSimulator.SimDeviceType.iPhone-5s, 8.1
com.apple.CoreSimulator.SimDeviceType.iPhone-6-Plus, 8.1
com.apple.CoreSimulator.SimDeviceType.iPhone-6, 8.1
com.apple.CoreSimulator.SimDeviceType.iPad-2, 8.1
com.apple.CoreSimulator.SimDeviceType.iPad-Retina, 8.1
com.apple.CoreSimulator.SimDeviceType.iPad-Air, 8.1
com.apple.CoreSimulator.SimDeviceType.Resizable-iPhone, 8.1
com.apple.CoreSimulator.SimDeviceType.Resizable-iPad, 8.1        
        */
    },
    
    launch : function(args) {
        // TODO:
        if (args.argv.remain.length < 2) {
            help();
            process.exit(1);
        }
        console.log("TODO: launch");
    },
    
    start : function(args) {
        // TODO:
        console.log("TODO: start");
    }
}

module.exports = command_lib;

