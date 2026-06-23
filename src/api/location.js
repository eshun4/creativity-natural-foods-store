export default function handler(request, response) {
  const countryCode = String(
    request.headers["x-vercel-ip-country"] ||
      request.headers["cf-ipcountry"] ||
      request.headers["x-country-code"] ||
      "",
  ).toUpperCase();

  const market = countryCode === "GH" ? "ghana" : "international";

  response.setHeader(
    "Cache-Control",
    "s-maxage=3600, stale-while-revalidate=86400",
  );
  response.status(200).json({
    countryCode,
    market,
  });
}
