import { useMemo } from "react";
import { CloudsObject, GeoPosition, Clouds } from "../constants/types";
import { orderByDistance } from "geolib";
import { useClouds } from "./";

type OrganizedClouds = {
  [provider: string]: {
    [region: string]: Clouds;
  };
};

/**
 * Gets the clouds from the backend and builds a structured object to access
 * them easily by providers and by regions.
 * In case a geo location is provided, sorts clouds for each provider and
 * region.
 *
 * @param cloudsObject - an initial clouds organized object created during
 *   the SSG phase.
 * @param location - the geo coordinates to sort clouds by shortest distance
 *   to that point.
 * @returns the organized object containing the clouds.
 */
function useOrganizedClouds(
  cloudsObject: CloudsObject,
  location: GeoPosition
): OrganizedClouds {
  const { clouds } = useClouds(cloudsObject);
  return useMemo(
    function generateOrganizedClouds() {
      const structuredClouds: OrganizedClouds = {};
      for (const cloud of clouds) {
        if (!(cloud.cloud_provider in structuredClouds)) {
          structuredClouds[cloud.cloud_provider] = {};
        }
        if (!(cloud.cloud_region in structuredClouds[cloud.cloud_provider])) {
          structuredClouds[cloud.cloud_provider][cloud.cloud_region] = [];
        }
        structuredClouds[cloud.cloud_provider][cloud.cloud_region].push(cloud);
      }

      if (location) {
        for (const provider in structuredClouds) {
          for (const region in structuredClouds[provider]) {
            structuredClouds[provider][region] = orderByDistance(
              location,
              structuredClouds[provider][region]
            ) as Clouds;
          }
        }
      }
      return structuredClouds;
    },
    [clouds, location]
  );
}

export default useOrganizedClouds;
