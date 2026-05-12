import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../store/slices/themeSlice'
import { Sun, Moon, Bell } from 'lucide-react'

export default function Navbar() {
    const dispatch = useDispatch()
    const mode = useSelector((s) => s.theme.mode)
    const user = useSelector((s) => s.auth.user)

    return (
        <header className="h-16 border-b border-border bg-surface flex items-center justify-between px-6 shrink-0">
            {/* Sol — sayfa başlığı olabilir ileride */}
            <div />

            {/* Sağ aksiyonlar */}
            <div className="flex items-center gap-2">
                {/* Bildirim */}
                <button className="w-9 h-9 rounded-lg flex items-center justify-center text-fg-muted hover:bg-surface-hover hover:text-fg transition-all">
                    <Bell size={18} />
                </button>

                {/* Theme toggle */}
                <button
                    onClick={() => dispatch(toggleTheme())}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-fg-muted hover:bg-surface-hover hover:text-fg transition-all"
                >
                    {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Avatar */}
                <div className="flex items-center gap-2.5 ml-2 pl-2 border-l border-border">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white text-sm font-display font-bold">
                        {user?.name?.charAt(0) ?? 'A'}
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-medium text-fg leading-none">{user?.name}</p>
                        <p className="text-xs text-fg-muted mt-0.5">{user?.email}</p>
                    </div>
                </div>
            </div>
        </header>
    )
}