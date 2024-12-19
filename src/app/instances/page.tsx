import React from 'react'
import { getDictionary } from '@/locales/dictionary'
import IntancesComponent from '@/components/Pages/instances/instancesComponent'
import InfoCard from '@/components/Cards/InfoCard'

export default async function Page() {
  const dict = await getDictionary()

  return (
    <div>
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-4 mb-3">
          <InfoCard
            title={dict.dashboard.cardsInfo.totalWebConnections}
            subtitle={dict.dashboard.cardsInfo.totalWebInstancesRunning}
            value={434}
            bgColor="#f2f484"
            link="/#"
            dict={dict}
          />
        </div>

        <div className="col-sm-12 col-md-6 col-lg-4 mb-3">
          <InfoCard
            title={dict.dashboard.cardsInfo.webInstancesConnected}
            subtitle={dict.dashboard.cardsInfo.totalWebConnections}
            value={234}
            bgColor="#aedbe3"
            link="/#"
            dict={dict}
          />
        </div>

        <div className="col-sm-12 col-md-6 col-lg-4">
          <InfoCard
            title={dict.dashboard.cardsInfo.webInstancesDisconnected}
            subtitle={dict.dashboard.cardsInfo.totalWebDisconnections}
            value={1.575}
            bgColor="#ffc1e3"
            link="/#"
            dict={dict}
          />
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-md-12">
          <IntancesComponent dict={dict} />
        </div>
      </div>
    </div>
  )
}
