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

  return (
    <div className="h-screen overflow-auto px-10">
      <div className="pt-10"></div>
      <h1>{mostRecentPost.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: mostRecentPost.content }} />
    </div>
  );
}
