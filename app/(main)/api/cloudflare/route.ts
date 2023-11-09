export async function POST() {
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CF_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    )
  ).json();

  return new Response(JSON.stringify({ ok: true, ...response.result }));
}
