const catalogUrl = process.env.SERVICE_CATALOG_URL;

function getSlotsUrl() {
  if (!catalogUrl) return null;
  return catalogUrl.replace(/\/services\/?$/, "/availability/slots");
}

export async function GET(request: Request) {
  const slotsUrl = getSlotsUrl();
  if (!slotsUrl) {
    return Response.json({ message: "Booking availability is not configured." }, { status: 500 });
  }

  const upstreamUrl = new URL(slotsUrl);
  const requestUrl = new URL(request.url);
  for (const parameter of ["from", "to", "availableOnly"]) {
    const value = requestUrl.searchParams.get(parameter);
    if (value) upstreamUrl.searchParams.set(parameter, value);
  }

  try {
    const response = await fetch(upstreamUrl, { cache: "no-store" });
    const body = await response.text();

    return new Response(body, {
      status: response.status,
      headers: { "Content-Type": response.headers.get("Content-Type") ?? "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch booking availability:", error);
    return Response.json({ message: "Booking availability is unavailable." }, { status: 502 });
  }
}
