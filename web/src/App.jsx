import { useEffect, useState } from 'react'
import { createNote, getNotes } from './api.js'

export default function App() {
  const [notes, setNotes] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    getNotes()
      .then((items) => {
        if (active) setNotes(items)
      })
      .catch(() => {
        if (active) setError('Não foi possível carregar as notas.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    if (!text.trim()) {
      setError('Informe o texto da nota.')
      return
    }

    setSaving(true)
    setError('')

    try {
      const note = await createNote(text)
      setNotes((current) => [...current, note])
      setText('')
    } catch {
      setError('Não foi possível adicionar a nota.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="page-shell">
      <section className="notes-card" aria-labelledby="page-title">
        <p className="eyebrow">Corpus experimental</p>
        <h1 id="page-title">Notas do benchmark</h1>
        <p className="subtitle">Dados sintéticos mantidos somente durante esta execução.</p>

        <form onSubmit={handleSubmit} className="note-form">
          <label htmlFor="note-text">Texto da nota</label>
          <div className="form-row">
            <input
              id="note-text"
              name="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Digite uma nota sintética"
              autoComplete="off"
            />
            <button type="submit" disabled={saving}>
              {saving ? 'Adicionando…' : 'Adicionar'}
            </button>
          </div>
        </form>

        {error && <p role="alert" className="state-message error">{error}</p>}
        {loading && <p role="status" className="state-message">Carregando notas…</p>}

        {!loading && notes.length === 0 && (
          <p className="state-message">Nenhuma nota cadastrada.</p>
        )}

        {!loading && notes.length > 0 && (
          <ul className="note-list" aria-label="Notas cadastradas">
            {notes.map((note) => (
              <li key={note.id}>
                {/* WEB-SC-01: referência segura trata o conteúdo não confiável como texto. */}
                <span>{note.text}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
