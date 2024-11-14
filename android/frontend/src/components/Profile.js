import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile({ userId }) {
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        const fetchSubscription = async () => {
            const response = await axios.get(`http://localhost:8000/api/subscription.php?user_id=${userId}`);
            setSubscription(response.data);
        };
        fetchSubscription();
    }, [userId]);

    return (
        <div>
            <h3>Kullanıcı Profili</h3>
            {subscription ? (
                <div>
                    <p>Abonelik Tipi: {subscription.subscription_type}</p>
                    <p>Abonelik Durumu: {subscription.status}</p>
                    <p>Yenilenme Tarihi: {subscription.renewal_date}</p>
                </div>
            ) : (
                <p>Henüz bir abonelik yok.</p>
            )}
        </div>
    );
}

export default Profile;
