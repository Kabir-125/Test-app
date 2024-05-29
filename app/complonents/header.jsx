import Link from 'next/link'
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

const Header = () => {
    return (
        <>
            <nav className='bg-red-700 py-4 px-6 flex items center justify-between mb-5'>
                <div className='flex items-center'>
                    <Link href="/">
                        Home
                    </Link>
                </div>
                <div className='flex items-center'>
                    <SignedOut>
                        <Link href="/sign-in" className='mr-5'>Sign in</Link>
                        <Link href="/sign-up">Sign up</Link>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/profile" className='mr-5'>Profile</Link>
                        <UserButton afterSignOutUrl='/'/>
                    </SignedIn>
                </div>
            </nav>
        </>
    )
}

export default Header;