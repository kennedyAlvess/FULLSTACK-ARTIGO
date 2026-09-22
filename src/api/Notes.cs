public sealed record Note(int Id, string Text);

public sealed record CreateNoteRequest(string? Text);

public sealed record NotesResponse(IReadOnlyCollection<Note> Items);

public sealed class NoteStore
{
    private readonly object _sync = new();
    private readonly List<Note> _notes = [new Note(1, "Nota demonstrativa")];
    private int _nextId = 2;

    public IReadOnlyCollection<Note> GetAll()
    {
        lock (_sync)
        {
            return _notes.ToArray();
        }
    }

    public Note Add(string text)
    {
        lock (_sync)
        {
            var note = new Note(_nextId++, text);
            _notes.Add(note);
            return note;
        }
    }
}

