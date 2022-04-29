// BASE URL
export const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASEURL_PROD
    : process.env.NEXT_PUBLIC_BASEURL_DEV;

export const nftaddress  = "0xA8B46921B164bb31177f146b04b117a322F062a6"
export const nftmarketaddress = "0x2f7e5bd52A1c944500476Fc32F6B3E4f027fB466"