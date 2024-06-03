'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home(){
    const [users, setUsers] = useState<{ email: string }[]>([]);

    useEffect(() => {
        fetch('/api/userlist')
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error('Error fetching users:', error));
    }, []);

    return(
        <>
            <h1>Dashboard</h1>
            <Link href='/'>
                < div className="text-lg text-gray-700 hover:text-gray-900 underline">Go back to Home </div>
            </Link>
            <h2 className="mt-10 mb-5">List of Users:</h2>
            <ul >
                    {users.map(user => (
                    <li key={user.email}>{user.email}</li>
                    ))}
            </ul>
        </>
        
    )
}