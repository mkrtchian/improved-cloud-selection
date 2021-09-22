type Cloud = {
  cloud_description: string;
  cloud_name: string;
  cloud_region: string;
  cloud_provider: string;
  geo_latitude: number;
  geo_longitude: number;
  geo_region: string;
};

type Clouds = Cloud[];

type CloudsObject = {
  clouds: Clouds;
};

export type { Cloud, Clouds, CloudsObject };
