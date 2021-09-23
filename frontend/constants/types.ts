type Cloud = {
  cloud_description: string;
  cloud_name: string;
  cloud_region: string;
  cloud_provider: string;
  latitude: number;
  longitude: number;
};

type Clouds = Cloud[];

type CloudsObject = {
  clouds: Clouds;
};

type GeoPosition = {
  longitude: number;
  latitude: number;
  [x: string]: any;
};

type GeoPositionResponse = {
  data: GeoPosition;
};

// inspired from: https://stackoverflow.com/a/62628684/1774332
function isGeoPositionResponse(
  response: unknown
): response is GeoPositionResponse {
  function isResponseLike(response: unknown): response is GeoPositionResponse {
    return (
      response !== null && typeof response === "object" && "data" in response
    );
  }
  return (
    isResponseLike(response) &&
    typeof response.data.longitude === "number" &&
    typeof response.data.latitude === "number"
  );
}

export type { Cloud, Clouds, CloudsObject, GeoPosition };
export { isGeoPositionResponse };
