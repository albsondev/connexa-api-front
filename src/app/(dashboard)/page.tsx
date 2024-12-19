import { getDictionary } from '@/locales/dictionary'
import Dashboard from '@/components/Dashboard/Dashboard'

export default async function Page() {
  const dict = await getDictionary()

  return (
    <div>
      <Dashboard dict={dict} />
    </div>
  )
}
