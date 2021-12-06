import { useRouter } from 'next/router'
import useSwr from 'swr'
import Layout from "../../components/layout";
import Link from 'next/link'
import * as React from "react";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Forum() {
    const router = useRouter()
    // console.log(JSON.stringify(router.query))
    const { data, error } = useSwr(
        router.query.id ? `/api/forum/${router.query.id}` : null,
        fetcher
    )

    if (error) return <div>Failed to load forums</div>
    if (!data) return <div>Loading...</div>
    const showCont = JSON.stringify(data[0])
    const author = data[0].userID
    return (
        <Layout>
            <h1>Forum {router.query.id}</h1>
            <h2>
                <Link href={`/user/${encodeURIComponent(author)}`}>
                    <a>Author: {author}</a>
                </Link>
            </h2>
            <>
                {showCont}
            </>
        </Layout>
    )
}