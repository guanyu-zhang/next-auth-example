import useSWR from 'swr'
import * as React from "react";
import {useState} from "react";
import Layout from "../components/layout";
import Link from 'next/link'

const fetcher = (url) => fetch(url).then((res) => res.json())

function App () {
    // const [pageOffset, setPageOffset] = useState(0);
    // const limit = 1;
    const [pageOffset, setPageOffset] = useState(0);
    return (
        <Layout>
            <h1>Games</h1>
            <Page offset={pageOffset}/>
            <button onClick={() => setPageOffset(pageOffset - 20 > 0 ? pageOffset - 20 : 0)}>Previous</button>
            <button onClick={() => setPageOffset(pageOffset + 20)}>Next</button>
        </Layout>
    )
}


function Page ({ offset }) {
    const { data, error } = useSWR(`/api/games?offset=${offset}`, fetcher);

    // ... handle loading and error states
    if (error) return <div>failed to load</div>
    if (!data) return <>Loading...</>
    // const forum1 = data[0];
    // const forum_id = forum1.ID;
    // const accessToken = forum1.accessToken;
    // const email = forum1.email;
    return(
        <>
            <table>
                {data.map(({Game_name, DEVELOPER, id}) => (
                        <tr key={id}>
                            <td>GameID: {id}</td>
                            <td>
                                <Link href={`/game/${encodeURIComponent(id)}`}>
                                    <a>Game_name: {Game_name}</a>
                                </Link>
                            </td>
                            <td>DEVELOPER: {DEVELOPER}</td>
                        </tr>
                    )
                )

                }
            </table>
        </>
    )

}

export default App;