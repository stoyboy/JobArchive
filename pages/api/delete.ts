import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const response = await prisma.contact.deleteMany({
            where: {
                id: {
                    in: req.body.keys
                }
            }
        })

        res.status(200).json({
            success: true,
            ...response
        })
    } else {
        res.status(405)
    }
}
