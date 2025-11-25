import { Container, Typography } from '@mui/material';
import NotesList from "./features/notes/NotesList"
import CreateNoteForm from "./features/notes/CreateNoteForm";

function App() {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 4 }} align="center">
        Notes App
      </Typography>
      <CreateNoteForm />
      <NotesList />
    </Container>
  );
}

export default App;