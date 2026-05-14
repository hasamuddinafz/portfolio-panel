import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { Lock, Palette, Sun, Moon, Loader } from 'lucide-react'
import { toggleTheme } from '../../store/slices/themeSlice'
import { changePassword } from '../../libs/userService'

export default function SettingsPage() {
    const dispatch = useDispatch()
    const mode = useSelector((s) => s.theme.mode)

    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirm: '',
    })
    const [passwordLoading, setPasswordLoading] = useState(false)

    const handlePasswordChange = (e) => {
        const { name, value } = e.target
        setPassword((prev) => ({ ...prev, [name]: value }))
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        if (!password.currentPassword || !password.newPassword || !password.confirm) {
            toast.error('All fields are required')
            return
        }
        if (password.newPassword !== password.confirm) {
            toast.error('Passwords do not match')
            return
        }
        if (password.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }
        try {
            setPasswordLoading(true)
            await changePassword({
                currentPassword: password.currentPassword,
                newPassword: password.newPassword,
            })
            toast.success('Password updated!')
            setPassword({ currentPassword: '', newPassword: '', confirm: '' })
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update password')
        } finally {
            setPasswordLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-display font-bold text-fg">Settings</h1>
                <p className="text-sm text-fg-muted mt-1">Manage your preferences</p>
            </div>

            {/* Password */}
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
                    <Lock size={16} className="text-accent" />
                    <h2 className="font-display font-semibold text-fg">Change Password</h2>
                </div>
                <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-fg">Current Password</label>
                        <input
                            name="currentPassword"
                            type="password"
                            value={password.currentPassword}
                            onChange={handlePasswordChange}
                            placeholder="••••••••"
                            className="w-full h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-fg">New Password</label>
                            <input
                                name="newPassword"
                                type="password"
                                value={password.newPassword}
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
                            disabled={passwordLoading}
                            className="px-6 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:opacity-90 disabled:opacity-60 transition-all flex items-center gap-2"
                        >
                            {passwordLoading && <Loader size={14} className="animate-spin" />}
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