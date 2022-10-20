const prodConfig = {
  apiKey: "rzp_live_zdF1QJhOAU6cw9"
};
const devConfig = {
  apiKey: "rzp_test_dNtTvvdN1tX5Dl",
  secret: "zldwnx801PHLCOZiyn0qNmak"
};
export const config =
  process.env.NODE_ENV === "production" ? prodConfig : devConfig;