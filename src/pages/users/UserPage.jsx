import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Trash2, Loader, Users, Shield, Pencil, Plus } from 'lucide-react'
import Loading from '../../components/ui/Loading'
import { getAllUsers, deleteUser, assignRole } from '../../libs/userService'
import { getAllRoles } from '../../libs/roleService'

export default function UsersPage() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(false)
    const [deleteLoadingId, setDeleteLoadingId] = useState(null)
    const [assignLoadingId, setAssignLoadingId] = useState(null)
    const [selectedRoles, setSelectedRoles] = useState({})

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            const [usersRes, rolesRes] = await Promise.all([getAllUsers(), getAllRoles()])
            setUsers(usersRes.data)
            setRoles(rolesRes.data)
        } catch (err) {
            toast.error('Failed to fetch data')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            setDeleteLoadingId(id)
            await deleteUser(id)
            setUsers((prev) => prev.filter((u) => u.id !== id))
            toast.success('User deleted')
        } catch (err) {
            toast.error('Failed to delete user')
        } finally {
            setDeleteLoadingId(null)
        }
    }

    const handleAssignRole = async (userId) => {
        const roleId = selectedRoles[userId]
        if (!roleId) {
            toast.error('Please select a role')
            return
        }
        try {
            setAssignLoadingId(userId)
            await assignRole(userId, roleId)
            toast.success('Role assigned')
            fetchData()
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to assign role')
        } finally {
            setAssignLoadingId(null)
        }
    }

    if (loading) return <Loading />

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-fg">Users</h1>
                    <p className="text-sm text-fg-muted mt-1">{users.length} users total</p>
                </div>
                <button
                    onClick={() => navigate('/users/new')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:opacity-90 transition-all"
                >
                    <Plus size={16} />
                    New User
                </button>
            </div>

            {users.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-fg-muted">
                    <Users size={40} className="mb-3 opacity-30" />
                    <p className="text-sm">No users found</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-surface border border-border rounded-xl p-5 flex items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-white font-display font-bold shrink-0">
                                    {user.firstName?.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-fg">
                                        {user.firstName} {user.lastName}
                                    </p>
                                    <p className="text-xs text-fg-muted">{user.email}</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {user.roles?.map((role) => (
                                            <span
                                                key={role}
                                                className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium"
                                            >
                                                {role}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <select
                                    value={selectedRoles[user.id] || ''}
                                    onChange={(e) =>
                                        setSelectedRoles((prev) => ({ ...prev, [user.id]: e.target.value }))
                                    }
                                    className="h-8 px-2 rounded-lg border border-border bg-bg text-fg text-xs focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                                >
                                    <option value="">Select role</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => handleAssignRole(user.id)}
                                    disabled={assignLoadingId === user.id}
                                    className="h-8 px-3 rounded-lg bg-accent text-white text-xs font-medium flex items-center gap-1.5 hover:opacity-90 disabled:opacity-60 transition-all"
                                >
                                    {assignLoadingId === user.id ? (
                                        <Loader size={12} className="animate-spin" />
                                    ) : (
                                        <Shield size={12} />
                                    )}
                                    Assign
                                </button>
                                <button
                                    onClick={() => navigate(`/users/${user.id}/edit`)}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-fg-muted hover:bg-surface-hover hover:text-fg transition-all"
                                >
                                    <Pencil size={15} />
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    disabled={deleteLoadingId === user.id}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-fg-muted hover:bg-red-500/10 hover:text-red-500 transition-all disabled:opacity-50"
                                >
                                    {deleteLoadingId === user.id ? (
                                        <Loader size={15} className="animate-spin" />
                                    ) : (
                                        <Trash2 size={15} />
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}