import { useRouter, Router} from 'next/router'
import useSwr from 'swr'
import Layout from "../../components/layout";
import Link from 'next/link'
import * as React from "react";
import { useSession } from 'next-auth/react'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Forum() {
    const { data: session, status } = useSession()
    const router = useRouter()
    // console.log(JSON.stringify(router.query))
    const { data, error } = useSwr(
        router.query.id ? `/api/forum/${router.query.id}` : null,
        fetcher
    )

    if (error) return <div>Failed to load forums</div>
    if (!data) return <div>Loading...</div>
    const showCont = data[0].content
    const author = data[0].userID
    const handleClick = async event => {
        event.preventDefault()
        const res = await fetch(`/api/forum/${router.query.id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        })
        alert("delete success")
        // need a redirect but have no idea how to implement
        router.push('/forums')
    }
    if(status === "authenticated" && parseInt(session.localID) === parseInt(author)) {
        return (
            <Layout>
                <h1>{data[0].title}</h1>
                <h4>
                    {/*<Link href={`/user/${encodeURIComponent(author)}`}>*/}
                    {/*    <a>Author: {author}</a>*/}
                    {/*</Link>*/}
                    <i>Author: <u>user {author}</u></i>
                </h4>
                <>
                    {showCont}
                </>
                <div>
                    <button onClick={handleClick}>Delete</button>
                </div>
            </Layout>
        )
    }
    else{
        return (
            <Layout>
                <h1>{data[0].title}</h1>
                <h4>
                    {/*<Link href={`/user/${encodeURIComponent(author)}`}>*/}
                    {/*    <a>Author: {author}</a>*/}
                    {/*</Link>*/}
                    <i>Author: <u>user {author}</u></i>
                </h4>
                <>
                    {showCont}
                </>
            </Layout>
        )
    }
}