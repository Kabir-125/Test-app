'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";


export default function Home(){
    const [users, setUsers] = useState<{ email: string }[]>([]);
    const [id, setId] = useState(0);
    const router = useRouter();
    const { user, isLoaded } = useUser();

    useEffect(() => {
        fetch('/api/userlist')
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error('Error fetching users:', error));
    }, []);
    
    useEffect(() => {
        if(user){
            fetch(`/api/getUserId/${user?.emailAddresses[0].emailAddress}`)
            .then(response => response.json())
            .then(data => setId(data))
            .catch(error => console.error('Error fetching user id:', error));
        }
        console.log(id)
        
    },[user])

    if (!isLoaded) {
        return <div>Loading...</div>;
      }
      console.log("ki",id)


    return(
        <>
            <h1>Dashboard</h1>
            <Link href='/'>
                < div className="text-lg text-gray-700 hover:text-gray-900 underline">Go back to Home </div>
            </Link>
            <button 
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300 mt-5" 
                onClick={() => router.push(`/posts/${id}/1`) }> 
                    My posts 
            </button>
            <h2 className="mt-10 mb-5">List of Users: </h2>
            <ul >
                    {users.map(user => (
                    <li key={user.email}>{user.email}</li>
                    ))}
            </ul>
        </>
        
    )
}