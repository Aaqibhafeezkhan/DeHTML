import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import FormatterTool from './FormatterTool'
import ToastContainer from '../ToastContainer'
import { ToastProvider } from '../../context/ToastContext'

const renderTool = () => render(<ToastProvider><FormatterTool /><ToastContainer /></ToastProvider>)

beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
})

describe('FormatterTool', () => {
  it('rejects empty input', () => {
    renderTool()
    fireEvent.click(screen.getByRole('button', { name: 'Format HTML' }))
    expect(screen.getByText('Please enter some HTML to format.')).toBeInTheDocument()
  })

  it('formats nested and void elements', () => {
    renderTool()
    fireEvent.change(screen.getByPlaceholderText('Paste your unformatted HTML here...'), { target: { value: '<div><p>Hello</p><img src="x"><br><input></div>' } })
    fireEvent.click(screen.getByRole('button', { name: 'Format HTML' }))
    const output = screen.getByPlaceholderText('Formatted output will appear here...')
    expect(output.value).toContain('<div>')
    expect(output.value).toContain('<p>Hello</p>')
    expect(output.value).toContain('<img src="x">')
    expect(output.value).toContain('<br>')
  })

  it('preserves text nodes and supports changing indentation with keyboard navigation', async () => {
    const user = userEvent.setup()
    renderTool()
    fireEvent.change(screen.getByLabelText('Input HTML:'), {
      target: { value: '<main><section><p>Text</p></section><hr></main>' },
    })
    const format = screen.getByRole('button', { name: 'Format HTML' })
    const output = screen.getByLabelText('Formatted HTML:')
    const twoSpaces = screen.getByRole('radio', { name: '2 spaces' })
    const fourSpaces = screen.getByRole('radio', { name: '4 spaces' })

    expect(twoSpaces).toBeChecked()
    await user.click(twoSpaces)
    await user.keyboard('{ArrowRight}')
    expect(fourSpaces).toBeChecked()

    await user.click(format)
    expect(output).toHaveValue('<main>\n    <section>\n        <p>Text</p>\n    </section>\n    <hr>\n</main>')

    await user.keyboard('{ArrowLeft}')
    expect(twoSpaces).toBeChecked()
    await user.click(format)
    expect(output).toHaveValue('<main>\n  <section>\n    <p>Text</p>\n  </section>\n  <hr>\n</main>')
  })

  it('copies output and resets state', async () => {
    renderTool()
    fireEvent.change(screen.getByPlaceholderText('Paste your unformatted HTML here...'), { target: { value: '<p>Hello</p>' } })
    fireEvent.click(screen.getByRole('button', { name: 'Format HTML' }))
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }))
    await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalled())
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByPlaceholderText('Paste your unformatted HTML here...')).toHaveValue('')
    expect(screen.getByPlaceholderText('Formatted output will appear here...')).toHaveValue('')
  })
})
