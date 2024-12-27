import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

export const fetchInstanceData = async (token: string, id: string) => {
  const response = await fetch(`/api/instance/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Erro ao buscar dados da instância')
  }

  return response.json()
}

export const updateInstanceData = async (token: string, id: string, webhooksData: Record<string, any>) => {
  try {
    console.log('Dados para atualizar:', webhooksData)
    const response = await axiosInstance.put(
      `/instance/${id}`,
      { webhooks: webhooksData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return response.data
    }

    throw new Error('Erro ao atualizar dados da instância')
  } catch (error: any) {
    console.error('Erro ao atualizar dados da instância:', error)

    const errorMessage = error.response?.data?.error
      || error.response?.data?.message
      || error.message
      || 'Erro desconhecido ao atualizar os dados.'

    throw new Error(errorMessage)
  }
}
