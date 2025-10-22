import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Markdown from "react-markdown";
import Image from "next/image";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const file = path.join(process.cwd(), "content", "articles", `${params.slug}.mdx`);
  if (!fs.existsSync(file)) return <div>Article not found.</div>;
  
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  
  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      {data.image && (
        <Image
          src={data.image}
          alt={data.title}
          width={800}
          height={400}
          className="mb-6 h-64 w-full rounded-lg object-cover"
        />
      )}
      
      <h1 className="mb-4 text-3xl font-bold">{data.title}</h1>
      
      <div className="mb-8 text-sm text-zinc-400">
        By {data.author || "Liga de Boxeo"} • {new Date(data.date).toLocaleDateString()}
      </div>
      
      <div className="prose prose-invert max-w-none">
        <Markdown>{content}</Markdown>
      </div>
    </article>
  );
}