import { Contact } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Contact | null>
) {
  if (req.method === 'POST') {
    const response = await prisma.contact.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        company: req.body.company,
        field: req.body.field,
        location: req.body.location,
        date: req.body.date,
        info: req.body.info
      }
    })
    res.status(200).json(response)
  } else {
    res.status(405).json(null)
  }
}
