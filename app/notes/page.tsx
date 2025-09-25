import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export default async function NotesPage() {
  // Створюємо QueryClient для prefetch
  const queryClient = new QueryClient();

  // Попереднє завантаження нотаток
  await queryClient.prefetchQuery(["notes"], getNotes);

  // Дегідруємо стан, щоб клієнт міг його гідрувати
  const dehydratedState = dehydrate(queryClient);

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <h1>Notes</h1>
      <NotesClient />
    </TanStackProvider>
  );
}
