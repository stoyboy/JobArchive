import type { NextApiRequest, NextApiResponse } from 'next'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ success: boolean } | null>
) {
    if (req.method === 'POST') {
        signOut(auth)
            .then(() => {
                return res.status(200).json({
                    success: true
                })
            })
            .catch(() => {
                return res.status(500).json({
                    success: false
                })
            });

    } else {
        return res.status(405).json(null)
    }
}
