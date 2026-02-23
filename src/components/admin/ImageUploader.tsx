'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface ImageUploaderProps {
  currentUrl?: string
  onUpload: (url: string) => void
  onRemove?: () => void
}

export default function ImageUploader({ currentUrl, onUpload, onRemove }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json()
        alert(data.error || 'Upload failed')
        return
      }
      const { url } = await res.json()
      onUpload(url)
    } catch {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div>
      {currentUrl ? (
        <div className="relative inline-block">
          <Image
            src={currentUrl}
            alt="Uploaded image"
            width={200}
            height={200}
            className="h-32 w-32 border border-gray-200 object-cover"
          />
          {onRemove && (
            <button
              onClick={onRemove}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center bg-red-500 text-xs text-white hover:bg-red-600"
              aria-label="Remove image"
            >
              &times;
            </button>
          )}
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex h-32 w-full cursor-pointer items-center justify-center border-2 border-dashed transition-colors ${
            dragOver ? 'border-orange-400 bg-orange-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {uploading ? (
            <span className="text-sm text-gray-500">Uploading...</span>
          ) : (
            <span className="text-sm text-gray-400">Drop image or click to upload</span>
          )}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}
