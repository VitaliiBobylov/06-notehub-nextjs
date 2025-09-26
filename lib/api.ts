import axios, { type AxiosResponse } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note, CreateNotePayload, FetchNotesResponse } from "@/types/note";

const API_URL = "https://notehub-public.goit.study/api/notes";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${token}` },
});

export async function fetchNotes(
  search = "",
  page = 1
): Promise<FetchNotesResponse> {
  const { data }: AxiosResponse<FetchNotesResponse> = await axiosInstance.get(
    "",
    {
      params: { search, page, perPage: 12 },
    }
  );
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data }: AxiosResponse<Note> = await axiosInstance.get(`/${id}`);
  return data;
}

export function useNotes(search: string, page: number) {
  return useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", search, page],
    queryFn: () => fetchNotes(search, page),
  });
}

export function useNote(id: string) {
  return useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newNote: CreateNotePayload) =>
      axiosInstance.post<Note>("", newNote).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/${id}`).then(() => id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });
}
