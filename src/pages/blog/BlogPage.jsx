import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, FileText } from 'lucide-react'

const TEMP_POSTS = [
    {
        id: 1,
        title: 'Getting Started with Redux Toolkit',
        excerpt: 'A comprehensive guide to managing state with Redux Toolkit in React applications.',
        tags: ['React', 'Redux', 'State Management'],
        status: 'published',
        date: 'May 10, 2026',
    },
    {
        id: 2,
        title: 'CSS Grid vs Flexbox',
        excerpt: 'When to use CSS Grid and when to use Flexbox — a practical comparison.',
        tags: ['CSS', 'Frontend'],
        status: 'draft',
        date: 'May 5, 2026',
    },
    {
        id: 3,
        title: 'React Performance Tips',
        excerpt: 'Practical tips to optimize your React app and avoid unnecessary re-renders.',
        tags: ['React', 'Performance'],
        status: 'published',
        date: 'Apr 28, 2026',
    },
    {
        id: 4,
        title: 'Building REST APIs with Express',
        excerpt: 'Step by step guide to building a production-ready REST API with Express.js.',
        tags: ['Node.js', 'Express', 'API'],
        status: 'draft',
        date: 'Apr 20, 2026',
    },
]

const statusStyles = {
    published: 'bg-green-500/10 text-green-500',
    draft: 'bg-fg-muted/10 text-fg-muted',
}

export default function BlogPage() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState(TEMP_POSTS)
    const [filter, setFilter] = useState('all')

    const filtered =
        filter === 'all' ? posts : posts.filter((p) => p.status === filter)

    const handleDelete = (id) => {
        setPosts((prev) => prev.filter((p) => p.id !== id))
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-fg">Blog</h1>
                    <p className="text-sm text-fg-muted mt-1">{posts.length} posts total</p>
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
                    {filtered.map((post) => (
                        <div
                            key={post.id}
                            className="bg-surface border border-border rounded-xl p-5 flex items-start justify-between gap-4 hover:border-accent/50 transition-all"
                        >
                            <div className="flex-1 min-w-0 space-y-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-display font-semibold text-fg">{post.title}</h3>
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[post.status]}`}
                                    >
                                        {post.status}
                                    </span>
                                </div>
                                <p className="text-sm text-fg-muted line-clamp-2">{post.excerpt}</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-fg-muted">{post.date}</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs px-2 py-0.5 rounded-md bg-bg-secondary text-fg-muted border border-border"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                                <button
                                    onClick={() => navigate(`/blog/${post.id}/edit`)}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-fg-muted hover:bg-surface-hover hover:text-fg transition-all"
                                >
                                    <Pencil size={15} />
                                </button>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-fg-muted hover:bg-red-500/10 hover:text-red-500 transition-all"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}