import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CollaboratorManager({ projectId }) {
    const [username, setUsername] = useState("");
    const [collaborators, setCollaborators] = useState([]);

    const fetchCollaborators = async () => {
        const response = await axios.get(`http://localhost:8000/api/collaboration.php?project_id=${projectId}`);
        setCollaborators(response.data);
    };

    useEffect(() => {
        fetchCollaborators();
    }, [projectId]);

    const handleAddCollaborator = async () => {
        try {
            await axios.post("http://localhost:8000/api/collaboration.php", {
                project_id: projectId,
                user_id: username // Bu, kullanıcı adı üzerinden kontrol örneği, ID’ye çevrilebilir
            });
            fetchCollaborators();
            setUsername("");
        } catch (error) {
            console.error("Kullanıcı ekleme hatası:", error);
        }
    };

    return (
        <div>
            <h3>İş Birliği Yapan Kullanıcılar</h3>
            <ul>
                {collaborators.map((collaborator, index) => (
                    <li key={index}>
                        {collaborator.username} - {collaborator.role}
                    </li>
                ))}
            </ul>
            <input 
                type="text" 
                placeholder="Kullanıcı adı" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <button onClick={handleAddCollaborator}>Kullanıcı Ekle</button>
        </div>
    );
}

export default CollaboratorManager;
