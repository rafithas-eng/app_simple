'use client';

import { useState, useEffect } from 'react';
import Layout from '../components/layout';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  bio: string;
}

const pathAPI = 'https://localhost/api/users';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [bio, setBio] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(pathAPI);
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const addUser = async () => {
    try {
      const response = await fetch(pathAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://localhost:3000',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
          'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({ name, email, password, bio }),
      });
      const newUser: User = await response.json();
      setUsers([...users, newUser]);
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div className="flex justify-between items-center">
              <div>
                <strong>Name:</strong> {user.name} <br />
                <strong>Email:</strong> {user.email} <br />
                <strong>Bio:</strong> {user.bio}
              </div>
            </div>
          </li>
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