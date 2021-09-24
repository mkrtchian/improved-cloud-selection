type MockNavigatorGeoLocation = {
  clearWatchMock: jest.Mock<any, any>;
  getCurrentPositionMock: jest.Mock<any, any>;
  watchPositionMock: jest.Mock<any, any>;
};

/**
 * Mocks the navigator object in jest tests.
 * cf. https://stackoverflow.com/a/67019816/1774332
 *
 * @returns 3 functions that can get any jest mockImplementation.
 */
function mockNavigatorGeolocation(): MockNavigatorGeoLocation {
  const clearWatchMock = jest.fn();
  const getCurrentPositionMock = jest.fn();
  const watchPositionMock = jest.fn();

  const geolocation = {
    clearWatch: clearWatchMock,
    getCurrentPosition: getCurrentPositionMock,
    watchPosition: watchPositionMock,
  };

  Object.defineProperty(global.navigator, "geolocation", {
    value: geolocation,
  });

  return { clearWatchMock, getCurrentPositionMock, watchPositionMock };
}

type NavigatorPosition = {
  coords: {
    longitude: number;
    latitude: number;
  };
};

export { mockNavigatorGeolocation };
export type { NavigatorPosition };
