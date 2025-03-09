// filepath: /pages/admin.js
import { useState, useEffect } from 'react';
import Layout from '../components/layout';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  bio: string;
}

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </Layout>
  );
}