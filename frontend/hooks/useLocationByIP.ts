import { useEffect } from "react";
import axios from "axios";
import { API_PATHS } from "../constants/paths";
import { GeoPosition, isGeoPositionResponse } from "../constants/types";

/**
 * Sends a query to an external service to get our geographical
 * coordinates based on our IP address.
 *
 * @param setLocationData - function to be called with the geo coordinates.
 */
function useLocationByIP(
  setLocationData: (locationValue: GeoPosition) => void
): void {
  useEffect(function getLocationFromServer() {
    axios
      .get(API_PATHS.locationByIP)
      .then((result: unknown) => {
        if (result && isGeoPositionResponse(result)) {
          setLocationData(result.data);
        }
      })
      .catch(() => {
        // in case of error here we don't do anything because the
        // user doesn't need to know that this ordering failed.
      });
  }, []);
}

export default useLocationByIP;
