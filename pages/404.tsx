import { Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function FourOhFour() {
  return <div className=" flex flex-col items-center justify-center min-h-screen">
    <Link href="/dashboard" className='font-medium text-violet-200 border p-4 rounded-lg hover:bg-violet-500 transition-all bg-violet-600
    '>
            Nuffin here go back to dashboard
    </Link>
  </div>
}