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
            <h1>Forums</h1>
            <Page offset={pageOffset}/>
            <br/>
            <Link  href={'/post'} >
                <a className=" font-weight-bold">New Post</a>
            </Link>
            &emsp;&emsp;
            <button className="btn btn-primary" onClick={() => setPageOffset(pageOffset - 10 > 0 ? pageOffset - 10 : 0)}>Previous</button>
            &emsp;
            <button className="btn btn-primary" onClick={() => setPageOffset(pageOffset + 10)}>Next</button>
        </Layout>
        )
}


function Page ({ offset }) {
    const { data, error } = useSWR(`/api/forums?offset=${offset}`, fetcher);

    // ... handle loading and error states
    if (error) return <div>failed to load</div>
    if (!data) return <>Loading...</>
    // const forum1 = data[0];
    // const forum_id = forum1.ID;
    // const accessToken = forum1.accessToken;
    // const email = forum1.email;
    return(
        <>
            <table className="table border-top text-center table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Create Time</th>
                    </tr>
                </thead>
                <tbody className="table-striped">
                {data.map(({f_id,title,create_date,userID,content,create_time}) => (
                        <tr key={f_id}>
                            <td>
                                <Link href={`/forum/${encodeURIComponent(f_id)}`}>
                                    <a className="text-muted">{title}</a>
                                </Link>
                            </td>
                            {/*<td>{create_date}</td>*/}
                            <td>{userID}</td>
                            {/*<td>{content}</td>*/}
                            <td>{create_time}</td>
                        </tr>
                    )
                )

                }
                </tbody>
            </table>

        </>
    )

}

export default App;