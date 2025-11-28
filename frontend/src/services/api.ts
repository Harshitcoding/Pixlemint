const API_BASE = 'https://pixlemintt.onrender.com'

export const api = {
  async fetchChatHistory(token: string) {
    const res = await fetch(`${API_BASE}/chat/history`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return res.json()
  },

  async loadChat(sessionId: string, token: string) {
    const res = await fetch(`${API_BASE}/chat/${sessionId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return res.json()
  },

  async deleteChat(id: string, token: string) {
    await fetch(`${API_BASE}/chat/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
  },

  async reviewCode(code: string, chatId?: string, token?: string) {
    const res = await fetch(`${API_BASE}/code/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify({ code, chatId: chatId || undefined }),
    })
    return res.json()
  }
}