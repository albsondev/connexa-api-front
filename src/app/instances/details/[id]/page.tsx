import DetailsInstance from '@/components/Form/DetailsInstance'
import { getDictionary } from '@/locales/dictionary'

const InstanceDetails = async ({ params }: { params: { id: string } }) => {
  const dict = await getDictionary()
  const { id } = params

  // InstanceExpired

  return (
    <div>
      <DetailsInstance id={id} dict={dict} />
    </div>
  )
}

export default InstanceDetails
