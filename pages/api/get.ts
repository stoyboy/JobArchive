import { Contact } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Contact[]>
) {
  const response = await prisma.contact.findMany()
  res.status(200).json(response)
}
