"use client"
import { LogOut } from 'lucide-react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

const Navbar = () => {
    return (
        <div className='fixed right-7 top-3'>
            <Button
                onClick={() => signOut({ callbackUrl: '/' })}
            >
                <LogOut />
                <span>ထွက်မည်။</span>
            </Button>
        </div>
    )
}

export default Navbar