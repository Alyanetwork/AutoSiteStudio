import React from 'react';
import axios from 'axios';

function DownloadButton({ projectId }) {
    const handleDownload = async () => {
        const response = await axios.get(`http://localhost:8000/api/php_builder.php?project_id=${projectId}`);
        // İndirme işlemini başlat
        const link = document.createElement('a');
        link.href = response.data.zip_url;
        link.download = "project.zip";
        link.click();
    };

    return (
        <button onClick={handleDownload}>Projeyi İndir</button>
    );
}

export default DownloadButton;
