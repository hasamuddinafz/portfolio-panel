import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ArrowLeft, Plus, X } from 'lucide-react'

const TEMP_PROJECTS = [
    {
        id: 1,
        title: 'E-Commerce App',
        description: 'Full stack e-commerce platform with payment integration.',
        tech: ['React', 'Node.js', 'MongoDB'],
        status: 'published',
        github: 'https://github.com',
        live: 'https://example.com',
    },
    {
        id: 2,
        title: 'Portfolio v3',
        description: 'Personal portfolio built with Next.js and Tailwind CSS.',
        tech: ['Next.js', 'Tailwind', 'Framer Motion'],
        status: 'draft',
        github: 'https://github.com',
        live: '',
    },
    {
        id: 3,
        title: 'Chat Application',
        description: 'Real-time chat app with rooms and private messaging.',
        tech: ['Socket.io', 'Express', 'React'],
        status: 'published',
        github: 'https://github.com',
        live: 'https://example.com',
    },
    {
        id: 4,
        title: 'Task Manager',
        description: 'Kanban-style task management app with drag and drop.',
        tech: ['React', 'Redux', 'Tailwind'],
        status: 'draft',
        github: '',
        live: '',
    },
]

const EMPTY_FORM = {
    title: '',
    description: '',
    tech: [],
    status: 'draft',
    github: '',
    live: '',
}

export default function ProjectEditPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = Boolean(id)

    const existing = isEdit
        ? TEMP_PROJECTS.find((p) => p.id === Number(id))
        : null

    const [form, setForm] = useState(existing ?? EMPTY_FORM)
    const [techInput, setTechInput] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const addTech = () => {
        const trimmed = techInput.trim()
        if (!trimmed) return
        if (form.tech.includes(trimmed)) {
            toast.error('Already added')
            return
        }
        setForm((prev) => ({ ...prev, tech: [...prev.tech, trimmed] }))
        setTechInput('')
    }

    const removeTech = (t) => {
        setForm((prev) => ({ ...prev, tech: prev.tech.filter((x) => x !== t) }))
    }

    const handleTechKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addTech()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!form.title.trim()) {
            toast.error('Title is required')
            return
        }
        if (!form.description.trim()) {
            toast.error('Description is required')
            return
        }

        // Temp — developer branch'te API'ye bağlanacak
        toast.success(isEdit ? 'Project updated!' : 'Project created!')
        navigate('/projects')
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate('/projects')}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-fg-muted hover:bg-surface-hover hover:text-fg transition-all"
                >
                    <ArrowLeft size={18} />
                </button>
                <div>
                    <h1 className="text-2xl font-display font-bold text-fg">
                        {isEdit ? 'Edit Project' : 'New Project'}
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
                            placeholder="My Awesome Project"
                            className="w-full h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-fg">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="What does this project do?"
                            rows={4}
                            className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                        />
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-fg">Tech Stack</label>
                        <div className="flex gap-2">
                            <input
                                value={techInput}
                                onChange={(e) => setTechInput(e.target.value)}
                                onKeyDown={handleTechKeyDown}
                                placeholder="React, Node.js..."
                                className="flex-1 h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                            <button
                                type="button"
                                onClick={addTech}
                                className="w-10 h-10 rounded-lg bg-accent text-white flex items-center justify-center hover:opacity-90 transition-all"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                        {form.tech.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {form.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-bg-secondary text-fg-muted border border-border"
                                    >
                                        {t}
                                        <button
                                            type="button"
                                            onClick={() => removeTech(t)}
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

                    {/* Github */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-fg">
                            GitHub URL <span className="text-fg-muted font-normal">(optional)</span>
                        </label>
                        <input
                            name="github"
                            value={form.github}
                            onChange={handleChange}
                            placeholder="https://github.com/..."
                            className="w-full h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Live URL */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-fg">
                            Live URL <span className="text-fg-muted font-normal">(optional)</span>
                        </label>
                        <input
                            name="live"
                            value={form.live}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full h-10 px-3 rounded-lg border border-border bg-bg text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/projects')}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-fg-muted bg-surface border border-border hover:text-fg transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:opacity-90 transition-all"
                    >
                        {isEdit ? 'Save Changes' : 'Create Project'}
                    </button>
                </div>
            </form>
        </div>
    )
}