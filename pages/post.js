import React, {useState} from "react";
import Layout from "../components/layout";
import AccessDenied from "../components/access-denied";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import useSWR from "swr";
import Link from "next/link";

function Selector() {
    const handleParam = () => (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setQuery((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    const { data, error } = useSWR(`/api/games?offset=0`, fetcher);
    if (error) return <option value="" selected="selected" onChange={handleParam}>Nothing</option>
    if (!data) return <option value="" selected="selected" onChange={handleParam}>Nothing</option>
    return (<>
            {data.map(({Game_name, DEVELOPER, id}) => (
                <option value={id}  onChange={handleParam}>{Game_name}</option>
            ))}
        </>)
}


const fetcher = (url) => fetch(url).then((res) => res.json())
export default function Form() {
    const { data: session, status } = useSession()

    const router = useRouter()
    let userid = null
    if(status === "authenticated"){
        userid = session.localID
    }
    const [query, setQuery] = useState({
        title: "",
        content: ""
    });

    const handleParam = () => (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setQuery((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const post = async event => {
        event.preventDefault()
        const postContent = {};
        postContent.title = query.title
        postContent.content = query.content
        postContent.userID = userid
        // alert(JSON.stringify(postContent))
        const res = await fetch('/api/post', {
            body: JSON.stringify({
                data: postContent
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(res => {
            setQuery({ title: "", content: "" })
        })
        // const result = await res.json()
        // if(!res) return <>Loading</>
        // const
        alert("You just posted")
        router.push("/forums")
    }

    return (
        <Layout>
            <h1 className="py-1">Write A POST</h1>
                <form onSubmit={post}>
                    <div>
                    <span htmlFor="postTitle" className="font-weight-bold">Title:&nbsp;</span>
                    <input type="text"
                           name="title"
                           required
                           placeholder="Title"
                           className="form-control-sm"
                           value={query.title}
                           onChange={handleParam()}/>
                    </div>
                    <br/>
                    <span htmlFor="postContent" className="font-weight-bold">Game:&nbsp;</span>
                    <select name="select-game" id="select-game">
                        <Selector></Selector>
                    </select>
                    <div>
                        <br/>
                        <textarea type="textarea"
                                  name="content"
                                  required
                                  placeholder="Content"
                                  className="form-control-content"
                                  value={query.content}
                                  onChange={handleParam()}
                                  height={200}
                        />
                            <div><button type="submit"  className="btn btn-primary">post</button></div>
                    </div>
                </form>
        </Layout>
    )
}

// import React, { useState } from "react";
// // import styles from '../styles/Home.module.css'
//
// export default function App() {
//     const [query, setQuery] = useState({
//         title: "",
//         content: ""
//     });
//
//     // Update inputs value
//     const handleParam = () => (e) => {
//         const name = e.target.name;
//         const value = e.target.value;
//         setQuery((prevState) => ({
//             ...prevState,
//             [name]: value
//         }));
//     };
//     // Form Submit function
//     const formSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         Object.entries(query).forEach(([key, value]) => {
//             formData.append(key, value);
//         });
//         const res = await fetch(`${process.env.BACK_BASE_URL}/forums`, {
//             method: 'GET',
//             mode: 'cors',
//             headers: {
//                 'content_type': 'application/json',
//             },
//         }).then(response => {
//             setQuery({ title: "", content: "" })
//             return response.json();
//         });
//         if(!res) return <>Loading...</>
//         console.log('123')
//         return "abc"
//     };
//     return (
//         <div className="App">
//             <h1>NextJS form using Getform.io</h1>
//             <form onSubmit={formSubmit}>
//                 <div>
//                     <label>Title</label>
//                     <input
//                         type="text"
//                         name="title"
//                         required
//                         placeholder="Title"
//                         className="form-control"
//                         value={query.title}
//                         onChange={handleParam()}
//                     />
//                 </div>
//                 <div>
//                     <label>Content</label>
//                     <input
//                         type="text"
//                         name="content"
//                         required
//                         placeholder="Content"
//                         className="form-control"
//                         value={query.content}
//                         onChange={handleParam()}
//                     />
//                 </div>
//                 <button type="submit">Post</button>
//             </form>
//         </div>
//     );
// }