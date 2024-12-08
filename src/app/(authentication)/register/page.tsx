import Register from '@/app/(authentication)/register/register'
import { Row } from 'react-bootstrap'

export default async function Page() {
  return (
    <Row className="register-content">
      <Register />
    </Row>
  )
}
