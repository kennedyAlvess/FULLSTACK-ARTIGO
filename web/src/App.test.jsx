import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App.jsx'

function jsonResponse(body, status = 200) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  })
}

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('carrega e exibe uma nota textual comum', async () => {
    fetch.mockReturnValueOnce(jsonResponse({ items: [{ id: 1, text: 'Nota demonstrativa' }] }))

    render(<App />)

    expect(screen.getByRole('status')).toHaveTextContent('Carregando notas')
    expect(await screen.findByText('Nota demonstrativa')).toBeInTheDocument()
  })

  it('adiciona uma nota pela API', async () => {
    fetch
      .mockReturnValueOnce(jsonResponse({ items: [] }))
      .mockReturnValueOnce(jsonResponse({ id: 2, text: 'Nova nota' }, 201))

    render(<App />)
    await screen.findByText('Nenhuma nota cadastrada.')

    fireEvent.change(screen.getByLabelText('Texto da nota'), { target: { value: 'Nova nota' } })
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar' }))

    expect(await screen.findByText('Nova nota')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByLabelText('Texto da nota')).toHaveValue(''))
  })

  it('interpreta a marcação inerte no cenário vulnerável WEB-SC-01', async () => {
    fetch.mockReturnValueOnce(jsonResponse({ items: [{ id: 1, text: '<b>BENCHMARK</b>' }] }))

    render(<App />)

    const renderedContent = await screen.findByText('BENCHMARK')
    expect(renderedContent.tagName).toBe('B')
  })

  it('mostra erro quando a carga falha', async () => {
    fetch.mockReturnValueOnce(Promise.reject(new Error('indisponível')))

    render(<App />)

    expect(await screen.findByRole('alert')).toHaveTextContent('Não foi possível carregar as notas.')
  })
})

