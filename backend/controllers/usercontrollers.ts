import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const createUserData = async (req: Request, res: Response) => {
  try {
    const data = await req.body;
    const { password } = data;
    const hashpassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        username: data.username,
        password: hashpassword,
      },
    });
    res.status(201).json({
      message: 'สร้างข้อมูลสำเร็จ',
    });
    return;
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err.message });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  const userData = await req.body;
  const { username, password } = userData;

  if (typeof username !== 'string' || typeof password !== 'string') {
    res.status(400).json({ message: 'Invalid username or password' });
    return;
  }

  const isHasUsername = await prisma.user.findUnique({ where: { username } });

  if (isHasUsername) {
    const isCorrect = await bcrypt.compare(password, isHasUsername.password);

    if (isCorrect) {
      const jwtsecret = process.env['JWT_SECRET'];
      if (!jwtsecret) throw new Error('JWT_SECRET is not defined in .env');

      const token = jwt.sign(
        { id: isHasUsername.id, usernmae: isHasUsername.username },
        jwtsecret,
        { expiresIn: '1d' }
      );
      res.status(200).json({ message: 'เข้าสู่ระบบสำเร็จ', token });
      return;
    } else {
      res.status(400).json({ message: 'รหัสไม่ถูกต้อง' });
      return;
    }
  } else {
    res.status(400).json({ message: 'ไม่พบบัญชี' });
    return;
  }
};
