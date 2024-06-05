'use client'
import { useEffect, useState } from "react"
import Post from "./Post"
import { useRouter } from "next/navigation"

interface Post {
    id: number   
    title: string
    content: string
    authorId: number
    createdAt: Date     
}

export default function Posts ({params}:any) {
    const [ posts, setPosts ] = useState<Post[]>([]);
    const [ pagePosts, setPagePosts ] = useState<Post[]>([]);
    const [ pageNo, setPageNo] = useState(0);
    const [ addPost, setAddPost] = useState(false);
    const [ title, setTitle] = useState('');
    const [ content, setContent] = useState('');
    const [ update, alterupdate] = useState(true);
    const [ id, page] = params.id;
    const router = useRouter();
    
    useEffect(() => {
        fetch(`/api/getPosts/${id}/${page}`)
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(error => console.log("error occured", error))
    },[ addPost, update ])

    useEffect( () => {
        fetch(`/api/posts/?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( response => response.json())
        .then( ( data ) => {
            const page = Math.max((( parseInt(data) + 1)/ 2) | 0, 1);
            setPageNo(page);
        });
    }, [addPost, posts])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch('/api/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, id }),
          })
          setTitle('');
          setContent('');
        setAddPost(false);
      };
    
      const handleCancel = () => {
        setTitle('');
        setContent('');
        setAddPost(false);
      };

      const updatePage = () => {
        alterupdate(!update);
      }
    
    function onPageClick(no: number) {
        router.push(`/posts/${id}/${no}`)
    }

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
                            <Post id = { post.id } title = { post.title } content = { post.content } update = { updatePage } />
                        </li>
                    ))
                }
            </ul>

            <div className="flex flex-wrap justify-center items-center">
                Pages: 
                {Array.from({ length: pageNo }).map((_, index) => (
                    <div
                        key={index}
                        className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center border border-gray-300 m-2 cursor-pointer hover:bg-blue-700 transition duration-300"
                        onClick={() => onPageClick(index + 1)}
                        >
                            {index + 1}
                    </div>
                ))}
            </div>
        </>
    )
}