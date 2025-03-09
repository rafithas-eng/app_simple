'use client'

import { useState, useEffect } from 'react';
import Layout from '../components/layout';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  bio: string;
}

const pathAPI = 'http://localhost:3500/api/users';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [bio, setBio] = useState<string>('');

  useEffect(() => {
    fetch(pathAPI)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const addUser = async () => {
    const response = await fetch(pathAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, bio }),
    });
    const newUser: User = await response.json();
    setUsers([...users, newUser]);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <button onClick={addUser}>Add User</button>
    </Layout>
  );
}