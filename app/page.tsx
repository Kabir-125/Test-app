import Link from 'next/link'

export default function Dashboard() {
  return (
    <>
       <div className="text-xl font-bold text-blue-600 mb-4">Home</div>
       <div>
        Log in to view
        <Link href='/dashboard'>
          < div className="text-lg text-gray-700 hover:text-gray-900 underline"> Dashboard </div>
        </Link>
       </div>
      
    </>
    
  );
}
