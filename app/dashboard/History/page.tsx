'use client'

import React, { useEffect, useState } from 'react'

interface HistoryItem {
  id: number
  prompt: string
  response: string
  timestamp: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(false)

  const fetchHistory = async () => {
    const res = await fetch('http://localhost/remo/backend/get_history.php')
    const data = await res.json()
    setHistory(data)
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete all history?")) return

    setLoading(true)
    const res = await fetch('http://localhost/remo/backend/delete_history.php', {
      method: 'POST',
    })

    const result = await res.json()
    if (result.success) {
      setHistory([]) // Clear UI
    } else {
      alert('Failed to delete history.')
    }

    setLoading(false)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">🕘 Prompt History</h1>
        {history.length > 0 && (
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
            disabled={loading}
          >
            {loading ? 'Deleting...' : '🗑️ Delete All'}
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-gray-600">No prompt history found.</p>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="bg-white border p-4 rounded shadow-sm">
              <div className="text-sm text-gray-500 mb-2">
                ⏰ {new Date(item.timestamp).toLocaleString()}
              </div>
              <p><strong>Prompt:</strong> {item.prompt}</p>
              <p className="mt-2"><strong>Response:</strong> {item.response}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
