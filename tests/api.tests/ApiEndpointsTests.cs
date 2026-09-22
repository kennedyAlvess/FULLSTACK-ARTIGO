using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace Api.Tests;

public sealed class ApiEndpointsTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public ApiEndpointsTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Health_ReturnsOk()
    {
        var response = await _client.GetAsync("/health");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task GetNotes_ReturnsJsonCollection()
    {
        var response = await _client.GetAsync("/api/notes");
        var document = await JsonDocument.ParseAsync(await response.Content.ReadAsStreamAsync());

        response.EnsureSuccessStatusCode();
        Assert.Equal(JsonValueKind.Array, document.RootElement.GetProperty("items").ValueKind);
    }

    [Fact]
    public async Task PostNote_AddsNoteToCollection()
    {
        var postResponse = await _client.PostAsJsonAsync("/api/notes", new { text = "Nota de teste" });
        var getResponse = await _client.GetFromJsonAsync<NotesResponse>("/api/notes");

        Assert.Equal(HttpStatusCode.Created, postResponse.StatusCode);
        Assert.NotNull(getResponse);
        Assert.Contains(getResponse.Items, note => note.Text == "Nota de teste");
    }

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public async Task PostNote_WithEmptyText_ReturnsBadRequest(string text)
    {
        var response = await _client.PostAsJsonAsync("/api/notes", new { text });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Theory]
    [InlineData("http://127.0.0.1:5173", true)]
    [InlineData("http://localhost:5173", false)]
    public async Task Cors_AllowsOnlyConfiguredLoopbackOrigin(string origin, bool shouldAllow)
    {
        using var request = new HttpRequestMessage(HttpMethod.Options, "/api/notes");
        request.Headers.Add("Origin", origin);
        request.Headers.Add("Access-Control-Request-Method", "POST");

        var response = await _client.SendAsync(request);
        var hasAllowedOrigin = response.Headers.TryGetValues(
            "Access-Control-Allow-Origin",
            out var allowedOrigins);

        Assert.Equal(shouldAllow, hasAllowedOrigin);
        if (shouldAllow)
        {
            Assert.Equal(origin, Assert.Single(allowedOrigins!));
        }
    }
}
