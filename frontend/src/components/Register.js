import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/auth.php", {
                action: "register",
                username,
                email,
                password
            });
            console.log(response.data.message);
        } catch (error) {
            console.error("Kayıt hatası:", error);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" placeholder="Kullanıcı Adı" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Kayıt Ol</button>
        </form>
    );
}

export default Register;
