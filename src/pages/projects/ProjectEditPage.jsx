import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ArrowLeft, Plus, X, Loader } from 'lucide-react'
import { createProject, getProjectById, updateProject } from '../../libs/projectService'
import Loading from '../../components/ui/Loading'

const EMPTY_FORM = {
    title: '',
    description: '',
    techStack: '',
    status: false,
    githubUrl: '',
    liveUrl: '',
}

export default function ProjectEditPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = Boolean(id)

    const [form, setForm] = useState(EMPTY_FORM)
    const [techList, setTechList] = useState([])
    const [techInput, setTechInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)

    useEffect(() => {
        if (isEdit) {
            const fetch = async () => {
                try {
                    setLoading(true)
                    const response = await getProjectById(id)
                    const project = response.data
                    setForm({
                        title: project.title,
                        description: project.description,
                        techStack: project.techStack,
                        status: project.status,
                        githubUrl: project.githubUrl ?? '',
                        liveUrl: project.liveUrl ?? '',
                    })
                    setTechList(project.techStack ? project.techStack.split(',').map(t => t.trim()) : [])
                } catch (err) {
                    toast.error('Failed to fetch project')
                    navigate('/projects')
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

    const addTech = () => {
        const trimmed = techInput.trim()
        if (!trimmed) return
        if (techList.includes(trimmed)) {
            toast.error('Already added')
            return
        }
        setTechList((prev) => [...prev, trimmed])
        setTechInput('')
    }

    const removeTech = (t) => {
        setTechList((prev) => prev.filter((x) => x !== t))
    }

    const handleTechKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addTech()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.title.trim()) {
            toast.error('Title is required')
            return
        }
        if (!form.description.trim()) {
            toast.error('Description is required')
            return
        }
        if (techList.length === 0) {
            toast.error('At least one tech is required')
            return
        }

        const payload = {
            ...form,
            techStack: techList.join(', '),
        }

        try {
            setSubmitLoading(true)
            if (isEdit) {
                await updateProject(id, payload)
                toast.success('Project updated!')
            } else {
                await createProject(payload)
                toast.success('Project created!')
            }
            navigate('/projects')
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
                        {isEdit ? 'Update project details' : 'Fill in the details below'}
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
                        {techList.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {techList.map((t) => (
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

                    {/* Github */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-fg">
                            GitHub URL <span className="text-fg-muted font-normal">(optional)</span>
                        </label>
                        <input
                            name="githubUrl"
                            value={form.githubUrl}
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
                            name="liveUrl"
                            value={form.liveUrl}
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
                        disabled={submitLoading}
                        className="px-6 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:opacity-90 disabled:opacity-60 transition-all flex items-center gap-2"
                    >
                        {submitLoading && <Loader size={14} className="animate-spin" />}
                        {isEdit ? 'Save Changes' : 'Create Project'}
                    </button>
                </div>
            </form>
        </div>
    )
}