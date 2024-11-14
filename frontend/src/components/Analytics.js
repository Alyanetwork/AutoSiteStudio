import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function Analytics({ projectId }) {
    const [analyticsData, setAnalyticsData] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/analytics.php?project_id=${projectId}`);
                setAnalyticsData(response.data);
            } catch (error) {
                console.error("Analitik verileri getirme hatası:", error);
            }
        };

        fetchAnalytics();
    }, [projectId]);

    if (!analyticsData) return <p>Yükleniyor...</p>;

    const data = {
        labels: ["Görüntüleme", "Ziyaretçi", "Oturum Süresi", "Çıkma Oranı"],
        datasets: [
            {
                label: "Etkileşim Verileri",
                data: [
                    analyticsData.views,
                    analyticsData.unique_visitors,
                    analyticsData.avg_session_duration,
                    analyticsData.bounce_rate
                ],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1
            }
        ]
    };

    return (
        <div>
            <h3>Proje Analitiği</h3>
            <Line data={data} />
            <div>
                <p><strong>Toplam Görüntüleme:</strong> {analyticsData.views}</p>
                <p><strong>Benzersiz Ziyaretçi:</strong> {analyticsData.unique_visitors}</p>
                <p><strong>Ortalama Oturum Süresi:</strong> {analyticsData.avg_session_duration} sn</p>
                <p><strong>Çıkma Oranı:</strong> {analyticsData.bounce_rate}%</p>
            </div>
        </div>
    );
}

export default Analytics;
