const catalogUrl = process.env.SERVICE_CATALOG_URL;

export async function GET() {
  if (!catalogUrl) {
    return Response.json({ message: "Service catalog is not configured." }, { status: 500 });
  }

  try {
    const response = await fetch(catalogUrl, { cache: "no-store" });
    const body = await response.text();

    return new Response(body, {
      status: response.status,
      headers: { "Content-Type": response.headers.get("Content-Type") ?? "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch service catalog:", error);
    return Response.json({ message: "Service catalog is unavailable." }, { status: 502 });
  }
}
