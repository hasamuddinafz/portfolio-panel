import { Loader } from 'lucide-react'

export default function Loading({ fullScreen = false, text = 'Loading...' }) {
    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-bg flex items-center justify-center z-50">
                <div className="flex flex-col items-center gap-3">
                    <Loader size={32} className="animate-spin text-accent" />
                    <p className="text-sm text-fg-muted">{text}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3">
                <Loader size={24} className="animate-spin text-accent" />
                <p className="text-sm text-fg-muted">{text}</p>
            </div>
        </div>
    )
}