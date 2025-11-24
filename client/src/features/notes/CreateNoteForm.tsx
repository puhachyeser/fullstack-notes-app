import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { useCreateNoteMutation } from './notesApi';
import { CreateNotePayload } from './note-types';

const initialData: CreateNotePayload = { title: '', content: '' };

const CreateNoteForm = () => {
    const [formData, setFormData] = useState<CreateNotePayload>(initialData);
    const [createNote, { isLoading }] = useCreateNoteMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createNote(formData).unwrap(); 
            setFormData(initialData);
        } catch (error) {
            console.error("Error while creating note:", error);
        }
    };

    return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
            Add New Note
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                fullWidth
            />
            <TextField
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                multiline
                rows={3}
                required
                fullWidth
            />
            <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                disabled={isLoading || !formData.title || !formData.content}
            >
                {isLoading ? 'Creating...' : 'Create Note'}
            </Button>
        </Box>
    </Paper>
    );
};

export default CreateNoteForm;