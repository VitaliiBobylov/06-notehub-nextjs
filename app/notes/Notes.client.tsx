"use client";

import { useState, useEffect } from "react";
import { useNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./Notes.client.module.css";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, error } = useNotes(debouncedSearch, page);

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  return (
    <div className={css.container}>
      <div className={css.searchAndButton}>
        <SearchBox value={search} onChange={setSearch} />
        <button
          className={css.createButton}
          onClick={() => setIsModalOpen(true)}
        >
          Create Note
        </button>
      </div>

      <NoteList notes={data?.notes || []} />

      {data?.totalPages && data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
