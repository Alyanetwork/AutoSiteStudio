import React from 'react';

function LivePreview({ htmlContent }) {
    return (
        <iframe
            srcDoc={htmlContent}
            style={{ width: "100%", height: "400px", border: "1px solid #ddd" }}
            title="Canlı Önizleme"
        />
    );
}

export default LivePreview;
