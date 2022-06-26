import { Contact } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Contact>
) {
  const response = await prisma.contact.create({
    data: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      location: req.body.location,
      company: req.body.company,
      field: req.body.field
    }
  })
  res.status(200).json(response)
}
