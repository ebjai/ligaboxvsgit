import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL || "http://localhost:3000";
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/news/why-we-built-liga`, lastModified: new Date() },
    { url: `${base}/news/state-of-boxing-2025`, lastModified: new Date() }
  ];
}