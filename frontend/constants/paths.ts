const API_PATHS = {
  clouds: `${process.env.NEXT_PUBLIC_BACKEND_URL}/clouds`,
  locationByIP: `${process.env.NEXT_PUBLIC_BACKEND_URL}/geo-coordinates`,
} as const;

export { API_PATHS };
