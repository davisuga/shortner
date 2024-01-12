export const getPageTitle = async (url: string) => {
  const response = await fetch(url);
  const html = await response.text();
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  return title;
};
