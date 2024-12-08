export interface RegisterUserPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export const registerUser = async (payload: RegisterUserPayload) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erro ao registrar o usuário')
    }

    const data = await response.json()
    return data
  } catch (error: any) {
    throw new Error(error.message || 'Erro inesperado na API')
  }
}
