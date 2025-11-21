import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Note, CreateNotePayload, UpdateNotePayload } from "./note-types";

export const notesApi = createApi({
    reducerPath: "notesApi", 
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }), 
    tagTypes: ["Notes"], 
    endpoints: (builder) => ({
        getNotes: builder.query<Note[], void>({
            query: () => "notes",
            providesTags: ["Notes"],
        }),

        createNote: builder.mutation<Note, CreateNotePayload>({
            query: (note) => ({
                url: "notes",
                method: "POST",
                body: note,
            }),
            invalidatesTags: ["Notes"], 
        }),

        updateNote: builder.mutation<Note, { id: number; data: UpdateNotePayload }>({
            query: ({ id, data }) => ({
                url: `notes/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Notes"], 
        }),

        deleteNote: builder.mutation<void, number>({
            query: (id) => ({
                url: `notes/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Notes"], 
        }),
    }),
});

export const { 
    useGetNotesQuery, 
    useCreateNoteMutation, 
    useUpdateNoteMutation,
    useDeleteNoteMutation 
} = notesApi;