'use client'

interface DynamicListProps {
  items: string[]
  onChange: (items: string[]) => void
  label: string
  placeholder?: string
}

export default function DynamicList({ items, onChange, label, placeholder }: DynamicListProps) {
  function addItem() {
    onChange([...items, ''])
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index))
  }

  function updateItem(index: number, value: string) {
    const next = [...items]
    next[index] = value
    onChange(next)
  }

  function moveItem(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= items.length) return
    const next = [...items]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <button
          type="button"
          onClick={addItem}
          className="text-sm text-orange-600 hover:text-orange-700"
        >
          + Add
        </button>
      </div>
      <div className="mt-2 space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 border border-gray-300 px-3 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={() => moveItem(i, -1)}
              disabled={i === 0}
              className="px-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
              aria-label="Move up"
            >
              &uarr;
            </button>
            <button
              type="button"
              onClick={() => moveItem(i, 1)}
              disabled={i === items.length - 1}
              className="px-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
              aria-label="Move down"
            >
              &darr;
            </button>
            <button
              type="button"
              onClick={() => removeItem(i)}
              className="px-1 text-red-400 hover:text-red-600"
              aria-label="Remove"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
