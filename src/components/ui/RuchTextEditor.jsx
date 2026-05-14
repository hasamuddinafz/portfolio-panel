import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import {
    Bold, Italic, Strikethrough, Code, List, ListOrdered,
    Quote, Undo, Redo, Heading2, Heading3, Underline as UnderlineIcon,
    Highlighter, Link as LinkIcon, Image as ImageIcon, Code2,
} from 'lucide-react'
import { uploadFile } from '../../libs/fileService'

const lowlight = createLowlight(common)

const ToolbarButton = ({ onClick, active, title, children }) => (
    <button
        type="button"
        onClick={onClick}
        title={title}
        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all
      ${active
                ? 'bg-accent text-white'
                : 'text-fg-muted hover:bg-surface-hover hover:text-fg'
            }`}
    >
        {children}
    </button>
)

const Divider = () => <div className="w-px h-5 bg-border mx-1" />

export default function RichTextEditor({ value, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ codeBlock: false }),
            Underline,
            Highlight,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: { class: 'text-accent underline cursor-pointer' },
            }),
            Image.configure({
                HTMLAttributes: { class: 'rounded-lg max-w-full' },
            }),
            Placeholder.configure({
                placeholder: 'Write your post content here...',
            }),
            CodeBlockLowlight.configure({ lowlight }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    if (!editor) return null

    const addLink = () => {
        const url = window.prompt('Enter URL')
        if (!url) return
        editor.chain().focus().setLink({ href: url }).run()
    }


    const addImage = async () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = async (e) => {
            const file = e.target.files[0]
            if (!file) return

            const formData = new FormData()
            formData.append('file', file)

            try {
                const response = await uploadFile(formData)
                const url = response.data.url
                editor.chain().focus().setImage({ src: url }).run()
            } catch (err) {
                console.error('Image upload failed', err)
            }
        }
        input.click()
    }

    return (
        <div className="border border-border rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-bg">
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive('bold')}
                    title="Bold"
                >
                    <Bold size={14} />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive('italic')}
                    title="Italic"
                >
                    <Italic size={14} />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    active={editor.isActive('underline')}
                    title="Underline"
                >
                    <UnderlineIcon size={14} />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    active={editor.isActive('strike')}
                    title="Strikethrough"
                >
                    <Strikethrough size={14} />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    active={editor.isActive('highlight')}
                    title="Highlight"
                >
                    <Highlighter size={14} />
                </ToolbarButton>

                <Divider />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor.isActive('heading', { level: 2 })}
                    title="Heading 2"
                >
                    <Heading2 size={14} />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editor.isActive('heading', { level: 3 })}
                    title="Heading 3"
                >
                    <Heading3 size={14} />
                </ToolbarButton>

                <Divider />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editor.isActive('bulletList')}
                    title="Bullet List"
                >
                    <List size={14} />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editor.isActive('orderedList')}
                    title="Ordered List"
                >
                    <ListOrdered size={14} />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    active={editor.isActive('blockquote')}
                    title="Blockquote"
                >
                    <Quote size={14} />
                </ToolbarButton>

                <Divider />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    active={editor.isActive('code')}
                    title="Inline Code"
                >
                    <Code size={14} />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    active={editor.isActive('codeBlock')}
                    title="Code Block"
                >
                    <Code2 size={14} />
                </ToolbarButton>

                <Divider />

                <ToolbarButton
                    onClick={addLink}
                    active={editor.isActive('link')}
                    title="Add Link"
                >
                    <LinkIcon size={14} />
                </ToolbarButton>

                <ToolbarButton
                    onClick={addImage}
                    active={false}
                    title="Add Image"
                >
                    <ImageIcon size={14} />
                </ToolbarButton>

                <Divider />

                <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    active={false}
                    title="Undo"
                >
                    <Undo size={14} />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    active={false}
                    title="Redo"
                >
                    <Redo size={14} />
                </ToolbarButton>
            </div>

            {/* Editor */}
            <EditorContent
                editor={editor}
                className="p-4 min-h-64 text-fg bg-bg focus:outline-none"
            />
        </div>
    )
}