import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

function Subscription({ userId }) {
    const handleToken = async (token) => {
        try {
            const response = await axios.post("http://localhost:8000/api/payment.php", {
                user_id: userId,
                stripeToken: token.id,
            });
            alert(response.data.message);
        } catch (error) {
            console.error("Ödeme hatası:", error);
            alert("Ödeme başarısız. Lütfen tekrar deneyin.");
        }
    };

    return (
        <div>
            <h3>Premium Üyelik Satın Al</h3>
            <StripeCheckout
                stripeKey="STRIPE_PUBLIC_KEY" // Stripe genel anahtarınızı buraya ekleyin
                token={handleToken}
                amount={1000} // 10 USD
                currency="USD"
                name="AutoSite Studio"
                description="Premium Üyelik"
            />
        </div>
    );
}

export default Subscription;
