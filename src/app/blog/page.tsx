import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

interface PreviousPost {
  title: string;
  date: string;
  slug: string;
}

async function getPreviousPosts(directoryPath: string): Promise<PreviousPost[]> {
  const files = await fs.readdir(directoryPath);


  const markdownFiles = files.filter(file => file.endsWith('.md') && file !== '.DS_Store');
  const sortedFiles = markdownFiles.sort((a,b) => b.localeCompare(a)).slice(1);

  const previousPosts = await Promise.all(
    sortedFiles.map(async (filename) => {
      const filePath = path.join(directoryPath, filename);
      const fileContents = await fs.readFile(filePath, 'utf8');
      const {data} = matter(fileContents);

      const slug = filename.replace(/\.md$/, '');

      return {
        title: data.title as string,
        date: data.date as string,
        slug,
      };
    })
  );

  return previousPosts;
}


interface Post {
  title: string;
  date: string;
  content: string;
}

async function getMostRecentMarkdownFile(directoryPath: string): Promise<string> {
  const files = await fs.readdir(directoryPath);
  // Assuming files are named in a way that allows lexical sorting, e.g., YYYY-MM-DD-title.md
  const sortedFiles = files.sort((a, b) => b.localeCompare(a));
  return path.join(directoryPath, sortedFiles[0]);
}

async function readMarkdownFile(filePath: string): Promise<Post> {
  const fileContents = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify)
    .process(content);

  return {
    title: data.title,
    date: data.date,
    content: processedContent.toString(),
  };
}

export default async function BlogPost() {
  const postsDirectory = path.join(process.cwd(), 'src/app/blog/_posts');
  const mostRecentFilePath = await getMostRecentMarkdownFile(postsDirectory);
  const mostRecentPost: Post = await readMarkdownFile(mostRecentFilePath);
  const previousPosts = await getPreviousPosts(postsDirectory);

  return (
    <div className="w-full flex justify-center">
      <div className="h-full font-share-tech-mono items-center flex flex-col w-full max-w-[1000px] overflow-auto px-10">
        <div className="h-40"></div>
        <div className="flex justify-between w-full">
          <div>
            <h1 className="justify-center text-sm text-zinc-400 uppercase flex">
              {mostRecentPost.date}
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
          {/* Previous Posts */}         
          <div className="pt-20 w-fit whitespace-nowrap flex-col">
            <h3 className="font-bold underline">Previous Posts</h3>

          <ul>
          {previousPosts.map((post) => (
          <li key={post.slug}>
          <a href={`/blog/${post.slug}`} className="border-b-zinc-300 border-[.5px] py-2 text-black hover:bg-yellow-400 flex flex-col">

          <div>{post.title}</div>
          <div className='text-zinc-500'>{post.date}</div>
          </a>
          </li>
          ))}
          </ul>
        </div>
        </div>
        <div className="h-20"></div>
      </div>
    </div>
  );
}
