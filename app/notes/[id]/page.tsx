import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

type Props = { params: Promise<{ id: string }> };

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <NoteDetailsClient id={id} />
    </TanStackProvider>
  );
}
