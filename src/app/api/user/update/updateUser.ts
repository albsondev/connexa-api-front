import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

export const fetchUserData = async (token: string) => {
  try {
    const response = await axiosInstance.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    console.error('Erro ao buscar dados do usuário:', error.response?.data || error.message)
    throw error
  }
}

export const updateUserData = async (token: string, userData: Record<string, any>) => {
  try {
    await axiosInstance.put('/user', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error: any) {
    console.error('Erro ao atualizar dados do usuário:', error.response?.data || error.message)
    throw error
  }
}
