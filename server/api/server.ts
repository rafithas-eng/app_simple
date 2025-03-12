import express, { Request, Response } from 'express';
import https from 'https';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

const options = {
  key: fs.readFileSync('certificates/localhost-key.pem'),
  cert: fs.readFileSync('certificates/localhost.pem')
};

app.use(express.json());

app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        profile: true,
        login: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        profile: true,
        login: true,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.post('/api/users', async (req: Request, res: Response) => {
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
  }
});

app.put('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, bio } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        password,
        profile: {
          update: {
            bio,
          },
        },
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.get('/api/profiles', async (req: Request, res: Response) => {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        user: true,
      },
    });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
});

app.get('/api/profiles/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
      },
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

app.post('/api/profiles', async (req: Request, res: Response) => {
  const { bio, userId } = req.body;
  try {
    const profile = await prisma.profile.create({
      data: {
        bio,
        user: {
          connect: { id: userId },
        },
      },
    });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create profile' });
  }
});

app.put('/api/profiles/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { bio } = req.body;
  try {
    const profile = await prisma.profile.update({
      where: { id: parseInt(id) },
      data: {
        bio,
      },
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

app.delete('/api/profiles/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.profile.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete profile' });
  }
});

app.get('/api/login', async (req: Request, res: Response) => {
  try {
    const login = await prisma.login.findMany({
      include: {
        user: true,
      },
    });
    res.status(200).json(login);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch login' });
  }
});

app.get('/api/login/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const login = await prisma.login.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
      },
    });
    res.status(200).json(login);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch login' });
  }
});

app.post('/api/login', async (req: Request, res: Response) => {
  const { userId, email, password, message } = req.body;
  try {
    const login = await prisma.login.create({
      data: {
        userId,
        email,
        password,
        message,
      },
    });
    res.status(201).json(login);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create login' });
  }
});

app.put('/api/login/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, password, message } = req.body;
  try {
    const login = await prisma.login.update({
      where: { id: parseInt(id) },
      data: {
        email,
        password,
        message,
      },
    });
    res.status(200).json(login);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update login' });
  }
});

app.delete('/api/login/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.login.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete login' });
  }
});

app.post('/api/verify-login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && user.password === password) {
      res.status(200).json({ message: 'Login is valid' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify login' });
  }
});

app.listen(3500, () => {
  console.log('HTTP Server is running on http://localhost:3500');
});

https.createServer(options, app).listen(443, () => {
  console.log('HTTPS Server is running on https://localhost');
});