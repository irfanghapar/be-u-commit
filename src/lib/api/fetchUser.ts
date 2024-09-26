import { useQuery } from 'react-query'

export async function fetchUserProfile(username: string) {
  // Replace this with your actual API call
  const response = await fetch(`/api/users/${username}`)
  if (!response.ok) {
    throw new Error('Failed to fetch user profile')
  }
  return response.json()
}

export function getUserProfile(username: string) {
  return useQuery(['user', username], () => fetchUserProfile(username))
}