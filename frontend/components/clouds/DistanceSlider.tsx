import { useState, ChangeEvent } from "react";
import { MAX_DISTANCE } from "../../constants/values";

type DistanceSliderProps = {
  setMinimalDistance: (distance: number) => void;
};

/**
 * Slider to select the minimal distance to display clouds.
 */
function DistanceSlider({
  setMinimalDistance,
}: DistanceSliderProps): JSX.Element {
  const [distanceLimit, setDistanceLimit] = useState(MAX_DISTANCE);
  function handleRangeChange(event: ChangeEvent<HTMLInputElement>): void {
    const value = Number(event.target.value);
    setDistanceLimit(value);
    setMinimalDistance(value);
  }
  return (
    <>
      <label htmlFor="distance-limit">
        Select maximal distance between you and the cloud instances
      </label>
      <input
        type="range"
        min="1"
        max="20000"
        value={distanceLimit}
        step="100"
        id="distance-limit"
        onChange={handleRangeChange}
      />
      {distanceLimit} km
    </>
  );
}

export default DistanceSlider;
