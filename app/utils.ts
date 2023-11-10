export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export const postFetcher = (url: string) =>
  fetch(url, { method: "POST" }).then((response) => response.json());

export const handleErrors = (error: unknown) => {
  console.error((error as Error).message);
  return new Response(JSON.stringify({ message: (error as Error).message }), {
    status: 500,
  });
};

export const generateImageUrl = (image_id: string, variant_name = "public") => {
  return `https://imagedelivery.net/Kz3fZuhiaWedOCgrW7E2tA/${image_id}/${variant_name}`;
};
