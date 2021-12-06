import { useRouter } from 'next/router'
import useSwr from 'swr'
import Layout from "../../components/layout";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Forum() {
    const router = useRouter()
    // console.log(JSON.stringify(router.query))
    const { data, error } = useSwr(
        router.query.id ? `/api/game/${router.query.id}` : null,
        fetcher
    )

    if (error) return <div>Failed to load game</div>
    if (!data) return <div>Loading...</div>
    const showCont = JSON.stringify({Game_name: data[0].Game_name, insertedAtTimestamp: data[0].insertedAtTimestamp})
    return (
        <Layout>
            <h1>Game {router.query.id}</h1>
            <>
                {showCont}
            </>
        </Layout>
    )
}