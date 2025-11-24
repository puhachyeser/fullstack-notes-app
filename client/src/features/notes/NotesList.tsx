import { List, ListItem, ListItemText, CircularProgress, Alert, Paper, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetNotesQuery, useDeleteNoteMutation } from './notesApi';

const NotesList = () => {
    const { data: notes, isLoading, error } = useGetNotesQuery();
    const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                await deleteNote(id).unwrap();
            } catch (error) {
                console.error("Error while deleting:", error);
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
                    <IconButton edge="end" aria-label="edit" color="info">
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
                />
                </ListItem>
            ))}
        </List>
    </Paper>
    );
};

export default NotesList;