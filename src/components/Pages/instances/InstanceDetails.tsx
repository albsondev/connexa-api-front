import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const InstanceDetails = () => {
  const router = useRouter()
  const { id } = router.query as { id: string } // Define o tipo de id como string
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      setLoading(true)
      setError(null)

      fetch(`/api/instances/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`)
          }
          return response.json()
        })
        .then((responseData) => {
          setData(responseData)
          setLoading(false)
        })
        .catch((errorMessage) => {
          setError(errorMessage.message)
          setLoading(false)
        })
    }
  }, [id])

  if (loading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return (
      <div>
        Erro:
        {error}
      </div>
    )
  }

  if (!data) {
    return <p>Instância não encontrada.</p>
  }

  return (
    <div>
      <h1>Detalhes da Instância</h1>
      <p>
        ID:
        {data.id}
      </p>
      <p>
        Token:
        {data.token}
      </p>
      <p>
        Status:
        {data.status}
      </p>
      <p>
        Expira em:
        {data.expiry}
      </p>
    </div>
  )
}

export default InstanceDetails
