'use client'

import { useState } from "react";

export default function Post( props: { id: number, title: string, content: string, update: any } ){
    var { id, title, content, update } = props;
    const [active, setactive] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [UpdatedContent, setUpdatedContent] = useState(content);
    
    const handleUpdate = () => {
        setactive(false);
        setUpdating(true);
      };
    
    const handleDelete = (id: number) => {
        fetch('/api/posts',{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        .then( response => {
            setactive(false);
            update();
        })
        ;
        
    };
    
    const handleUpdatePost = (e: React.FormEvent) => {
        e.preventDefault();
        fetch('/api/posts', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ updatedTitle, UpdatedContent, id }),
          })
        setactive(true);
        setUpdating(false);
        update();
    }
    
    const handleCancel = () => {
        setactive(true);
        setUpdating(false);
    }
    
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
                        onClick={() => handleUpdate()}
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
            {updating && 
                <div className="bg-grey border-2 shadow rounded-lg p-4 mb-5">
                <form onSubmit={handleUpdatePost}>
                <div className="text-xl font-bold text-gray-200">
                <input 
                    type="text" 
                    id="title" 
                    value={updatedTitle} 
                    onChange={(e) => setUpdatedTitle(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                    placeholder="Title"
                    required 
                />
                </div>
                <div className="mt-2 text-gray-300">
                <textarea 
                    id="content" 
                    value={UpdatedContent} 
                    onChange={(e) => setUpdatedContent(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                    rows={5} 
                    placeholder="Content of your Post"
                    required 
                ></textarea>
                </div>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 mr-3"
                        type="submit" 
                    >
                        Update
                    </button>
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                        onClick={() => handleCancel()}
                    >
                        Cancel
                    </button>
            </form>
            </div>

            }
        </>
        
        
    )
}