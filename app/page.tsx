import Image from "next/image";
import css from "./page.module.css";

export default function Home() {
  return (
    <div className={css.page}>
      <main>
        <div className={css.container}>
          <h1 className={css.title}>Welcome to NoteHub</h1>
          <p className={css.description}>
            NoteHub is a simple and efficient application designed for managing
            personal notes. It helps keep your thoughts organized and accessible
            in one place, whether you are at home or on the go.
          </p>
          <p className={css.description}>
            The app provides a clean interface for writing, editing, and
            browsing notes. With support for keyword search and structured
            organization, NoteHub offers a streamlined experience for anyone who
            values clarity and productivity.
          </p>
        </div>
      </main>
      <footer className={css.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
