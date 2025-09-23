import { useState } from "react";
import { useNotes } from "../../lib/api";
import NoteList from "../../components/NoteList";
import NoteForm from "../../components/NoteForm";
import Modal from "../../components/Modal";
import SearchBox from "../../components/SearchBox";
import Pagination from "../../components/Pagination";
import { useDebounce } from "use-debounce";
import css from "./App.module.css";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useNotes(
    debouncedSearchText,
    currentPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

        {!isLoading && data && data.notes.length > 0 ? (
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
