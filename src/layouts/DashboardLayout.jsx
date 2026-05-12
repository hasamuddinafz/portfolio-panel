import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Sidebar from '../components/shared/Sidebar'
import Navbar from '../components/shared/Navbar'

export default function DashboardLayout() {
    const collapsed = useSelector((s) => s.sidebar.collapsed)

    return (
        <div className="flex h-screen overflow-hidden bg-bg">
            <Sidebar />
            <div
                className="flex flex-col flex-1 overflow-hidden transition-all duration-300"
                style={{ marginLeft: collapsed ? '64px' : '240px' }}
            >
                <Navbar />
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}