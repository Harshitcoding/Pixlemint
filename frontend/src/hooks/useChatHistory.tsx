import { useState, useEffect } from 'react'
import { api } from '../services/api'
import type { ChatSession } from '../types'

export const useChatHistory = (token: string | null) => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])

  const fetchHistory = async () => {
    if (!token) return
    try {
      const data = await api.fetchChatHistory(token)
      if (data.success) setChatSessions(data.data)
    } catch (error) {
      console.error('Failed to fetch chat history:', error)
    }
  }

  useEffect(() => {
    if (token) fetchHistory()
  }, [token])

  const deleteSession = async (id: string) => {
    if (!token) return
    try {
      await api.deleteChat(id, token)
      setChatSessions(prev => prev.filter(s => s._id !== id))
      return true
    } catch (error) {
      console.error('Failed to delete chat:', error)
      return false
    }
  }

  return { chatSessions, fetchHistory, deleteSession }
}