import styles from "./CloudProviders.module.css";

/**
 * List the available cloud providers with images.
 */
function CloudProviders(): JSX.Element {
  const cloudProviders = [
    { name: "Amazon Web Services", src: "/images/aws_logo.svg" },
    { name: "Google Cloud", src: "/images/gcp_logo.svg" },
    { name: "Microsoft Azure", src: "/images/azure_logo.svg" },
    { name: "Digital Ocean", src: "/images/digital_ocean_logo.svg" },
    { name: "Up Cloud", src: "/images/upcloud_logo.svg" },
  ];
  return (
    <ul className={styles.list}>
      {cloudProviders.map((provider) => {
        return (
          <li key={provider.name}>
            <button className={styles.button}>
              <img // eslint-disable-line @next/next/no-img-element
                src={provider.src}
                alt={provider.name}
                className={styles.image}
              />
              <span className={styles.name}>{provider.name}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default CloudProviders;
