'use client'

import { useState } from "react";

export default function Post( props: { id: number, title: string, content: string } ){
    const { id, title, content } = props;
    const [active, setactive] = useState(true)
    
    const handleUpdate = (id: number) => {
        // Handle update logic
      };
    
      const handleDelete = (id: number) => {
        fetch('/api/posts',{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        setactive(false);
      };
    
    return(
        <>
            {active && 
                <div className="bg-grey border-2 shadow rounded-lg p-4 mb-5">
                    <h2 className="text-xl font-bold text-gray-200">{title}</h2>
                    <p className="mt-2 text-gray-300">{content}</p>
                    <p className="mt-2 text-gray-400">Post No: {id}</p>
                    <div className="mt-4 flex space-x-4">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                        onClick={() => handleUpdate(id)}
                    >
                        Update
                    </button>
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                        onClick={() => handleDelete(id)}
                    >
                        Delete
                    </button>
                    </div>
                </div>
            }
        </>
        
        
    )
}