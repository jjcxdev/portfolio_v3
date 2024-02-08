import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function debugMarkdown(filePath) {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const parsedContent = matter(fileContents);
    console.log('Front Matter:', parsedContent.data);

    try {
        // Process the Markdown content to HTML
        const processedContent = await remark()
            .use(remarkRehype)
            .use(rehypeStringify)
            .process(parsedContent.content);
        const contentHtml = processedContent.toString();

        console.log('HTML Content:', contentHtml);
    } catch (error) {
        console.error('Error processing Markdown:', error);
    }
}

const markdownFilePath = path.join(__dirname, "src/app/blog/_posts/2024-02-08-encoding-hell.md");
debugMarkdown(markdownFilePath);
