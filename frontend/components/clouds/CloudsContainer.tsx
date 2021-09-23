import { useState, useMemo } from "react";
import { Clouds, GeoPosition } from "../../constants/types";
import CloudList from "./CloudList";
import DistanceSlider from "./DistanceSlider";
import { MAX_DISTANCE } from "../../constants/values";
import { getDistance } from "geolib";

type CloudsContainerProps = {
  cloudList: Clouds;
  userLocation?: GeoPosition;
};

/**
 * Displays the clouds of a specific region with filtering tools.
 */
function CloudsContainer({
  cloudList,
  userLocation,
}: CloudsContainerProps): JSX.Element {
  const [minimalDistance, setMinimalDistance] = useState<number>(MAX_DISTANCE);
  const filteredCloudList = useMemo(
    function filterCloudsByDistanceLimit() {
      if (userLocation) {
        return cloudList.filter((cloud) => {
          return getDistance(userLocation, cloud) < minimalDistance * 1000;
        });
      } else {
        return cloudList;
      }
    },
    [minimalDistance, userLocation, cloudList]
  );
  return (
    <>
      <DistanceSlider setMinimalDistance={setMinimalDistance} />
      <CloudList cloudList={filteredCloudList} />
    </>
  );
}

export default CloudsContainer;
