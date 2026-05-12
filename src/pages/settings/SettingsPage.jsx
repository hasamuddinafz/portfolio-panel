import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { User, Lock, Palette, Sun, Moon } from 'lucide-react'
import { toggleTheme } from '../../store/slices/themeSlice'

export default function SettingsPage() {
    const dispatch = useDispatch()
    const mode = useSelector((s) => s.theme.mode)
    const user = useSelector((s) => s.auth.user)

    const [profile, setProfile] = useState({
        name: user?.name ?? '',
        email: user?.email ?? '',
        bio: '',
        website: '',
    })

    const [password, setPassword] = useState({
        current: '',
        next: '',
        confirm: '',
    })

    const handleProfileChange = (e) => {
        const { name, value } = e.target
        setProfile((prev) => ({ ...prev, [name]: value }))
    }

    const handlePasswordChange = (e) => {
        const { name, value } = e.target
        setPassword((prev) => ({ ...prev, [name]: value }))
    }

    const handleProfileSubmit = (e) => {
        e.preventDefault()
        if (!profile.name.trim()) {
            toast.error('Name is required')
            return
        }
        // Temp — developer branch'te API'ye bağlanacak
        toast.success('Profile updated!')
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        if (!password.current || !password.next || !password.confirm) {
            toast.error('All fields are required')
            return
        }
        if (password.next !== password.confirm) {
            toast.error('Passwords do not match')
            return
        }
        if (password.next.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }
        // Temp — developer branch'te API'ye bağlanacak
        toast.success('Password updated!')
        setPassword({ current: '', next: '', confirm: '' })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-display font-bold text-fg">Settings</h1>
                <p className="text-sm text-fg-muted mt-1">Manage your account and preferences</p>
            </div>

            {/* Profile */}
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
                    <User size={16} className="text-accent" />
                    <h2 className="font-display font-semibold text-fg">Profile</h2>
                </div>
                <form onSubmit={handleProfileSubmit} className="p-6 space-y-4">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center text-white text-2xl font-display font-bold shrink-0">
                            {profile.name?.charAt(0) ?? 'A'}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-fg">{profile.name}</p>
                            <p className="text-xs text-fg-muted">{profile.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-fg">Name</label>
                            <input
                                name="name"
                                value={profile.name}
                                onChange={handleProfileChange}
                                placeholder="John Doe"
                                className="w-full h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-fg">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={profile.email}
                                onChange={handleProfileChange}
                                placeholder="admin@portfolio.com"
                                className="w-full h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-fg">
                            Bio <span className="text-fg-muted font-normal">(optional)</span>
                        </label>
                        <textarea
                            name="bio"
                            value={profile.bio}
                            onChange={handleProfileChange}
                            placeholder="A short bio about yourself..."
                            rows={3}
                            className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-fg">
                            Website <span className="text-fg-muted font-normal">(optional)</span>
                        </label>
                        <input
                            name="website"
                            value={profile.website}
                            onChange={handleProfileChange}
                            placeholder="https://yoursite.com"
                            className="w-full h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:opacity-90 transition-all"
                        >
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>

            {/* Password */}
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
                    <Lock size={16} className="text-accent" />
                    <h2 className="font-display font-semibold text-fg">Password</h2>
                </div>
                <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-fg">Current Password</label>
                        <input
                            name="current"
                            type="password"
                            value={password.current}
                            onChange={handlePasswordChange}
                            placeholder="••••••••"
                            className="w-full h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-fg">New Password</label>
                            <input
                                name="next"
                                type="password"
                                value={password.next}
                                onChange={handlePasswordChange}
                                placeholder="••••••••"
                                className="w-full h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-fg">Confirm Password</label>
                            <input
                                name="confirm"
                                type="password"
                                value={password.confirm}
                                onChange={handlePasswordChange}
                                placeholder="••••••••"
                                className="w-full h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:opacity-90 transition-all"
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>

            {/* Appearance */}
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
                    <Palette size={16} className="text-accent" />
                    <h2 className="font-display font-semibold text-fg">Appearance</h2>
                </div>
                <div className="p-6">
                    <p className="text-sm text-fg-muted mb-4">Choose your preferred theme</p>
                    <div className="flex gap-3">
                        {[
                            { value: 'light', icon: Sun, label: 'Light' },
                            { value: 'dark', icon: Moon, label: 'Dark' },
                        ].map(({ value, icon: Icon, label }) => (
                            <button
                                key={value}
                                onClick={() => mode !== value && dispatch(toggleTheme())}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all
                  ${mode === value
                                        ? 'bg-accent text-white border-accent'
                                        : 'bg-bg border-border text-fg-muted hover:text-fg'
                                    }`}
                            >
                                <Icon size={16} />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}