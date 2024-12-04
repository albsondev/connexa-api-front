import React from 'react'
import { getDictionary } from '@/locales/dictionary'
import FilterComponent from '@/components/Filters/Filter'
import CardsFilter from '@/components/Cards/CardsFilter'
import Chart from '@/components/Layout/Dashboard/Chart/Chart'
import MessageStats from '@/components/Layout/Dashboard/MessageStats/MessageStats'
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
            value="434"
            bgColor="#f2f484"
            link="/#"
          />
        </div>

        <div className="col-sm-12 col-md-6 col-lg-4 mb-3">
          <InfoCard
            title={dict.dashboard.cardsInfo.webInstancesConnected}
            subtitle={dict.dashboard.cardsInfo.totalWebConnections}
            value="234"
            bgColor="#aedbe3"
            link="/#"
          />
        </div>

        <div className="col-sm-12 col-md-6 col-lg-4">
          <InfoCard
            title={dict.dashboard.cardsInfo.webInstancesDisconnected}
            subtitle={dict.dashboard.cardsInfo.totalWebDisconnections}
            value="1.575"
            bgColor="#ffc1e3"
            link="/#"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <FilterComponent dict={dict} />
        </div>
        <div className="col-md-2 mt-4">
          <CardsFilter
            title={dict.dashboard.cardsFilter.totalSent}
            value={77}
            arrowDirection="sended"
          />
        </div>
        <div className="col-md-2 mt-4">
          <CardsFilter
            title={dict.dashboard.cardsFilter.totalReceived}
            value={45}
            arrowDirection="received"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <Chart dict={dict} />
        </div>
        <div className="col-md-4">
          <MessageStats dict={dict} />
        </div>
      </div>
    </div>
  )
}
