import React from "react"
import { Link } from "react-router-dom"

export const NoAccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">🚫 No Access</h1>
      <p className="text-gray-600">You do not have permission to view this page.</p>
      <Link to="/admin-login" className="text-blue-600 underline">
        Go to Login
      </Link>
    </div>
  )
}
