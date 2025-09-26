"use client";

import { useNote } from "@/lib/api";
import css from "./NoteDetails.module.css";

type Props = { id: string };

export default function NoteDetailsClient({ id }: Props) {
  const { data: note, isLoading, isError } = useNote(id);

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}
