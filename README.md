ios-sim
=======

Supports Xcode 6 only since version 3.x.

The ios-sim tool is a command-line utility that launches an iOS application on
the iOS Simulator. This allows for niceties such as automated testing without
having to open Xcode.

Features
--------

* Choose the device family to simulate, i.e. iPhone or iPad. Run using "showdevicetypes" option to see available device types, and pass it in as the "devicetypeid" parameter.
* Setup environment variables.
* Pass arguments to the application.
* See the stdout and stderr, or redirect them to files.

See the `--help` option for more info.

Usage
-----

```
Usage: ios-sim <command> <options> [--args ...]

Commands:
  showsdks                        List the available iOS SDK versions
  showdevicetypes                 List the available device types
  launch <application path>       Launch the application at the specified path on the iOS Simulator
  start                           Launch iOS Simulator without an app

Options:
  --version                       Print the version of ios-sim
  --help                          Show this help text
  --exit                          Exit after startup
  --log <log file path>           The path where log of the app running in the Simulator will be redirected to
  --devicetypeid <device type>    The id of the device type that should be simulated (Xcode6+). Use 'showdevicetypes' to list devices.
                                  e.g "com.apple.CoreSimulator.SimDeviceType.Resizable-iPhone6, 8.0"
```

Unsupported arguments from ios-sim 3.x
--------

    --verbose                       Set the output level to verbose
    --env <environment file path>   A plist file containing environment key-value pairs that should be set
    --setenv NAME=VALUE             Set an environment variable
    --timeout <seconds>             The timeout time to wait for a response from the Simulator. Default value: 30 seconds
    --args <...>                    All following arguments will be passed on to the application

These are in the [backlog](https://github.com/phonegap/ios-sim/issues?utf8=✓&q=is%3Aopen+label%3A4.x+label%3Afeature-request)

Installation
------------

With node.js (at least 0.10.20):

    $ npm install ios-sim -g

Download an archive:

    $ curl -L https://github.com/phonegap/ios-sim/zipball/4.1.0 -o ios-sim-4.1.0.zip
    $ unzip ios-sim-4.1.0.zip

Or from a git clone:

    $ git clone git://github.com/phonegap/ios-sim.git


Troubleshooting
------------

Make sure you enable Developer Mode on your machine:

    $ DevToolsSecurity -enable

Make sure multiple instances of launchd_sim are not running:

    $ killall launchd_sim

License
-------

This project is available under the MIT license. See [LICENSE][license].

[license]: https://github.com/phonegap/ios-sim/blob/master/LICENSE
