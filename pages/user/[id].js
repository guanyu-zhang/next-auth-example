import { useRouter } from 'next/router'
import useSwr from 'swr'
import Layout from "../../components/layout";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Forum() {
    const router = useRouter()
    // console.log(JSON.stringify(router.query))
    const { data, error } = useSwr(
        router.query.id ? `/api/user/${router.query.id}` : null,
        fetcher
    )

    if (error) return <div>Failed to load user</div>
    if (!data) return <div>Loading...</div>
    const showCont = JSON.stringify({nameLast: data[0].nameLast, nameFirst: data[0].nameFirst})
    return (
        <Layout>
            <h1>User {router.query.id}</h1>
            <>
                {showCont}
            </>
        </Layout>
    )
}