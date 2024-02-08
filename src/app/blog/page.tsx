import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

interface PostMetaData {
  title: string;
  date: string;
}

interface Post extends PostMetaData {
  content: string;
}

// utility function to read markdown files and convert to html
async function readMarkdownFile(filePath: string): Promise<Post> {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(remarkHtml).process(content);
  const contentHtml = processedContent.toString();

  return {
    title: data.title,
    date: data.date,
    content: contentHtml,
  };
}

// server component for blog
export default async function Blog() {
  const postsDirectory = path.join(process.cwd(), "src/app/blog/_posts");
  const filenames = fs.readdirSync(postsDirectory);

  // convert filenames to posts with metadata and content
  const posts: Post[] = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      return readMarkdownFile(filePath);
    }),
  );

  // sort posts by data and get the most recent one
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const mostRecentPost = sortedPosts[0];

  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString),
    );
  }

  const readableDate = formatDate(mostRecentPost.date);

  return (
    <div className="w-full flex justify-center">
    <div className="h-full font-share-tech-mono items-center flex flex-col w-full max-w-[1000px] overflow-auto px-10">
      <div className="h-40"></div>
      <div className="flex gap-12">
      <div>
      <h1 className="justify-center text-sm text-zinc-400 uppercase flex">
        {readableDate}
      </h1>
      <div className="w-full border-[.5px] border-b-zinc-300"></div>
      <h2 className="justify-center font-bold text-5xl py-2 uppercase flex">
        {mostRecentPost.title}
      </h2>
      <div className="w-full border-[.5px] border-t-zinc-300"></div>
      <div
        className="prose pt-8 font-share-tech-mono"
        dangerouslySetInnerHTML={{ __html: mostRecentPost.content }}
      />
      </div>
      <div className="pt-20">Previous Posts</div>
      </div>
<div className="h-20"></div>
    </div>
    </div>
  );
}
