import { GeoPosition } from "../constants/types";
import { useNavigatorLocation } from "../hooks";

type NavigatorLocationButtonProps = {
  setUserLocation: (locationValue: GeoPosition) => void;
};

/**
 * Button to trigger and get the user location through the navigator
 * geolocation API.
 */
function NavigatorLocationButton({
  setUserLocation,
}: NavigatorLocationButtonProps): JSX.Element {
  const callNavigatorGeoLocation = useNavigatorLocation(setUserLocation);
  return (
    <>
      <button onClick={callNavigatorGeoLocation}>
        Get more precise distance results
      </button>
    </>
  );
}

export default NavigatorLocationButton;
