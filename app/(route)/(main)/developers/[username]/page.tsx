import { useParams } from 'next/navigation'
import { fetchUserProfile } from '@/lib/api/fetchUser' 

export default function DeveloperProfile() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hello</h1>
      <p>Username: {}</p>
    </div>
  )
}