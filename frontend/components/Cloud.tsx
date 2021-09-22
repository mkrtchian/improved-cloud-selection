import { Cloud as CloudType } from "../constants/types";
import styles from "./Cloud.module.css";

type CloudProps = {
  cloud: CloudType;
};

/**
 * Displays a cloud.
 */
function Cloud({ cloud }: CloudProps): JSX.Element {
  return (
    <li key={cloud.cloud_name} className={styles.cloud}>
      <div>{cloud.cloud_name}</div>
      <div>{cloud.cloud_description}</div>
    </li>
  );
}

export default Cloud;
