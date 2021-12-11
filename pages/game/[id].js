import { useRouter } from 'next/router'
import useSwr from 'swr'
import Layout from "../../components/layout";
import Image from 'next/image'
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Game() {
    const myLoader = ({src}) => {
        return `${src}`
    }

    const router = useRouter()
    // console.log(JSON.stringify(router.query))
    const { data, error } = useSwr(
        router.query.id ? `/api/game/${router.query.id}` : null,
        fetcher
    )

    if (error) return <div>Failed to load game</div>
    if (!data) return <div>Loading...</div>
    // const showCont = JSON.stringify({Game_name: data[0].Game_name, insertedAtTimestamp: data[0].insertedAtTimestamp})
    return (
        <Layout>
            <h2 className="py-2">{data[0].Game_name}</h2>

            <div className="py-3">
                <Link href={data[0].URL}>
                    <Image
                        loader={myLoader}
                        src={data[0].Image}
                        alt='Picture of the game'
                        width={400}
                        height={300}
                        className="figure"
                    />
                </Link>
            </div>
            <div>
                <u>Game ID: {data[0].id}</u>
            </div>
            <div>
                <u>Developer(s): {data[0].DEVELOPER.toString().slice(2, -2)}</u>
            </div>
        </Layout>
    )
}