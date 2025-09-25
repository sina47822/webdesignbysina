'use client'
import React, { useEffect, useState } from 'react'

// Helper to read XSRF-TOKEN cookie that Sanctum sets
function getCookie(name: string) {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

const dashboard = () => {
    const [user, setUser] = useState<{ name: string } | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000'

    useEffect( () => {
        const checkAuth = async () => {
            try {
                // 1) Ensure CSRF cookie exists (necessary for Sanctum)
                await fetch(`${API_BASE}/sanctum/csrf-cookie`, {
                    method: 'GET',
                    credentials: 'include',
                })
                const res = await fetch(`${API_BASE}/api/user/`, {
                method: 'GET',
                credentials: 'include', // sends cookies with request
                headers: {
                    // Some setups need this header on GET as well:
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') ?? '',
                },
            })
            console.log(res)
            if (!res.ok) {
                throw new Error(`${res.status} ${res.statusText}`)
            }
                    
            const data = await res.json()
            setUser({name: data.name})
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        checkAuth()

    }, [])

    
    if (loading) {
        return <div>Loading…</div>
    }

    if (error) {
        return <div>{error}</div>
    }
  return (
    <div>
      {user ? (
        <h1>Welcome, {user.name}!</h1>
      ) : (
        <h1>You are not logged in.</h1>
      )}
    </div>
  )
}

export default dashboard