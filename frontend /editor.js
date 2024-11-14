import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

function CodeEditor({ code, onChange }) {
    return (
        <Editor
            height="400px"
            defaultLanguage="php"
            value={code}
            onChange={onChange}
        />
    );
}

export default CodeEditor;
