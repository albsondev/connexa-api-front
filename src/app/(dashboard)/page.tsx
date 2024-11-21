import { faPlugCircleCheck, faPlugCircleExclamation, faServer } from '@fortawesome/free-solid-svg-icons'

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
            bgIcon="bg-info"
            colorIcon="text-info"
            textLink={dict.dashboard.cardsInfo.link}
          />
        </div>

        <div className="col-sm-6 col-lg-4">
          <CardInfo
            title={dict.dashboard.cardsInfo.webInstancesConnected}
            count={89}
            subtitle={dict.dashboard.cardsInfo.totalWebConnections}
            icon={faPlugCircleCheck}
            link="/instances"
            bgIcon="bg-success"
            colorIcon="text-success"
            textLink={dict.dashboard.cardsInfo.link}
          />
        </div>

        <div className="col-sm-6 col-lg-4">
          <CardInfo
            title={dict.dashboard.cardsInfo.webInstancesDisconnected}
            count={7}
            subtitle={dict.dashboard.cardsInfo.totalWebDisconnections}
            icon={faPlugCircleExclamation}
            link="/instances"
            bgIcon="bg-danger"
            colorIcon="text-danger"
            textLink={dict.dashboard.cardsInfo.link}
          />
        </div>
      </div>
    </div>
  )
}
