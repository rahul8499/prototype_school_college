import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { batchCode, duration, durationType, type, startDate } = req.body;

    try {
      // Create a new batch in the database
      const newBatch = await prisma.batch.create({
        data: {
          batchCode,
          duration,
          durationType,
          type,
          startDate: new Date(startDate),
        },
      });

      res.status(201).json({ message: 'Batch created successfully!', batch: newBatch });
    } catch (error) {
      console.error('Error creating batch:', error);
      res.status(500).json({ error: 'An error occurred while creating the batch.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
