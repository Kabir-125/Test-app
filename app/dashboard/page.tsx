'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { format } from 'date-fns';

export default function Home(){
    const [ users, setUsers ] = useState<{ email: string }[]>([]);
    const [ id, setId ] = useState(0);
    const router = useRouter();
    const { user, isLoaded } = useUser();
    const [ checksList, setChecksList ] = useState<{ id: number, message:string, createdAt: Date}[]>([])

    useEffect(() => {
        fetch('/api/userlist')
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error('Error fetching users:', error));
    }, []);

    useEffect(() => {
        fetch('/api/getChecks')
        .then( response => response.json())
        .then( data => setChecksList(data))
    },[])
    
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
            <div className="p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 mt-10">Checks List</h2>
                <div className="grid grid-cols-2 gap-4 font-semibold">
                    <div>Message</div>
                    <div>Created At</div>
                </div>
                <div className="divide-y divide-gray-300">
                    {
                        checksList.map(entry => (
                            <div key={entry.id} className="grid grid-cols-2 gap-4 py-2">
                                <div>{entry?.message}</div>
                                <div>{entry?.createdAt ? format(new Date(entry.createdAt), 'PPpp') : ''}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
        
    )
}