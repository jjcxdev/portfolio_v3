export default function Navigation() {
  return (
    <nav className="flex h-14 w-full border-b-[.5px] border-t-[.5px] border-black">
      <ul className="font-share-tech-mono flex w-full items-center justify-around text-xs uppercase">
        <a href="/about">
          <li>About</li>
        </a>
        <a href="/work">
          <li>Work</li>
        </a>
        <a href="resume">
          <li>Resume</li>
        </a>
        <a href="/blog">
          <li>Blog</li>
        </a>
        <a href="https://github.com/jjcxdev">
          <li>Github</li>
        </a>
        <a href="https://twitter.com/jjcxdev">
          <li>X/Twitter</li>
        </a>
      </ul>
    </nav>
  );
}
