const TheCommand = require('../../src/commands/showdevicetypes')
const { stdout } = require('stdout-stderr')

jest.mock('simctl')
const simctl = require('simctl')

let command
beforeEach(() => {
  command = new TheCommand([])
})

test('showsdks', function () {
  const json = fixtureJson('simctl-list.json')
  simctl.list = jest.fn(() => {
    return {
      json
    }
  })

  return command.run().then((result) => {
    expect(stdout.output).toMatch(fixtureFile('showdevicetypes.txt'))
  })
})

// see https://github.com/ios-control/ios-sim/issues/234
test('showsdks - device key in the form of com.apple.CoreSimulator.SimRuntime.XXXX', function () {
  const json = fixtureJson('simctl-list-issue-234.json')
  simctl.list = jest.fn(() => {
    return {
      json
    }
  })

  return command.run().then((result) => {
    expect(stdout.output).toMatch(fixtureFile('showdevicetypes-issue-234.txt'))
  })
})
