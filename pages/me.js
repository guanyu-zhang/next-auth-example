import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Layout from '../components/layout'
import AccessDenied from '../components/access-denied'
import Link from "next/link";

export default function Page () {
    const { data: session, status } = useSession()
    const loading = status === 'loading'
    const [ id , setID ] = useState()
    const [nameLast, setNameLast] = useState()
    const [nameFirst, setNameFirst] = useState()
    const [email, setEmail] = useState()
    const [addressID, setAddressID] = useState()
    const [googleID, setGoogleID] = useState()
    const [steamID, setSteamID] = useState()

    // Fetch content from protected route
    useEffect(()=>{
        const fetchData = async () => {
            const res = await fetch('/api/myprofile')
            const json = await res.json()
            if (json[0]) {
                setID(json[0].ID)
                setNameLast(json[0].nameLast)
                setNameFirst(json[0].nameFirst)
                setEmail(json[0].email)
                setAddressID(json[0].addressID)
                setGoogleID(json[0].googleID)
                setSteamID(json[0].steamID)
            }
        }
        fetchData()
    },[session])

    // When rendering client side don't display anything until loading is complete
    if (typeof window !== 'undefined' && loading) return null

    // If no session exists, display access denied message
    if (!session) { return  <Layout><AccessDenied/></Layout> }

    // If session exists, display content
    if(session.steamID){
        return (
            <Layout>
                <h1>My Profile</h1>
                <p><strong>{
                    <table>
                        <tr>
                            <td>ID:</td>
                            <td>{id}</td>
                        </tr>
                        <tr>
                            <td>Last Name:</td>
                            <td>{nameLast}</td>
                        </tr>
                        <tr>
                            <td>First Name:</td>
                            <td>{nameFirst}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <td>Address ID:</td>
                            <td>{addressID}</td>
                        </tr>
                        <tr>
                            <td>Google ID:</td>
                            <td>{googleID}</td>
                        </tr>
                        <tr>
                            <td>Steam ID</td>
                            <td>{steamID}</td>
                        </tr>
                    </table>
                }</strong></p>
            </Layout>
        )
    }
    else{
        return (
            <Layout>
                <h1>My Profile</h1>
                <p><strong>{
                    <table>
                        <tr>
                            <td>ID:</td>
                            <td>{id}</td>
                        </tr>
                        <tr>
                            <td>Last Name:</td>
                            <td>{nameLast}</td>
                        </tr>
                        <tr>
                            <td>First Name:</td>
                            <td>{nameFirst}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <td>Address ID:</td>
                            <td>{addressID}</td>
                        </tr>
                        <tr>
                            <td>Google ID:</td>
                            <td>{googleID}</td>
                        </tr>
                        <tr>
                            <td>Login with Steam</td>
                            <td>
                                <Link href={`http://52.15.243.33:5000/steampowered/status`}>
                                    <a>Steam</a>
                                </Link>
                            </td>
                        </tr>
                    </table>
                }</strong></p>
            </Layout>
        )
    }
}
