import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { Response } from 'express';

const prisma = new PrismaClient();

export const createBlogData = async (req: Request, res: Response) => {
  try {
    const data = await req.body;
    await prisma.blog.create({
      data: {
        name: data.name,
        content: data.content,
        author: data.author,
        date: data.date,
        authorId: data.authorId,
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

export const getBlogData = async (req: Request, res: Response) => {
  try {
    const { keyword } = req.params;
    if (!keyword) {
      const blogData = await prisma.blog.findMany();
      res.status(200).json({
        blogData,
      });
      return;
    } else {
      const blogData = await prisma.blog.findMany({
        where: { name: { contains: keyword, mode: 'insensitive' } },
      });
      res.status(200).json({
        blogData,
      });
      return;
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err.message });
    return;
  }
};

export const delBlogData = async (req: Request, res: Response) => {
  try {
    const { id } = await req.params;
    await prisma.blog.delete({ where: { id } });
    res.status(200).json({ message: 'ลบโพสต์สำเร็จ' });
    return;
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err.message });
    return;
  }
};

export const getSingleData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await prisma.blog.findUnique({ where: { id } });
    res.status(200).json({ data });
    return;
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err.message });
    return;
  }
};

export const updateBlogData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await prisma.blog.update({ where: { id }, data });
    res.status(200).json({ message: 'แก้ไขโพสต์สำเร็จ' });
    return;
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err.message });
    return;
  }
};
