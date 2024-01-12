interface UrlRepo {
  getTopUrls(): Promise<Url[]>;
  upsertUrl(url: Url): Promise<Url>;
  getBySlug(slug: string): Promise<Url | null>;
}
