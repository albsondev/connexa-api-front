import React from 'react'
import { getDictionary } from '@/locales/dictionary'
import IntancesComponent from '@/components/Pages/instances/instancesComponent'
import InstanceCards from '@/components/Cards/Instance/InstanceCards'

export default async function Page() {
  const dict = await getDictionary()

  return (
    <div>
      <InstanceCards dict={dict} />
      <hr />

      <div className="row">
        <div className="col-md-12">
          <IntancesComponent dict={dict} />
        </div>
      </div>
    </div>
  )
}
