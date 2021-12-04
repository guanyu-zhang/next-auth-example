// This is an example of to protect an API route
import { getSession } from 'next-auth/react'

export default async (req, res) => {
    const session = await getSession({ req })

    if (session) {
        const myInfo = await fetch(process.env.BACK_USER_BASE_URL + '/users/' + session.localID, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content_type': 'application/json',
            },
        }).then(response => {
            return response.json();
        })

        res.json(
            // {
            //     ID: myInfo[0].ID,
            //     nameLast: myInfo[0].nameLast
            // }
            myInfo // success
            )
        // res.send(myInfo[0])
    } else {
        res.send({ error: 'You must be sign in to view the protected content on this page.' })
    }
}
