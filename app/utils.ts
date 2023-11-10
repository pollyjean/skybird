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

export const convertLocalTime = (date: Date) => {
  const utc_seconds = new Date(date).getTime();
  const KR_LOCAL_OFFSET = 9 * 60 * 60 * 1000;
  const KR_TIME = new Date(utc_seconds + KR_LOCAL_OFFSET)
    .toISOString()
    .slice(0, -5)
    .replace("T", " ");
  return KR_TIME;
};
