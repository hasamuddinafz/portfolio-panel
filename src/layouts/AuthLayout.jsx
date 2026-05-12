import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Zap } from 'lucide-react'

export default function AuthLayout() {
    const isAuthenticated = useSelector((s) => s.auth.isAuthenticated)

    if (isAuthenticated) return <Navigate to="/dashboard" replace />

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="flex items-center gap-2 justify-center mb-8">
                    <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                        <Zap size={18} className="text-white" />
                    </div>
                    <span className="font-display font-bold text-2xl text-fg">Portfolio Studio</span>
                </div>
                <Outlet />
            </div>
        </div>
    )
}