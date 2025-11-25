import { List, ListItem, ListItemText, CircularProgress, Alert, Paper, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetNotesQuery, useDeleteNoteMutation } from './notesApi';
import { useState } from 'react';
import { Note } from './note-types';
import EditNoteDialog from './EditNoteDialog';

const NotesList = () => {
    const { data: notes, isLoading, error } = useGetNotesQuery();
    const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState<Note | null>(null);

    const handleEdit = (note: Note) => {
        setCurrentNote(note);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setCurrentNote(null);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                await deleteNote(id).unwrap();
            } catch (error) {
                console.error("Error while deleting:", error);
                alert("Failed to delete note. Check console.");
            }
        }
    };
    
    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Alert severity="error">Error occured while loading data.</Alert>;
    }

    if (!notes || notes.length === 0) {
        return <Alert severity="info">No notes were found</Alert>;
    }

    return (
    <Paper elevation={3} sx={{ p: 2 }}>
        <List>
            {notes.map((note) => (
                <ListItem 
                key={note.id} 
                secondaryAction={
                    <Box>
                    <IconButton
                        edge="end" 
                        aria-label="edit" 
                        color="info" 
                        onClick={() => handleEdit(note)}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton 
                        edge="end" 
                        aria-label="delete" 
                        color="error" 
                        onClick={() => handleDelete(note.id)} 
                        disabled={isDeleting}
                    >
                        <DeleteIcon />
                    </IconButton>
                    </Box>
                }
                >
                <ListItemText
                    primary={note.title}
                    secondary={note.content.substring(0, 100) + (note.content.length > 100 ? '...' : '')}
                    sx={{ textDecoration: note.isCompleted ? 'line-through' : 'none' }}
                />
                </ListItem>
            ))}
        </List>
        {currentNote && (
            <EditNoteDialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                note={currentNote}
            />
        )}
    </Paper>
    );
};

export default NotesList;