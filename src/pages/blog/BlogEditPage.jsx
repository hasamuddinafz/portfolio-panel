import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ArrowLeft, Plus, X } from 'lucide-react'

const TEMP_POSTS = [
    {
        id: 1,
        title: 'Getting Started with Redux Toolkit',
        excerpt: 'A comprehensive guide to managing state with Redux Toolkit in React applications.',
        content: '',
        tags: ['React', 'Redux', 'State Management'],
        status: 'published',
    },
    {
        id: 2,
        title: 'CSS Grid vs Flexbox',
        excerpt: 'When to use CSS Grid and when to use Flexbox — a practical comparison.',
        content: '',
        tags: ['CSS', 'Frontend'],
        status: 'draft',
    },
    {
        id: 3,
        title: 'React Performance Tips',
        excerpt: 'Practical tips to optimize your React app and avoid unnecessary re-renders.',
        content: '',
        tags: ['React', 'Performance'],
        status: 'published',
    },
    {
        id: 4,
        title: 'Building REST APIs with Express',
        excerpt: 'Step by step guide to building a production-ready REST API with Express.js.',
        content: '',
        tags: ['Node.js', 'Express', 'API'],
        status: 'draft',
    },
]

const EMPTY_FORM = {
    title: '',
    excerpt: '',
    content: '',
    tags: [],
    status: 'draft',
}

export default function BlogEditPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = Boolean(id)

    const existing = isEdit
        ? TEMP_POSTS.find((p) => p.id === Number(id))
        : null

    const [form, setForm] = useState(existing ?? EMPTY_FORM)
    const [tagInput, setTagInput] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const addTag = () => {
        const trimmed = tagInput.trim()
        if (!trimmed) return
        if (form.tags.includes(trimmed)) {
            toast.error('Already added')
            return
        }
        setForm((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }))
        setTagInput('')
    }

    const removeTag = (t) => {
        setForm((prev) => ({ ...prev, tags: prev.tags.filter((x) => x !== t) }))
    }

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addTag()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!form.title.trim()) {
            toast.error('Title is required')
            return
        }
        if (!form.excerpt.trim()) {
            toast.error('Excerpt is required')
            return
        }

        toast.success(isEdit ? 'Post updated!' : 'Post created!')
        navigate('/blog')
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate('/blog')}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-fg-muted hover:bg-surface-hover hover:text-fg transition-all"
                >
                    <ArrowLeft size={18} />
                </button>
                <div>
                    <h1 className="text-2xl font-display font-bold text-fg">
                        {isEdit ? 'Edit Post' : 'New Post'}
                    </h1>
                    <p className="text-sm text-fg-muted mt-0.5">
                        {isEdit ? `Editing: ${existing?.title}` : 'Fill in the details below'}
                    </p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="bg-surface border border-border rounded-xl p-6 space-y-5">

                    {/* Title */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-fg">Title</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="My Blog Post"
                            className="w-full h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-fg">Excerpt</label>
                        <textarea
                            name="excerpt"
                            value={form.excerpt}
                            onChange={handleChange}
                            placeholder="Short summary of the post..."
                            rows={2}
                            className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-fg">
                            Content <span className="text-fg-muted font-normal">(Markdown)</span>
                        </label>
                        <textarea
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            placeholder="Write your post content here..."
                            rows={10}
                            className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none font-mono"
                        />
                    </div>

                    {/* Tags */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-fg">Tags</label>
                        <div className="flex gap-2">
                            <input
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagKeyDown}
                                placeholder="React, CSS..."
                                className="flex-1 h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                            <button
                                type="button"
                                onClick={addTag}
                                className="w-10 h-10 rounded-lg bg-accent text-white flex items-center justify-center hover:opacity-90 transition-all"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                        {form.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {form.tags.map((t) => (
                                    <span
                                        key={t}
                                        className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-bg-secondary text-fg-muted border border-border"
                                    >
                                        {t}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(t)}
                                            className="hover:text-red-500 transition-colors"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Status */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-fg">Status</label>
                        <div className="flex gap-2">
                            {['draft', 'published'].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setForm((prev) => ({ ...prev, status: s }))}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all
                    ${form.status === s
                                            ? 'bg-accent text-white'
                                            : 'bg-bg border border-border text-fg-muted hover:text-fg'
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/blog')}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-fg-muted bg-surface border border-border hover:text-fg transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:opacity-90 transition-all"
                    >
                        {isEdit ? 'Save Changes' : 'Create Post'}
                    </button>
                </div>
            </form>
        </div>
    )
}