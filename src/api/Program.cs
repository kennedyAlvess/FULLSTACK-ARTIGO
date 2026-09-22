var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("LocalFrontend", policy =>
    {
        policy
            .WithOrigins("http://127.0.0.1:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
builder.Services.AddSingleton<NoteStore>();

var app = builder.Build();

app.UseCors("LocalFrontend");

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.MapGet("/api/notes", (NoteStore store) =>
    Results.Ok(new NotesResponse(store.GetAll())));

app.MapPost("/api/notes", (CreateNoteRequest request, NoteStore store) =>
{
    if (string.IsNullOrWhiteSpace(request.Text))
    {
        return Results.BadRequest(new { message = "O texto da nota é obrigatório." });
    }

    var note = store.Add(request.Text);
    return Results.Created($"/api/notes/{note.Id}", note);
});

app.Run();

public partial class Program;

