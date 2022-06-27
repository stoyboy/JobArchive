import { Contact } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Contact | null>
) {
    if (req.method === 'POST') {
        const response = await prisma.contact.update({
            where: {
                id: Number(req.body.id)
            },
            data: req.body.data
        })

        res.status(200).json(response)
    } else {
        res.status(405).json(null)
    }

}
