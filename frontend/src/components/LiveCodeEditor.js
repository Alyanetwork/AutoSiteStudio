import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const ws = new WebSocket('ws://localhost:8080'); // WebSocket sunucu bağlantısı

function LiveCodeEditor({ initialCode }) {
    const [code, setCode] = useState(initialCode);

    useEffect(() => {
        ws.onmessage = (message) => {
            setCode(message.data);
        };
    }, []);

    const handleEditorChange = (newValue) => {
        setCode(newValue);
        ws.send(newValue); // Kod değişikliklerini diğer kullanıcılara gönder
    };

    return (
        <Editor
            height="400px"
            defaultLanguage="javascript"
            value={code}
            onChange={handleEditorChange}
        />
    );
}

export default LiveCodeEditor;
