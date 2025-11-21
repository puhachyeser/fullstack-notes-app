export interface Note {
    id: number;
    title: string;
    content: string;
    isCompleted: boolean;
    createdAt: string;
}

export type CreateNotePayload = Omit<Note, "id" | "createdAt" | "isCompleted">;
export type UpdateNotePayload = Partial<Omit<Note, "id" | "createdAt">>;