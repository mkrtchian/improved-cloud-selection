import { useState, ChangeEvent } from "react";
import { MAX_DISTANCE } from "../../constants/values";
import styles from "./DistanceSlider.module.css";

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
    <div className={styles.sliderContainer}>
      <label htmlFor="distance-limit" className={styles.sliderLabel}>
        Select maximal distance between you and the cloud instances:
      </label>
      <input
        type="range"
        className={styles.sliderInput}
        min="1"
        max={MAX_DISTANCE + 100}
        value={distanceLimit}
        step="100"
        id="distance-limit"
        onChange={handleRangeChange}
      />
      <span className={styles.sliderDistance}>{distanceLimit} km</span>
    </div>
  );
}

export default DistanceSlider;
