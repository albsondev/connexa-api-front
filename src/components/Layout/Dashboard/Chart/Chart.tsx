'use client'

import React from 'react'
import './Chart.scss'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryLegend, VictoryTooltip,
} from 'victory'

const dataRecebida = [
  { x: 'Semana 1', y: 400 },
  { x: 'Semana 2', y: 300 },
  { x: 'Semana 3', y: 200 },
  { x: 'Semana 4', y: 278 },
]

const dataEnviada = [
  { x: 'Semana 1', y: 240 },
  { x: 'Semana 2', y: 139 },
  { x: 'Semana 3', y: 180 },
  { x: 'Semana 4', y: 390 },
]

const Chart: React.FC = () => (
  <div className="chartContainer">
    <h3 style={{ textAlign: 'center' }}>Total recebido/enviado no último mês</h3>
    <VictoryChart
      theme={VictoryTheme.clean}
      domainPadding={20}
      height={300}
    >
      <VictoryAxis tickFormat={['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4']} />
      <VictoryAxis dependentAxis tickFormat={(y) => `${y}`} />
      <VictoryLegend
        x={125}
        y={10}
        orientation="horizontal"
        gutter={20}
        data={[
          { name: 'Qtd. recebida', symbol: { fill: '#f9a825' } },
          { name: 'Qtd. enviada', symbol: { fill: '#26c6da' } },
        ]}
      />
      <VictoryLine
        data={dataRecebida}
        style={{
          data: { stroke: '#f9a825' },
        }}
        labels={({ datum }) => `${datum.y}`}
        labelComponent={<VictoryTooltip />}
      />
      <VictoryLine
        data={dataEnviada}
        style={{
          data: { stroke: '#26c6da' },
        }}
        labels={({ datum }) => `${datum.y}`}
        labelComponent={<VictoryTooltip />}
      />
    </VictoryChart>
  </div>
)

export default Chart