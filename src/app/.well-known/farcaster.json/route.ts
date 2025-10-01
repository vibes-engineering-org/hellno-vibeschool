import { PROJECT_TITLE } from "~/lib/constants";

export async function GET() {
  const appUrl =
    process.env.NEXT_PUBLIC_URL ||
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;

  const config = {
    accountAssociation: {
      header:
        "eyJmaWQiOjg2OTk5OSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDc2ZDUwQjBFMTQ3OWE5QmEyYkQ5MzVGMUU5YTI3QzBjNjQ5QzhDMTIifQ",
      payload:
        "eyJkb21haW4iOiJoZWxsbm8tdmliZXNjaG9vbC52ZXJjZWwuYXBwIn0",
      signature:
        "MHhiMmVkZTFlOGNjODM2YzhiZWU4NGU3M2JhZGIwYmUwZDc3ZmQ3ZDNlNjgxZWIzNzMzNDZiZTdmNjk1YTEzZjE0NmI5ZDBmNDM1ZmRiMWQ1NTNhYWY0YjdjZTdlODhhZDZmMWVkODlhMzc5YzBjYmIwMTdlN2I4N2U2ZmIwZmJlNDFj",
    },
    miniapp: {
      version: "1",
      name: PROJECT_TITLE,
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/opengraph-image`,
      ogImageUrl: `${appUrl}/opengraph-image`,
      buttonTitle: "Open",
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
      webhookUrl: `${appUrl}/api/webhook`,
      primaryCategory: "social",
    },
  };

  return Response.json(config);
}
