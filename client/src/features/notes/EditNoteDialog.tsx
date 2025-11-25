import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { Note, UpdateNotePayload } from "./note-types";
import { useUpdateNoteMutation } from "./notesApi";

interface EditDialogProps {
    open: boolean;
    onClose: () => void;
    note: Note; 
}

const EditNoteDialog: React.FC<EditDialogProps> = ({ open, onClose, note }) => {
    const [formData, setFormData] = useState<UpdateNotePayload>({
        title: note.title,
        content: note.content,
        isCompleted: note.isCompleted,
    });

    useEffect(() => {
        setFormData({
            title: note.title,
            content: note.content,
            isCompleted: note.isCompleted,
        });
    }, [note]);

    const [updateNote, { isLoading }] = useUpdateNoteMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, isCompleted: e.target.checked });
    };

    const handleSubmit = async () => {
        try {
            await updateNote({ id: note.id, data: formData }).unwrap();
            onClose();
        } catch (error) {
            console.error("Error while updating note:", error);
            alert("Failed to update note. Check console.");
        }
    };

    return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Note #{note.id}</DialogTitle>
        <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                required
            />
            <FormControlLabel
            control={
                <Checkbox
                    checked={formData.isCompleted || false}
                    onChange={handleCheckboxChange}
                    name="isCompleted"
                    color="primary"
                />
            }
            label="Completed"
            />
        </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="inherit" disabled={isLoading}>
                Cancel
            </Button>
            <Button 
                onClick={handleSubmit} 
                color="primary" 
                variant="contained" 
                disabled={isLoading || !formData.title || !formData.content}
            >
                {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
        </DialogActions>
    </Dialog>
    );
};

export default EditNoteDialog;