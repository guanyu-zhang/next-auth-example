export default async (req, res) => {

    const {
        query: { id, limit, offset },
        method,
    } = req

    switch (method) {
        case 'GET':
            // Get data from your database
            const games = await fetch(`${process.env.BACK_BASE_URL}/Game?offset=${req.query.offset}&limit=15`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'content_type': 'application/json',
                },
            }).then(response => {
                return response.json();
            }).then(res => {
                // console.log(JSON.stringify(res.data))
                return res.data
            })
            res.status(200).send(games)
            break
        case 'PUT':
            // Update or create data in your database
            res.status(200).json({ id, name: name || `User ${id}` })
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
