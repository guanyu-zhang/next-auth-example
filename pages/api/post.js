// This is an example of to protect an API route

export default async (req, res) => {
    console.log(JSON.stringify(req.body.data))
    const postResponse = await fetch(process.env.BACK_BASE_URL+'/forums', {
        body: JSON.stringify(req.body.data),
        method: 'POST',
        mode: 'cors',
        headers: {
            'content_type': 'application/json',
        },
    }).then(res => res.json())
    console.log(JSON.stringify(postResponse))

    res.json(
        // {
        //     ID: myInfo[0].ID,
        //     nameLast: myInfo[0].nameLast
        // }
        postResponse // success
    )
    // res.send(myInfo[0])

}
