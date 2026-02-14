import type { User } from "./types"

const USERS_KEY = "store_users"
const CURRENT_USER_KEY = "store_current_user"

export const getStoredUsers = (): User[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(USERS_KEY)
  return data ? JSON.parse(data) : []
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null
  const data = localStorage.getItem(CURRENT_USER_KEY)
  return data ? JSON.parse(data) : null
}

export const signup = (email: string, password: string, name: string): { success: boolean; error?: string } => {
  const users = getStoredUsers()

  if (users.length === 0) {
    const demoUser: User = {
      id: "demo-1",
      email: "demo@example.com",
      name: "Demo User",
      createdAt: new Date().toISOString(),
    }
    users.push(demoUser)
    const demoHashedPassword = btoa("demo@example.com:Demo123!@")
    localStorage.setItem(`password_demo-1`, demoHashedPassword)
  }

  if (users.find((u) => u.email === email)) {
    return { success: false, error: "Email already registered" }
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters" }
  }

  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    createdAt: new Date().toISOString(),
  }

  const hashedPassword = btoa(`${email}:${password}`)
  users.push(newUser)

  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  localStorage.setItem(`password_${newUser.id}`, hashedPassword)
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser))

  return { success: true }
}

export const signin = (email: string, password: string): { success: boolean; error?: string; user?: User } => {
  const users = getStoredUsers()
  const user = users.find((u) => u.email === email)

  if (!user) {
    return { success: false, error: "Email not found" }
  }

  const hashedPassword = btoa(`${email}:${password}`)
  const storedPassword = localStorage.getItem(`password_${user.id}`)

  if (storedPassword !== hashedPassword) {
    return { success: false, error: "Invalid password" }
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  return { success: true, user }
}

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY)
}
