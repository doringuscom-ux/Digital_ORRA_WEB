import React, { useState, useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Type,
  Quote,
  Link,
  Image,
  Table,
  Code,
  Eye,
  Edit3,
  Undo,
  Redo,
  Sparkles,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';
import './JoditRichEditor.css';

export default function JoditRichEditor({ value, onChange, placeholder = 'Write or paste your article content here...' }) {
  const [mode, setMode] = useState('visual'); // 'visual', 'code', 'preview'
  const editorRef = useRef(null);
  const isUpdatingFromProp = useRef(false);

  // Sync prop value to contentEditable div when in visual mode
  useEffect(() => {
    if (editorRef.current && mode === 'visual') {
      if (editorRef.current.innerHTML !== (value || '')) {
        isUpdatingFromProp.current = true;
        editorRef.current.innerHTML = value || '';
        isUpdatingFromProp.current = false;
      }
    }
  }, [value, mode]);

  const handleInput = () => {
    if (editorRef.current && !isUpdatingFromProp.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
    }
  };

  const execCmd = (command, value = null) => {
    if (mode !== 'visual') setMode('visual');
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
        document.execCommand(command, false, value);
        handleInput();
      }
    }, 50);
  };

  const insertFormatBlock = (tag) => {
    execCmd('formatBlock', `<${tag}>`);
  };

  const insertLink = () => {
    const url = prompt('Enter URL link (e.g. https://digitalorra.com/...):');
    if (url) {
      execCmd('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter Image URL / Path (e.g. /blog/image.webp or https://...):');
    if (url) {
      execCmd('insertImage', url);
    }
  };

  const insertTable = () => {
    const tableHTML = `<table class="jodit-styled-table" style="width:100%; border-collapse:collapse; margin:15px 0;"><thead><tr><th style="border:1px solid #444; padding:8px;">Header 1</th><th style="border:1px solid #444; padding:8px;">Header 2</th></tr></thead><tbody><tr><td style="border:1px solid #444; padding:8px;">Data 1</td><td style="border:1px solid #444; padding:8px;">Data 2</td></tr></tbody></table><p></p>`;
    execCmd('insertHTML', tableHTML);
  };

  const insertLeadText = () => {
    const leadHTML = `<p class="lead-text" style="font-size:1.15rem; font-weight:500; color:#e2e8f0; line-height:1.7;">Your lead paragraph introductory text here...</p><p></p>`;
    execCmd('insertHTML', leadHTML);
  };

  return (
    <div className="jodit-editor-container">
      {/* Editor Toolbar Header */}
      <div className="jodit-toolbar">
        {/* Left Toolbar Group - Formatting Controls */}
        <div className="jodit-toolbar-group">
          <button type="button" className="jodit-btn" title="Undo" onClick={() => execCmd('undo')}>
            <Undo size={15} />
          </button>
          <button type="button" className="jodit-btn" title="Redo" onClick={() => execCmd('redo')}>
            <Redo size={15} />
          </button>
          <div className="jodit-divider" />

          <button type="button" className="jodit-btn" title="Heading 2 (H2)" onClick={() => insertFormatBlock('h2')}>
            <Heading2 size={16} />
          </button>
          <button type="button" className="jodit-btn" title="Heading 3 (H3)" onClick={() => insertFormatBlock('h3')}>
            <Heading3 size={16} />
          </button>
          <button type="button" className="jodit-btn" title="Paragraph" onClick={() => insertFormatBlock('p')}>
            <Type size={15} />
          </button>
          <button type="button" className="jodit-btn" title="Lead Paragraph" onClick={insertLeadText}>
            <Sparkles size={15} />
          </button>
          <div className="jodit-divider" />

          <button type="button" className="jodit-btn" title="Bold" onClick={() => execCmd('bold')}>
            <Bold size={15} />
          </button>
          <button type="button" className="jodit-btn" title="Italic" onClick={() => execCmd('italic')}>
            <Italic size={15} />
          </button>
          <button type="button" className="jodit-btn" title="Underline" onClick={() => execCmd('underline')}>
            <Underline size={15} />
          </button>
          <button type="button" className="jodit-btn" title="Strikethrough" onClick={() => execCmd('strikeThrough')}>
            <Strikethrough size={15} />
          </button>
          <div className="jodit-divider" />

          <button type="button" className="jodit-btn" title="Bullet List" onClick={() => execCmd('insertUnorderedList')}>
            <List size={15} />
          </button>
          <button type="button" className="jodit-btn" title="Numbered List" onClick={() => execCmd('insertOrderedList')}>
            <ListOrdered size={15} />
          </button>
          <button type="button" className="jodit-btn" title="Blockquote" onClick={() => insertFormatBlock('blockquote')}>
            <Quote size={15} />
          </button>
          <div className="jodit-divider" />

          <button type="button" className="jodit-btn" title="Align Left" onClick={() => execCmd('justifyLeft')}>
            <AlignLeft size={15} />
          </button>
          <button type="button" className="jodit-btn" title="Align Center" onClick={() => execCmd('justifyCenter')}>
            <AlignCenter size={15} />
          </button>
          <button type="button" className="jodit-btn" title="Align Right" onClick={() => execCmd('justifyRight')}>
            <AlignRight size={15} />
          </button>
          <div className="jodit-divider" />

          <button type="button" className="jodit-btn" title="Insert Link" onClick={insertLink}>
            <Link size={15} />
          </button>
          <button type="button" className="jodit-btn" title="Insert Image" onClick={insertImage}>
            <Image size={15} />
          </button>
          <button type="button" className="jodit-btn" title="Insert Table" onClick={insertTable}>
            <Table size={15} />
          </button>
        </div>

        {/* Right Toolbar Group - Mode Tabs (Visual, Raw HTML, Live Preview) */}
        <div className="jodit-mode-tabs">
          <button
            type="button"
            className={`jodit-mode-btn ${mode === 'visual' ? 'active' : ''}`}
            onClick={() => setMode('visual')}
          >
            <Edit3 size={14} /> Visual
          </button>
          <button
            type="button"
            className={`jodit-mode-btn ${mode === 'code' ? 'active' : ''}`}
            onClick={() => setMode('code')}
          >
            <Code size={14} /> HTML
          </button>
          <button
            type="button"
            className={`jodit-mode-btn ${mode === 'preview' ? 'active' : ''}`}
            onClick={() => setMode('preview')}
          >
            <Eye size={14} /> Live Preview
          </button>
        </div>
      </div>

      {/* Editor Body Content Area */}
      <div className="jodit-editor-body">
        {mode === 'visual' && (
          <div
            ref={editorRef}
            className="jodit-visual-area"
            contentEditable
            onInput={handleInput}
            data-placeholder={placeholder}
          />
        )}

        {mode === 'code' && (
          <textarea
            className="jodit-code-area"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write raw HTML content..."
            rows={12}
          />
        )}

        {mode === 'preview' && (
          <div
            className="jodit-preview-area blog-detail-article-content"
            dangerouslySetInnerHTML={{ __html: value || '<p style="color:#94a3b8;">No content to preview yet.</p>' }}
          />
        )}
      </div>

      {/* Footer Status Bar */}
      <div className="jodit-footer-bar">
        <span>Format: {mode === 'visual' ? 'Visual Editor Mode' : mode === 'code' ? 'Raw HTML Code Mode' : 'Live Preview Mode'}</span>
        <span>Characters: {(value || '').length}</span>
      </div>
    </div>
  );
}
