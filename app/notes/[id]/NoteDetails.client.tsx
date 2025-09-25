"use client";

import { useParams } from "next/navigation";
import { useNote } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const params = useParams();
  const noteId = Number(params.id);

  const { data: noteData, isLoading, error } = useNote(noteId);

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !noteData) return <p>Something went wrong.</p>;

  const note: Note = noteData;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created: {new Date(note.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
