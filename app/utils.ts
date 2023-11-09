export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export const postFetcher = (url: string) =>
  fetch(url, { method: "POST" }).then((response) => response.json());
