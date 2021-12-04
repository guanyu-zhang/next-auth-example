import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Layout from '../components/layout'
import AccessDenied from '../components/access-denied'

export default function Page () {
    const { data: session, status } = useSession()
    const loading = status === 'loading'
    const [ id , setID ] = useState()
    const [nameLast, setNameLast] = useState()
    const [nameFirst, setNameFirst] = useState()
    const [email, setEmail] = useState()
    const [addressID, setAddressID] = useState()
    const [googleID, setGoogleIO] = useState()

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
                setGoogleIO(json[0].googleID)
            }
        }
        fetchData()
    },[session])

    // When rendering client side don't display anything until loading is complete
    if (typeof window !== 'undefined' && loading) return null

    // If no session exists, display access denied message
    if (!session) { return  <Layout><AccessDenied/></Layout> }

    // If session exists, display content

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
                </table>
            }</strong></p>
        </Layout>
    )
}
