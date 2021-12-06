export default async  (req, res) => {
    const {
        query: { id },
        method,
    } = req
    console.log(JSON.stringify(req.query))
    switch (method) {
        case 'GET':
            // Get data from your database
            const forum = await fetch(`${process.env.BACK_BASE_URL}/forums/${req.query.id}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'content_type': 'application/json',
                },
            }).then(response => {
                return response.json();
            })
            res.status(200).send(forum)
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