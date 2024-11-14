import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TemplateSelector({ onSelectTemplate }) {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            const response = await axios.get("http://localhost:8000/api/php_template.php");
            setTemplates(response.data);
        };
        fetchTemplates();
    }, []);

    return (
        <div>
            <h3>Şablon Seçimi</h3>
            <ul>
                {templates.map(template => (
                    <li key={template.id}>
                        <button onClick={() => onSelectTemplate(template.id)}>{template.name}</button>
                        <p>{template.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TemplateSelector;
