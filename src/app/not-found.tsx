'use client'

import { useEffect } from 'react'

export default function NotFound() {
  useEffect(() => {
    // On GitHub Pages, any unknown route hits 404
    // Redirect to home with the original path so the SPA router can handle it
    const path = window.location.pathname.replace('/SMARTSHEET', '')
    if (path && path !== '/') {
      window.location.replace('/SMARTSHEET/?route=' + encodeURIComponent(path))
    }
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Redirecting...</h1>
        <p className="text-zinc-400">Loading your sheet</p>
      </div>
    </div>
  )
}
