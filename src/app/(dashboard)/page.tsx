import { faServer } from '@fortawesome/free-solid-svg-icons'

import React from 'react'
import { getDictionary } from '@/locales/dictionary'
import CardInfo from '@/components/Cards/CardInfo'

export default async function Page() {
  const dict = await getDictionary()

  return (
    <div>
      <div className="row">
        <div className="col-sm-6 col-lg-4">
          <CardInfo
            title={dict.dashboard.cardsInfo.totalWebInstances}
            count={45}
            subtitle={dict.dashboard.cardsInfo.totalWebInstancesRunning}
            icon={faServer}
            link="/instances"
          />
        </div>

        <div className="col-sm-6 col-lg-4">
          <CardInfo
            title={dict.dashboard.cardsInfo.webInstancesConnected}
            count={89}
            subtitle={dict.dashboard.cardsInfo.totalWebConnections}
            icon={faServer}
            link="/instances"
          />
        </div>

        <div className="col-sm-6 col-lg-4">
          <CardInfo
            title={dict.dashboard.cardsInfo.totalWebDisconnections}
            count={7}
            subtitle={dict.dashboard.cardsInfo.totalWebDisconnections}
            icon={faServer}
            link="/instances"
          />
        </div>
      </div>
    </div>
  )
}
