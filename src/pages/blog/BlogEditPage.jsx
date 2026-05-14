import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ArrowLeft, Plus, X, Loader } from 'lucide-react'
import Loading from '../../components/ui/Loading'
import { getBlogById, createBlog, updateBlog } from '../../libs/blogService'
import RichTextEditor from '../../components/ui/RuchTextEditor'

const EMPTY_FORM = {
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    status: false,
    slug: '',
    externalLink: '',
}

export default function BlogEditPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = Boolean(id)

    const [form, setForm] = useState(EMPTY_FORM)
    const [tagList, setTagList] = useState([])
    const [tagInput, setTagInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)

    useEffect(() => {
        if (isEdit) {
            const fetch = async () => {
                try {
                    setLoading(true)
                    const response = await getBlogById(id)
                    const blog = response.data
                    setForm({
                        title: blog.title,
                        excerpt: blog.excerpt,
                        content: blog.content,
                        tags: blog.tags,
                        status: blog.status,
                        slug: blog.slug,
                        externalLink: blog.externalLink ?? '',
                    })
                    setTagList(blog.tags ? blog.tags.split(',').map((t) => t.trim()) : [])
                } catch (err) {
                    toast.error('Failed to fetch blog')
                    navigate('/blog')
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

        // title'dan otomatik slug üret
        if (name === 'title') {
            const slug = value
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
            setForm((prev) => ({ ...prev, title: value, slug }))
        }
    }

    const addTag = () => {
        const trimmed = tagInput.trim()
        if (!trimmed) return
        if (tagList.includes(trimmed)) {
            toast.error('Already added')
            return
        }
        setTagList((prev) => [...prev, trimmed])
        setTagInput('')
    }

    const removeTag = (t) => {
        setTagList((prev) => prev.filter((x) => x !== t))
    }

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addTag()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.title.trim()) {
            toast.error('Title is required')
            return
        }
        if (!form.excerpt.trim()) {
            toast.error('Excerpt is required')
            return
        }
        if (!form.slug.trim()) {
            toast.error('Slug is required')
            return
        }

        const payload = {
            ...form,
            tags: tagList.join(', '),
        }

        try {
            setSubmitLoading(true)
            if (isEdit) {
                await updateBlog(id, payload)
                toast.success('Blog updated!')
            } else {
                await createBlog(payload)
                toast.success('Blog created!')
            }
            navigate('/blog')
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong')
        } finally {
            setSubmitLoading(false)
        }
    }

    if (loading) return <Loading />

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
                        {isEdit ? 'Update post details' : 'Fill in the details below'}
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

                    {/* Slug */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-fg">
                            Slug <span className="text-fg-muted font-normal">(auto-generated)</span>
                        </label>
                        <input
                            name="slug"
                            value={form.slug}
                            onChange={handleChange}
                            placeholder="my-blog-post"
                            className="w-full h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all font-mono"
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
                        {/* Content */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-fg">Content</label>
                            <RichTextEditor
                                value={form.content}
                                onChange={(val) => setForm((prev) => ({ ...prev, content: val }))}
                            />
                        </div>
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
                        {tagList.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {tagList.map((t) => (
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
                            {[
                                { label: 'Draft', value: false },
                                { label: 'Published', value: true },
                            ].map((s) => (
                                <button
                                    key={s.label}
                                    type="button"
                                    onClick={() => setForm((prev) => ({ ...prev, status: s.value }))}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${form.status === s.value
                                            ? 'bg-accent text-white'
                                            : 'bg-bg border border-border text-fg-muted hover:text-fg'
                                        }`}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* External Link */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-fg">
                            External Link <span className="text-fg-muted font-normal">(optional)</span>
                        </label>
                        <input
                            name="externalLink"
                            value={form.externalLink}
                            onChange={handleChange}
                            placeholder="https://medium.com/..."
                            className="w-full h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        />
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
                        disabled={submitLoading}
                        className="px-6 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:opacity-90 disabled:opacity-60 transition-all flex items-center gap-2"
                    >
                        {submitLoading && <Loader size={14} className="animate-spin" />}
                        {isEdit ? 'Save Changes' : 'Create Post'}
                    </button>
                </div>
            </form>
        </div>
    )
}