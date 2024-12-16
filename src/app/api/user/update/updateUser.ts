import axios from 'axios'

export const fetchUserData = async (token: string) => {
  try {
    const response = await axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`, // Inclua o prefixo "Bearer" aqui
      },
    })

    return response.data
  } catch (error: any) {
    console.error('Error fetching user data:', error.response?.data || error.message)
    throw error
  }
}

export const updateUserData = async (token: string, userData: Record<string, any>) => {
  try {
    await axios.put('/api/user', userData, {
      headers: {
        Authorization: `Bearer ${token}`, // Inclua o prefixo "Bearer" aqui
      },
    })
  } catch (error: any) {
    console.error('Error updating user data:', error.response?.data || error.message)
    throw error
  }
}
