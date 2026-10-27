import React, { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ToastProvider } from '../../context/ToastContext'
import DiffTool from './DiffTool'
import EncoderTool from './EncoderTool'
import FormatterTool from './FormatterTool'
import MinifierTool from './MinifierTool'
import PreviewerTool from './PreviewerTool'
import StripperTool from './StripperTool'

const renderWithToasts = (component) => render(<ToastProvider>{component}</ToastProvider>)

function StatefulStripper() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  return <StripperTool input={input} setInput={setInput} output={output} setOutput={setOutput} />
}

describe('tool controls have accessible names', () => {
  it('associates labels with the stripper text areas and names its actions', () => {
    renderWithToasts(<StatefulStripper />)

    expect(screen.getByRole('textbox', { name: 'Input HTML:' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Plain Text Output:' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Strip HTML Tags' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
  })

  it('associates labels with the formatter text areas and names its actions', () => {
    renderWithToasts(<FormatterTool />)

    expect(screen.getByRole('textbox', { name: 'Input HTML:' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Formatted HTML:' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Format HTML' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
  })

  it('associates labels with both comparison inputs and names the result region', () => {
    renderWithToasts(<DiffTool />)

    const original = screen.getByRole('textbox', { name: 'Original Text:' })
    const modified = screen.getByRole('textbox', { name: 'Modified Text:' })
    expect(original).toBeInTheDocument()
    expect(modified).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Compare Texts' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
    fireEvent.change(original, { target: { value: 'before' } })
    fireEvent.change(modified, { target: { value: 'after' } })
    fireEvent.click(screen.getByRole('button', { name: 'Compare Texts' }))
    expect(screen.getByRole('region', { name: 'Difference Output:' })).toBeInTheDocument()
  })

  it('associates labels with the encoder text areas and names its mode/actions', () => {
    renderWithToasts(<EncoderTool />)

    expect(screen.getByRole('textbox', { name: 'Input Text:' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Output Text:' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Encode HTML Entities' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Decode HTML Entities' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Encode' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
  })

  it('associates labels with the minifier text areas and names its format controls', () => {
    renderWithToasts(<MinifierTool />)

    expect(screen.getByRole('textbox', { name: 'Original HTML Code' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Minified Result' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'HTML minification mode' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'CSS minification mode' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'JS minification mode' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Minify Code' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy Output' })).toBeInTheDocument()
  })

  it('names the preview editor, preview frame and actions', () => {
    render(<PreviewerTool />)

    expect(screen.getByRole('textbox', { name: 'HTML / CSS / JS Code' })).toBeInTheDocument()
    expect(screen.getByTitle('Preview')).toHaveAttribute('title', 'Preview')
    expect(screen.getByRole('button', { name: 'Clear Editor' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reset Demo' })).toBeInTheDocument()
  })
})
