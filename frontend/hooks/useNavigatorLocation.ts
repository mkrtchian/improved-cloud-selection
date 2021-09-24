import { GeoPosition } from "../constants/types";

/**
 * Gives a function that uses the navigator geolocation API to get the user
 * position.
 *
 * @param setLocationData - the function to be called with the lcoation data
 *   when the user validates the permission to give his location.
 * @returns a function to call when we would like to ask the user for his
 *   location.
 */
function useNavigatorLocation(
  setLocationData: (locationValue: GeoPosition) => void
): () => void {
  return function callNavigatorGeoLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocationData({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      });
    }
  };
}

export default useNavigatorLocation;
