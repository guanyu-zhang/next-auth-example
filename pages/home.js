import Layout from "../components/layout";

export default function Home({AllForums}) {
    return (
        <Layout>
            <h1>All Forums</h1>

        </Layout>
    )
}

export async function getAllForums() {
    const AllForums = await fetch(process.env.BACK_FORUM_BASE_URL + '/forums', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content_type': 'application/json',
        },
    }).then(response => {
        return response.json();
    })
    return {
        props: {
            AllForums
        }
    }
}