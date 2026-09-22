const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5081'

async function parseResponse(response) {
  if (!response.ok) {
    throw new Error('Não foi possível concluir a solicitação.')
  }

  return response.json()
}

export async function getNotes() {
  const response = await fetch(`${apiBaseUrl}/api/notes`)
  const data = await parseResponse(response)
  return data.items
}

export async function createNote(text) {
  const response = await fetch(`${apiBaseUrl}/api/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })

  return parseResponse(response)
}

