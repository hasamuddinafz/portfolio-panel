import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginThunk } from '../../store/slices/authSlice'
import { toast } from 'sonner'
import { Eye, EyeOff, Loader } from 'lucide-react'

export default function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error } = useSelector((s) => s.auth)

    const [form, setForm] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.email || !form.password) {
            toast.error('Please fill in all fields')
            return
        }

        const result = await dispatch(loginThunk(form))

        if (loginThunk.fulfilled.match(result)) {
            toast.success('Welcome back!')
            navigate('/dashboard')
        } else {
            toast.error(result.payload || 'Login failed')
        }
    }

    return (
        <div className="bg-surface border border-border rounded-2xl p-8">
            <div className="mb-6">
                <h1 className="text-2xl font-display font-bold text-fg">Welcome back</h1>
                <p className="text-sm text-fg-muted mt-1">Sign in to your panel</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-fg">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="admin@portfolio.com"
                        className="w-full h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-fg">Password</label>
                    <div className="relative">
                        <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full h-10 px-3 pr-10 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-fg transition-colors"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 rounded-lg bg-accent text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60 transition-all"
                >
                    {loading ? (
                        <>
                            <Loader size={16} className="animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        'Sign in'
                    )}
                </button>
            </form>
        </div>
    )
}