'use client'
import { useEffect, useState } from "react"
import Post from "./Post"

interface Post {
    id: number   
    title: string
    content: string
    authorId: number
    createdAt: Date     
}

export default function Posts ({params}:any) {
    const [ posts, setPosts ] = useState<Post[]>([]);
    const [ addPost, setAddPost] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch(`/api/getPosts/${params.id}`)
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(error => console.log("error occured", error))
    },[addPost])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch('/api/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, params }),
          })
        setAddPost(false);
      };
    
      const handleCancel = () => {
        setTitle('');
        setContent('');
        setAddPost(false);
      };
    
    return(
        <>
            { !addPost &&
            <button 
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300 mt-5 mb-10" 
                onClick={() => setAddPost(true)}
                >
                   + Add New Post
            </button>}

            {addPost &&
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                    <input 
                        type="text" 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        placeholder="Title"
                        required 
                    />
                    </div>
                    <div className="mb-4">
                    <textarea 
                        id="content" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        rows={5} 
                        placeholder="Content of your Post"
                        required 
                    ></textarea>
                    </div>
                    <div className="flex items-center justify-center space-x-5 mb-10">
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Add
                    </button>
                    <button 
                        type="button" 
                        onClick={handleCancel} 
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
                    >
                        Cancel
                    </button>
                    </div>
                </form>
            }

            <ul >
                {
                    posts.length>0 &&posts.map(post => (
                        <li key={post.id}>
                            <Post id = { post.id } title = { post.title } content = { post.content } />
                        </li>
                    ))
                }
            </ul>
        </>
    )
}