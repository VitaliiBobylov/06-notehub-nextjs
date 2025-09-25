"use client";

import { useState } from "react";
import { useNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { useDebounce } from "use-debounce";
import css from "./page.module.css";

export default function NotesClient() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useNotes(
    debouncedSearchText,
    currentPage
  );

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleSearchChange = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchText} onChange={handleSearchChange} />
        {!isLoading && data && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </header>

      <main>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading notes.</p>}
        {!isLoading && data?.notes.length ? (
          <NoteList notes={data.notes} />
        ) : (
          !isLoading && <p>No notes found.</p>
        )}
      </main>

      <footer>
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </footer>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
