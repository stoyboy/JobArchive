import type { NextApiRequest, NextApiResponse } from 'next'
import { signInWithEmailAndPassword, User } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User | { errorCode: any, errorMessage: any } | null>
) {
    if (req.method === 'POST') {
        signInWithEmailAndPassword(auth, req.body.email, req.body.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                return res.status(200).json(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                return res.status(500).json({
                    errorCode,
                    errorMessage
                })
            });

    } else {
        return res.status(405).json(null)
    }
}
