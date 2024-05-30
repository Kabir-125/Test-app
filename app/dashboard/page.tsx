import Link from "next/link";

export default function Home(){
    
    return(
        <>
            <h1>Dashboard</h1>
            <Link href='/'>
                < div className="text-lg text-gray-700 hover:text-gray-900 underline">Go back to Home </div>
            </Link>
        </>
        
    )
}