import { useSelector } from 'react-redux'
import { FolderKanban, FileText, Eye, TrendingUp } from 'lucide-react'

const STATS = [
    {
        label: 'Total Projects',
        value: '12',
        icon: FolderKanban,
        trend: '+2 this month',
        up: true,
    },
    {
        label: 'Blog Posts',
        value: '8',
        icon: FileText,
        trend: '+1 this month',
        up: true,
    },
    {
        label: 'Portfolio Views',
        value: '1,240',
        icon: Eye,
        trend: '+18% this week',
        up: true,
    },
    {
        label: 'Avg. Time on Site',
        value: '2m 34s',
        icon: TrendingUp,
        trend: '-4% this week',
        up: false,
    },
]

const RECENT_PROJECTS = [
    { id: 1, title: 'E-Commerce App', tech: 'React, Node.js', status: 'published' },
    { id: 2, title: 'Portfolio v3', tech: 'Next.js, Tailwind', status: 'draft' },
    { id: 3, title: 'Chat Application', tech: 'Socket.io, Express', status: 'published' },
]

const RECENT_POSTS = [
    { id: 1, title: 'Getting Started with Redux Toolkit', date: 'May 10, 2026', status: 'published' },
    { id: 2, title: 'CSS Grid vs Flexbox', date: 'May 5, 2026', status: 'draft' },
    { id: 3, title: 'React Performance Tips', date: 'Apr 28, 2026', status: 'published' },
]

const statusStyles = {
    published: 'bg-green-500/10 text-green-500',
    draft: 'bg-fg-muted/10 text-fg-muted',
}

export default function DashboardPage() {
    const user = useSelector((s) => s.auth.user)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-display font-bold text-fg">
                    Good morning, {user?.name?.split(' ')[0]} 👋
                </h1>
                <p className="text-sm text-fg-muted mt-1">
                    Here's what's happening with your portfolio.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS.map(({ label, value, icon: Icon, trend, up }) => (
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
                            <p className={`text-xs mt-1 ${up ? 'text-green-500' : 'text-red-400'}`}>
                                {trend}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Recent Projects */}
                <div className="bg-surface border border-border rounded-xl p-5">
                    <h2 className="font-display font-semibold text-fg mb-4">Recent Projects</h2>
                    <div className="space-y-3">
                        {RECENT_PROJECTS.map((project) => (
                            <div
                                key={project.id}
                                className="flex items-center justify-between py-2 border-b border-border last:border-0"
                            >
                                <div>
                                    <p className="text-sm font-medium text-fg">{project.title}</p>
                                    <p className="text-xs text-fg-muted mt-0.5">{project.tech}</p>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[project.status]}`}>
                                    {project.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Posts */}
                <div className="bg-surface border border-border rounded-xl p-5">
                    <h2 className="font-display font-semibold text-fg mb-4">Recent Posts</h2>
                    <div className="space-y-3">
                        {RECENT_POSTS.map((post) => (
                            <div
                                key={post.id}
                                className="flex items-center justify-between py-2 border-b border-border last:border-0"
                            >
                                <div>
                                    <p className="text-sm font-medium text-fg">{post.title}</p>
                                    <p className="text-xs text-fg-muted mt-0.5">{post.date}</p>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[post.status]}`}>
                                    {post.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}