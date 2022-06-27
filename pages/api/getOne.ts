import { Contact } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Contact | null>
) {
    if (req.query.id == "") {
        return res.status(400)
    }
    else {
        const response = await prisma.contact.findUnique({
            where: {
                id: Number(req.query.id)
            }
        })

        res.status(200).json(response)
    }

}
