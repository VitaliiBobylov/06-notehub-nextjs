import Link from "next/link";
import css from "./page.module.css";

const heder = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <link href="/">Home</link>
          </li>
          <li>
            <link href="/notes">Notes</link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default heder;
