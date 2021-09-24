import styles from "./CloudProviders.module.scss";

type CloudProvidersProps = {
  setSelectedProvider: (selectedProvider: string) => void;
  selectedProvider: string;
};

/**
 * List the available cloud providers with images.
 */
function CloudProviders({
  setSelectedProvider,
  selectedProvider,
}: CloudProvidersProps): JSX.Element {
  const cloudProviders = [
    // All the SVGs used below are the attribution of the related
    // companies.
    { name: "Amazon Web Services", src: "/images/aws_logo.svg" },
    {
      name: "Google Cloud Platform",
      src: "/images/gcp_logo.svg",
      size: "large",
    },
    { name: "Microsoft Azure", src: "/images/azure_logo.svg", size: "large" },
    { name: "DigitalOcean", src: "/images/digital_ocean_logo.svg" },
    { name: "UpCloud", src: "/images/upcloud_logo.svg" },
  ];
  function handleClickProvider(providerName) {
    setSelectedProvider(providerName);
  }
  return (
    <ul className={styles.list}>
      {cloudProviders.map((provider) => {
        const selected = selectedProvider === provider.name;
        return (
          <li
            key={provider.name}
            aria-current={selected ? "location" : undefined}
            className={styles.item}
          >
            <button
              className={`${styles.button} ${selected ? styles.selected : ""}`}
              onClick={() => handleClickProvider(provider.name)}
            >
              <img // eslint-disable-line @next/next/no-img-element
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}${provider.src}`}
                alt={provider.name}
                className={`${styles.image} ${
                  provider.size === "large" ? styles.imageLarge : ""
                }`}
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default CloudProviders;
