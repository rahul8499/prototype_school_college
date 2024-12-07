
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // const { searchTerm } = req.query; // Get searchTerm query parameter
    const { searchTerm, page , pageSize , sortBy = 'batchCode', sortOrder = 'asc' } = req.query;
    const currentPage = parseInt(page as string, 10);
    const pageLimit = parseInt(pageSize as string, 10);

    try {
      console.log('Search Term:', searchTerm);

      // Fetch batches with filtering based on searchTerm (batchCode containing the searchTerm)
      const batches = await prisma.batch.findMany({
        where: searchTerm && searchTerm !== '' // If searchTerm is provided, apply filtering
          ? {
              batchCode: {
                contains: searchTerm as string, // Filter by batchCode containing the searchTerm

              },

            }
          : {}, // If no searchTerm, return all batches
          orderBy: {
            [sortBy as string]: sortOrder === 'asc' ? 'asc' : 'desc', // Sort by the specified field and order
          },
          // skip, // Pagination - skip records for the current page
          take: pageLimit,
      });
      const totalBatches = await prisma.batch.count({
        where: searchTerm && searchTerm !== '' // If searchTerm is provided, apply filtering
        ? {
            batchCode: {
              contains: searchTerm as string, // Filter by batchCode containing the searchTerm
              // Use `mode` as part of the filter options
              // mode: 'insensitive', // Case-insensitive search
            },

          }
        : {},
      });
      // res.status(200).json({ batches });
      res.status(200).json({
        batches,
        pagination: {
          currentPage,
          totalPages: Math.ceil(totalBatches / pageLimit),
          totalItems: totalBatches,
        },
      });
    } catch (error: any) {
      console.error('Error fetching batches:', error);
      res.status(500).json({ error: `An error occurred while fetching the batches: ${error.message}` });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
