// BASE URL
export const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASEURL_PROD
    : process.env.NEXT_PUBLIC_BASEURL_DEV;