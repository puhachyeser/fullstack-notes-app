import { useGetNotesQuery } from './features/notes/notesApi';

function App() {
  const { data: notes, error, isLoading } = useGetNotesQuery();

  if (isLoading) return <div>Loading notes...</div>;
  if (error) return <div>An error occurred while fetching notes</div>;

  return (
    <div className="App">
      <h1>Notes List</h1>
      {notes && notes.length > 0 ? (
        <ul>
          {notes.map(note => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
}

export default App;