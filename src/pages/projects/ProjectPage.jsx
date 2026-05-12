import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, ExternalLink, Github, FolderKanban, GitBranch } from 'lucide-react'

const TEMP_PROJECTS = [
    {
        id: 1,
        title: 'E-Commerce App',
        description: 'Full stack e-commerce platform with payment integration.',
        tech: ['React', 'Node.js', 'MongoDB'],
        status: 'published',
        github: 'https://github.com',
        live: 'https://example.com',
        image: null,
    },
    {
        id: 2,
        title: 'Portfolio v3',
        description: 'Personal portfolio built with Next.js and Tailwind CSS.',
        tech: ['Next.js', 'Tailwind', 'Framer Motion'],
        status: 'draft',
        github: 'https://github.com',
        live: null,
        image: null,
    },
    {
        id: 3,
        title: 'Chat Application',
        description: 'Real-time chat app with rooms and private messaging.',
        tech: ['Socket.io', 'Express', 'React'],
        status: 'published',
        github: 'https://github.com',
        live: 'https://example.com',
        image: null,
    },
    {
        id: 4,
        title: 'Task Manager',
        description: 'Kanban-style task management app with drag and drop.',
        tech: ['React', 'Redux', 'Tailwind'],
        status: 'draft',
        github: null,
        live: null,
        image: null,
    },
]

const statusStyles = {
    published: 'bg-green-500/10 text-green-500',
    draft: 'bg-fg-muted/10 text-fg-muted',
}

export default function ProjectPage() {
    const navigate = useNavigate()
    const [projects, setProjects] = useState(TEMP_PROJECTS)
    const [filter, setFilter] = useState('all')

    const filtered =
        filter === 'all' ? projects : projects.filter((p) => p.status === filter)

    const handleDelete = (id) => {
        setProjects((prev) => prev.filter((p) => p.id !== id))
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-fg">Projects</h1>
                    <p className="text-sm text-fg-muted mt-1">{projects.length} projects total</p>
                </div>
                <button
                    onClick={() => navigate('/projects/new')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:opacity-90 transition-all"
                >
                    <Plus size={16} />
                    New Project
                </button>
            </div>

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

            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-fg-muted">
                    <FolderKanban size={40} className="mb-3 opacity-30" />
                    <p className="text-sm">No projects found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map((project) => (
                        <div
                            key={project.id}
                            className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-4 hover:border-accent/50 transition-all"
                        >
                            <div className="w-full h-36 rounded-lg bg-bg-secondary flex items-center justify-center">
                                <span className="text-4xl font-display font-bold text-fg-muted opacity-30">
                                    {project.title.charAt(0)}
                                </span>
                            </div>

                            <div className="flex-1 space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-display font-semibold text-fg">{project.title}</h3>
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${statusStyles[project.status]}`}
                                    >
                                        {project.status}
                                    </span>
                                </div>
                                <p className="text-sm text-fg-muted line-clamp-2">{project.description}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="text-xs px-2 py-0.5 rounded-md bg-bg-secondary text-fg-muted border border-border"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-border pt-3">
                                <div className="flex items-center gap-2">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-fg-muted hover:bg-surface-hover hover:text-fg transition-all"
                                        >
                                            <GitBranch size={15} />
                                        </a>
                                    )}
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-fg-muted hover:bg-surface-hover hover:text-fg transition-all"
                                        >
                                            <ExternalLink size={15} />
                                        </a>
                                    )}
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => navigate(`/projects/${project.id}/edit`)}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-fg-muted hover:bg-surface-hover hover:text-fg transition-all"
                                    >
                                        <Pencil size={15} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-fg-muted hover:bg-red-500/10 hover:text-red-500 transition-all"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div >
            )
            }
        </div >
    )
}