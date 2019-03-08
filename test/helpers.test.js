const { parseEnvironmentVariables, __internal } = require('../src/helpers')

describe('when parsing env variables', function () {
  test('should return empty map on null value', function () {
    expect(parseEnvironmentVariables(null)).toEqual({})
  })

  test('should return empty map on undefined value', function () {
    expect(parseEnvironmentVariables(undefined)).toEqual({})
  })

  describe('without simctl fix', function () {
    test('should return valid map for valid env variable', function () {
      expect(parseEnvironmentVariables(['KEY=VALUE'], false)).toEqual({ 'KEY': 'VALUE' })
    })
  })

  describe('with simctl fix', function () {
    test('should add SIMCTL_CHILD_ prefix to all keys', function () {
      expect(parseEnvironmentVariables(['KEY=VALUE', 'KEY2=VALUE2'], true))
        .toEqual(
          {
            'SIMCTL_CHILD_KEY': 'VALUE',
            'SIMCTL_CHILD_KEY2': 'VALUE2'
          }
        )
    })
  })
})

describe('fixDeviceGroup tests', () => {
  test('input gibberish', () => {
    const result = __internal.fixDeviceGroup('23tgweg24gwdgw')
    expect(result).toEqual('23tgweg24gwdgw')
  })

  test('input com.apple.CoreSimulator.SimRuntime.iOS-12-0', () => {
    const result = __internal.fixDeviceGroup('com.apple.CoreSimulator.SimRuntime.iOS-12-0')
    expect(result).toEqual('iOS 12.0')
  })

  test('input com.apple.CoreSimulator.SimRuntime.tvOS-12-1', () => {
    const result = __internal.fixDeviceGroup('com.apple.CoreSimulator.SimRuntime.tvOS-12-1')
    expect(result).toEqual('tvOS 12.1')
  })

  test('input com.apple.CoreSimulator.SimRuntime.watchOS-5-1', () => {
    const result = __internal.fixDeviceGroup('com.apple.CoreSimulator.SimRuntime.watchOS-5-1')
    expect(result).toEqual('watchOS 5.1')
  })

  test('input typo "comX" - comX.apple.CoreSimulator.SimRuntime.iOS-12-0', () => {
    const result = __internal.fixDeviceGroup('comX.apple.CoreSimulator.SimRuntime.iOS-12-0')
    expect(result).toEqual('comX.apple.CoreSimulator.SimRuntime.iOS-12-0')
  })

  test('input typo "iOS 12 0" - com.apple.CoreSimulator.SimRuntime.iOS 12 0', () => {
    const result = __internal.fixDeviceGroup('comX.apple.CoreSimulator.SimRuntime.iOS 12 0')
    expect(result).toEqual('comX.apple.CoreSimulator.SimRuntime.iOS 12 0')
  })
})
