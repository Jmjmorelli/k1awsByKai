const catalogUrl = process.env.SERVICE_CATALOG_URL;

function getOptionsUrl() {
  if (!catalogUrl) return null;
  return catalogUrl.replace(/\/services\/?$/, "/services/options");
}

export async function GET() {
  const optionsUrl = getOptionsUrl();

  if (!optionsUrl) {
    return Response.json({ message: "Service options are not configured." }, { status: 500 });
  }

  try {
    const response = await fetch(optionsUrl, { cache: "no-store" });
    const body = await response.text();

    return new Response(body, {
      status: response.status,
      headers: { "Content-Type": response.headers.get("Content-Type") ?? "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch service options:", error);
    return Response.json({ message: "Service options are unavailable." }, { status: 502 });
  }
}
