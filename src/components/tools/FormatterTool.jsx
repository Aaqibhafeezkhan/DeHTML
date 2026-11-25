import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import styles from './ToolLayout.module.css';

const FormatterTool = () => {
  const { addToast } = useToast();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indentWidth, setIndentWidth] = useState(2);

  const formatHtml = (html) => {
    const voidElements = new Set([
      'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
      'link', 'meta', 'param', 'source', 'track', 'wbr',
    ]);
    const tokens = html.match(/<!--[\s\S]*?-->|<![^>]*>|<\/?[a-zA-Z][^>]*>|[^<]+|</g) || [];
    const lines = [];
    let depth = 0;

    for (let index = 0; index < tokens.length; index += 1) {
      const token = tokens[index];
      const closing = token.match(/^<\/([a-zA-Z][\w:-]*)/);
      const opening = token.match(/^<([a-zA-Z][\w:-]*)\b[^>]*>$/);
      const tagName = (closing?.[1] || opening?.[1] || '').toLowerCase();

      if (closing) {
        depth = Math.max(0, depth - 1);
        lines.push(' '.repeat(depth * indentWidth) + token);
        continue;
      }

      if (opening) {
        const selfClosing = /\/\s*>$/.test(token);
        const isVoid = voidElements.has(tagName) || selfClosing;
        const nextText = tokens[index + 1];
        const nextClosing = tokens[index + 2];
        const closesInline = !isVoid
          && nextText
          && !nextText.trim().startsWith('<')
          && nextClosing
          && nextClosing.toLowerCase().startsWith('</' + tagName);

        if (closesInline) {
          lines.push(' '.repeat(depth * indentWidth) + token + nextText + nextClosing);
          index += 2;
        } else {
          lines.push(' '.repeat(depth * indentWidth) + token);
          if (!isVoid) depth += 1;
        }
        continue;
      }

      if (token.trim()) {
        lines.push(' '.repeat(depth * indentWidth) + token.trim());
      }
    }

    return lines.join('\n');
  };

  const handleFormat = () => {
    if (!input.trim()) {
      addToast('Please enter some HTML to format.', 'error');
      return;
    }
    
    try {
      setOutput(formatHtml(input));
      addToast('HTML formatted successfully!', 'success');
    } catch (e) {
      console.error(e);
      addToast('Error formatting HTML.', 'error');
    }
  };

  const handleCopy = async () => {
    if (!output.trim()) {
      addToast('No text to copy!', 'error');
      return;
    }
    try {
      await navigator.clipboard.writeText(output);
      addToast('Text copied to clipboard!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to copy text.', 'error');
    }
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
    addToast('Text areas cleared!', 'success');
  };

  return (
    <div className={styles.container}>
      <div className={styles.editorGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="formatter-input">Input HTML:</label>
          <textarea 
            id="formatter-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your unformatted HTML here..."
            className={styles.textarea}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="formatter-output">Formatted HTML:</label>
          <textarea 
            id="formatter-output"
            value={output}
            readOnly
            placeholder="Formatted output will appear here..."
            className={styles.textarea}
          />
        </div>
      </div>

      <fieldset className={styles.indentOptions}>
        <legend className={styles.label}>Indentation</legend>
        {[2, 4].map(width => (
          <label key={width}>
            <input
              type="radio"
              name="formatter-indent"
              checked={indentWidth === width}
              onChange={() => setIndentWidth(width)}
            />
            {width} spaces
          </label>
        ))}
      </fieldset>

      <div className={styles.actions}>
        <button 
          onClick={handleFormat} 
          className={styles.btnPrimary}
        >
          Format HTML
        </button>
        <button 
          onClick={handleCopy}
          className={styles.btnSecondary}
        >
          Copy
        </button>
        <button 
          onClick={handleReset}
          className={styles.btnOutline}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FormatterTool;

