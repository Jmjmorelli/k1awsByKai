const checkoutUrl = process.env.CHECKOUT_URL;

export async function POST(request: Request) {
  if (!checkoutUrl) {
    return Response.json({ message: "Checkout is not configured." }, { status: 500 });
  }

  try {
    const selection = await request.json();
    const response = await fetch(checkoutUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selection),
      cache: "no-store",
    });
    const body = await response.text();

    return new Response(body, {
      status: response.status,
      headers: { "Content-Type": response.headers.get("Content-Type") ?? "application/json" },
    });
  } catch (error) {
    console.error("Failed to create checkout session:", error);
    return Response.json({ message: "Checkout is unavailable. Please try again." }, { status: 502 });
  }
}
