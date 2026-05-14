import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ArrowLeft, Loader } from 'lucide-react'
import Loading from '../../components/ui/Loading'
import { getUserById, createUser, updateUser } from '../../libs/userService'

const EMPTY_FORM = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    isActive: true,
}

export default function UserEditPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = Boolean(id)

    const [form, setForm] = useState(EMPTY_FORM)
    const [loading, setLoading] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)

    useEffect(() => {
        if (isEdit) {
            const fetch = async () => {
                try {
                    setLoading(true)
                    const response = await getUserById(id)
                    const user = response.data
                    setForm({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userName: user.userName,
                        email: user.email,
                        password: '',
                        isActive: user.isActive,
                    })
                } catch (err) {
                    toast.error('Failed to fetch user')
                    navigate('/users')
                } finally {
                    setLoading(false)
                }
            }
            fetch()
        }
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.firstName.trim() || !form.lastName.trim()) {
            toast.error('Name is required')
            return
        }
        if (!form.email.trim()) {
            toast.error('Email is required')
            return
        }
        if (!isEdit && !form.password.trim()) {
            toast.error('Password is required')
            return
        }

        try {
            setSubmitLoading(true)
            if (isEdit) {
                await updateUser(id, {
                    firstName: form.firstName,
                    lastName: form.lastName,
                    userName: form.userName,
                    email: form.email,
                    isActive: form.isActive,
                })
                toast.success('User updated!')
            } else {
                await createUser(form)
                toast.success('User created!')
            }
            navigate('/users')
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong')
        } finally {
            setSubmitLoading(false)
        }
    }

    if (loading) return <Loading />

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate('/users')}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-fg-muted hover:bg-surface-hover hover:text-fg transition-all"
                >
                    <ArrowLeft size={18} />
                </button>
                <div>
                    <h1 className="text-2xl font-display font-bold text-fg">
                        {isEdit ? 'Edit User' : 'New User'}
                    </h1>
                    <p className="text-sm text-fg-muted mt-0.5">
                        {isEdit ? 'Update user details' : 'Fill in the details below'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="bg-surface border border-border rounded-xl p-6 space-y-5">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-fg">First Name</label>
                            <input
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                placeholder="John"
                                className="w-full h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-fg">Last Name</label>
                            <input
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                placeholder="Doe"
                                className="w-full h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-fg">Username</label>
                        <input
                            name="userName"
                            value={form.userName}
                            onChange={handleChange}
                            placeholder="johndoe"
                            className="w-full h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-fg">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="w-full h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        />
                    </div>

                    {!isEdit && (
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-fg">Password</label>
                            <input
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-fg">Status</label>
                        <div className="flex gap-2">
                            {[
                                { label: 'Active', value: true },
                                { label: 'Inactive', value: false },
                            ].map((s) => (
                                <button
                                    key={s.label}
                                    type="button"
                                    onClick={() => setForm((prev) => ({ ...prev, isActive: s.value }))}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${form.isActive === s.value
                                            ? 'bg-accent text-white'
                                            : 'bg-bg border border-border text-fg-muted hover:text-fg'
                                        }`}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/users')}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-fg-muted bg-surface border border-border hover:text-fg transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitLoading}
                        className="px-6 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:opacity-90 disabled:opacity-60 transition-all flex items-center gap-2"
                    >
                        {submitLoading && <Loader size={14} className="animate-spin" />}
                        {isEdit ? 'Save Changes' : 'Create User'}
                    </button>
                </div>
            </form>
        </div>
    )
}