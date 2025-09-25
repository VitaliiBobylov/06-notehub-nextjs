import { QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface PageProps {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const queryClient = new QueryClient();
  const noteId = Number(params.id);
  await queryClient.prefetchQuery(["note", noteId], () =>
    fetchNoteById(noteId)
  );
  return <NoteDetailsClient />;
}
