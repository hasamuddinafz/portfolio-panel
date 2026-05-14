import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, FileText, Loader } from 'lucide-react'
import { toast } from 'sonner'
import Loading from '../../components/ui/Loading'
import { getAllBlogs, deleteBlog } from '../../libs/blogService'

const statusStyles = {
    true: 'bg-green-500/10 text-green-500',
    false: 'bg-fg-muted/10 text-fg-muted',
}

export default function BlogPage() {
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)
    const [deleteLoadingId, setDeleteLoadingId] = useState(null)
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        try {
            setLoading(true)
            const response = await getAllBlogs()
            setBlogs(response.data)
        } catch (err) {
            toast.error('Failed to fetch blogs')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            setDeleteLoadingId(id)
            await deleteBlog(id)
            setBlogs((prev) => prev.filter((b) => b.id !== id))
            toast.success('Blog deleted')
        } catch (err) {
            toast.error('Failed to delete blog')
        } finally {
            setDeleteLoadingId(null)
        }
    }

    const filtered =
        filter === 'all'
            ? blogs
            : blogs.filter((b) => (filter === 'published' ? b.status : !b.status))

    if (loading) return <Loading />

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-fg">Blog</h1>
                    <p className="text-sm text-fg-muted mt-1">{blogs.length} posts total</p>
                </div>
                <button
                    onClick={() => navigate('/blog/new')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:opacity-90 transition-all"
                >
                    <Plus size={16} />
                    New Post
                </button>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
                {['all', 'published', 'draft'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${filter === f
                                ? 'bg-accent text-white'
                                : 'bg-surface border border-border text-fg-muted hover:text-fg'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* List */}
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-fg-muted">
                    <FileText size={40} className="mb-3 opacity-30" />
                    <p className="text-sm">No posts found</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filtered.map((blog) => (
                        <div
                            key={blog.id}
                            className="bg-surface border border-border rounded-xl p-5 flex items-start justify-between gap-4 hover:border-accent/50 transition-all"
                        >
                            <div className="flex-1 min-w-0 space-y-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-display font-semibold text-fg">{blog.title}</h3>
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[blog.status]}`}
                                    >
                                        {blog.status ? 'published' : 'draft'}
                                    </span>
                                </div>
                                <p className="text-sm text-fg-muted line-clamp-2">{blog.excerpt}</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-fg-muted">
                                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {blog.tags?.split(',').map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs px-2 py-0.5 rounded-md bg-bg-secondary text-fg-muted border border-border"
                                            >
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                                <button
                                    onClick={() => navigate(`/blog/${blog.id}/edit`)}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-fg-muted hover:bg-surface-hover hover:text-fg transition-all"
                                >
                                    <Pencil size={15} />
                                </button>
                                <button
                                    onClick={() => handleDelete(blog.id)}
                                    disabled={deleteLoadingId === blog.id}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-fg-muted hover:bg-red-500/10 hover:text-red-500 transition-all disabled:opacity-50"
                                >
                                    {deleteLoadingId === blog.id ? (
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