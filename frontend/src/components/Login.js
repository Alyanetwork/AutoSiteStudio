import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/auth.php", {
                action: "login",
                email,
                password
            });
            console.log(response.data.message);
        } catch (error) {
            console.error("Giriş hatası:", error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Giriş Yap</button>
        </form>
    );
}

export default Login;
