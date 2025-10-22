import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function loadLocalArticles() {
  const dir = path.join(process.cwd(), "content", "articles");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".mdx") || f.endsWith(".md"));
  return files.map((f) => {
    const slug = f.replace(/\.mdx?$/, "");
    const raw = fs.readFileSync(path.join(dir, f), "utf8");
    const { data, content } = matter(raw);
    return {
      _id: `local_${slug}`,
      title: data.title || slug,
      link: `/news/${slug}`,
      description: content.slice(0, 200),
      image: data.image || null,
      source: data.source || "Liga de Boxeo",
      author: data.author || "Liga de Boxeo",
      publishedAt: data.date || new Date().toISOString(),
      isLocal: true,
    };
  });
}