import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FolderKanban, FileText, Eye, TrendingUp, Pencil } from 'lucide-react'
import { toast } from 'sonner'
import Loading from '../../components/ui/Loading'
import { getAllProjects } from '../../libs/projectService'
import { getAllBlogs } from '../../libs/blogService'

const statusStyles = {
    true: 'bg-green-500/10 text-green-500',
    false: 'bg-fg-muted/10 text-fg-muted',
}

export default function DashboardPage() {
    const navigate = useNavigate()
    const user = useSelector((s) => s.auth.user)

    const [projects, setProjects] = useState([])
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true)
                const [projectsRes, blogsRes] = await Promise.all([
                    getAllProjects(),
                    getAllBlogs(),
                ])
                setProjects(projectsRes.data)
                setBlogs(blogsRes.data)
            } catch (err) {
                toast.error('Failed to fetch dashboard data')
            } finally {
                setLoading(false)
            }
        }
        fetch()
    }, [])

    const stats = [
        {
            label: 'Total Projects',
            value: projects.length,
            icon: FolderKanban,
            sub: `${projects.filter((p) => p.status).length} published`,
        },
        {
            label: 'Total Blogs',
            value: blogs.length,
            icon: FileText,
            sub: `${blogs.filter((b) => b.status).length} published`,
        },
        {
            label: 'Draft Projects',
            value: projects.filter((p) => !p.status).length,
            icon: Eye,
            sub: 'waiting to publish',
        },
        {
            label: 'Draft Blogs',
            value: blogs.filter((b) => !b.status).length,
            icon: TrendingUp,
            sub: 'waiting to publish',
        },
    ]

    if (loading) return <Loading />

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-display font-bold text-fg">
                    Good morning, {user?.firstName ?? user?.fullName?.split(' ')[0]} 👋
                </h1>
                <p className="text-sm text-fg-muted mt-1">
                    Here's what's happening with your portfolio.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(({ label, value, icon: Icon, sub }) => (
                    <div
                        key={label}
                        className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-3"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-fg-muted">{label}</span>
                            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                <Icon size={16} className="text-accent" />
                            </div>
                        </div>
                        <div>
                            <p className="text-2xl font-display font-bold text-fg">{value}</p>
                            <p className="text-xs text-fg-muted mt-1">{sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Recent Projects */}
                <div className="bg-surface border border-border rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-display font-semibold text-fg">Recent Projects</h2>
                        <button
                            onClick={() => navigate('/projects')}
                            className="text-xs text-accent hover:opacity-80 transition-all"
                        >
                            View all
                        </button>
                    </div>
                    <div className="space-y-3">
                        {projects.slice(0, 3).map((project) => (
                            <div
                                key={project.id}
                                className="flex items-center justify-between py-2 border-b border-border last:border-0"
                            >
                                <div>
                                    <p className="text-sm font-medium text-fg">{project.title}</p>
                                    <p className="text-xs text-fg-muted mt-0.5">
                                        {project.techStack?.split(',').slice(0, 2).join(', ')}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[project.status]}`}>
                                        {project.status ? 'published' : 'draft'}
                                    </span>
                                    <button
                                        onClick={() => navigate(`/projects/${project.id}/edit`)}
                                        className="w-7 h-7 rounded-lg flex items-center justify-center text-fg-muted hover:bg-surface-hover hover:text-fg transition-all"
                                    >
                                        <Pencil size={13} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {projects.length === 0 && (
                            <p className="text-sm text-fg-muted text-center py-4">No projects yet</p>
                        )}
                    </div>
                </div>

                {/* Recent Blogs */}
                <div className="bg-surface border border-border rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-display font-semibold text-fg">Recent Posts</h2>
                        <button
                            onClick={() => navigate('/blog')}
                            className="text-xs text-accent hover:opacity-80 transition-all"
                        >
                            View all
                        </button>
                    </div>
                    <div className="space-y-3">
                        {blogs.slice(0, 3).map((blog) => (
                            <div
                                key={blog.id}
                                className="flex items-center justify-between py-2 border-b border-border last:border-0"
                            >
                                <div>
                                    <p className="text-sm font-medium text-fg">{blog.title}</p>
                                    <p className="text-xs text-fg-muted mt-0.5">
                                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[blog.status]}`}>
                                        {blog.status ? 'published' : 'draft'}
                                    </span>
                                    <button
                                        onClick={() => navigate(`/blog/${blog.id}/edit`)}
                                        className="w-7 h-7 rounded-lg flex items-center justify-center text-fg-muted hover:bg-surface-hover hover:text-fg transition-all"
                                    >
                                        <Pencil size={13} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {blogs.length === 0 && (
                            <p className="text-sm text-fg-muted text-center py-4">No posts yet</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}