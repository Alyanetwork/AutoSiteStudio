import React from 'react';
import axios from 'axios';

function DownloadApkButton({ projectId }) {
    const handleDownload = async () => {
        const response = await axios.get(`http://localhost:8000/api/android_builder.php?project_id=${projectId}`);
        // İndirme işlemini başlat
        const link = document.createElement('a');
        link.href = response.data.apk_url;
        link.download = "app-release.apk";
        link.click();
    };

    return (
        <button onClick={handleDownload}>APK İndir</button>
    );
}

export default DownloadApkButton;
