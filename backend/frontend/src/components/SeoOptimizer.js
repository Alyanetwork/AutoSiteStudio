import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SeoOptimizer({ projectId }) {
    const [seoSuggestions, setSeoSuggestions] = useState([]);
    const [performanceSuggestions, setPerformanceSuggestions] = useState([]);

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/seo_optimizer.php?project_id=${projectId}`);
                setSeoSuggestions(response.data.seo);
                setPerformanceSuggestions(response.data.performance);
            } catch (error) {
                console.error("SEO analizi hatası:", error);
            }
        };

        fetchAnalysis();
    }, [projectId]);

    return (
        <div>
            <h3>SEO ve Performans Önerileri</h3>
            <div>
                <h4>SEO Önerileri</h4>
                <ul>
                    {seoSuggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h4>Performans Önerileri</h4>
                <ul>
                    {performanceSuggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SeoOptimizer;
