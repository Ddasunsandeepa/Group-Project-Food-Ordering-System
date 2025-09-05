import React from "react"
import { Navigate } from "react-router-dom"
import { useAdminUser } from "@/contexts/AdminUserContext"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { admin } = useAdminUser()

  if (!admin || !admin.token) {
    // Not authenticated → redirect to "No Access" page
    return <Navigate to="/no-access" replace />
  }

  // Authenticated → render children
  return <>{children}</>
}
