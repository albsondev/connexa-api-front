import { faPlugCircleCheck, faPlugCircleExclamation, faServer } from '@fortawesome/free-solid-svg-icons'

import React from 'react'
import { getDictionary } from '@/locales/dictionary'
import CardInfo from '@/components/Cards/CardInfo'
import FilterComponent from '@/components/Filters/Filter'
import CardsFilter from '@/components/Cards/CardsFilter'
import Chart from '@/components/Layout/Dashboard/Chart/Chart'
import MessageStats from '@/components/Layout/Dashboard/MessageStats/MessageStats'

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
      <div className="row">
        <div className="col-md-8">
          <FilterComponent />
        </div>
        <div className="col-md-2 mt-4">
          <CardsFilter title="Total enviado" value={77} bgColor="#00c7b7" arrowDirection="right" />
        </div>
        <div className="col-md-2 mt-4">
          <CardsFilter
            title="Total recebido"
            value={45}
            bgColor="rgb(255, 193, 7)"
            arrowDirection="left"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <Chart />
        </div>
        <div className="col-md-4">
          <MessageStats />
        </div>
      </div>
    </div>
  )
}
