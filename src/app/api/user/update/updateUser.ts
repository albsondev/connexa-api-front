/**
 * Fetches the additional user data from the API.
 * @param token - The user's Bearer token.
 * @returns The user data retrieved from the API.
 */
export const fetchUserData = async (token: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user data')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}

/**
   * Updates the user's data using the API.
   * @param token - The user's Bearer token.
   * @param userData - The updated user data to be sent to the API.
   * @returns A promise that resolves when the user's data is successfully updated.
   */
export const updateUserData = async (token: string, userData: Record<string, any>) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error('Failed to update user data')
    }
  } catch (error) {
    console.error('Error updating user data:', error)
    throw error
  }
}
