const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        profile: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  } finally {
    await prisma.$disconnect();
  }
});

app.post('/api/users', async (req, res) => {
  const { name, email, password, bio } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        profile: {
          create: {
            bio,
          },
        },
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  } finally {
    await prisma.$disconnect();
  }
});

app.listen(3500, () => {
  console.log('Server is running on http://localhost:3000');
});