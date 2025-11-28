export interface Message {
  type: "user" | "ai"
  content: string
  timestamp: Date
}

export interface ChatSession {
  _id: string
  title: string
  preview: string
  createdAt: string
  updatedAt: string
}