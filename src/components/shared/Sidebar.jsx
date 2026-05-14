import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '../../store/slices/sidebarSlice'
import { logout } from '../../store/slices/authSlice'
import {
    LayoutDashboard,
    FolderKanban,
    FileText,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Zap,
    Users
} from 'lucide-react'

const NAV_ITEMS = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/projects', icon: FolderKanban, label: 'Projects' },
    { to: '/blog', icon: FileText, label: 'Blog' },
    { to: '/users', icon: Users, label: 'Users' },
    { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const collapsed = useSelector((s) => s.sidebar.collapsed)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <aside
            className="fixed left-0 top-0 h-screen z-40 flex flex-col bg-surface border-r border-border transition-all duration-300"
            style={{ width: collapsed ? '64px' : '240px' }}
        >
            {/* Logo */}
            <div className="flex items-center h-16 px-4 border-b border-border shrink-0 overflow-hidden">
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                        <Zap size={16} className="text-white" />
                    </div>
                    {!collapsed && (
                        <span className="font-display font-bold text-fg text-lg leading-none truncate">
                            Studio
                        </span>
                    )}
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-4 px-2 space-y-1 overflow-hidden">
                {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group
                                ${isActive
                                ? 'bg-accent text-white'
                                : 'text-fg-muted hover:bg-surface-hover hover:text-fg'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <Icon size={18} className="shrink-0" />
                                {!collapsed && <span className="truncate">{label}</span>}
                                {collapsed && (
                                    <div className="absolute left-14 bg-fg text-bg text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50">
                                        {label}
                                    </div>
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-2 border-t border-border">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-fg-muted hover:bg-red-500/10 hover:text-red-500 transition-all duration-150"
                >
                    <LogOut size={18} className="shrink-0" />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>

            {/* Toggle */}
            <button
                onClick={() => dispatch(toggleSidebar())}
                className="absolute -right-3 top-5 w-6 h-6 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all duration-150 z-50"
            >
                {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
            </button>
        </aside>
    )
}