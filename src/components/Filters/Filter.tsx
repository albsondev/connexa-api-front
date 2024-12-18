'use client'

import React, { useEffect, useState } from 'react'
import { Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import Select, { SingleValue } from 'react-select'
import './Filter.scss'
import { useSession } from 'next-auth/react'

interface OptionType {
  value: string;
  label: string;
}

interface FilterComponentProps {
  dict: any;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ dict }) => {
  const { data: session } = useSession()
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(null)
  const [selectedPeriod, setSelectedPeriod] = useState('Este mês')
  const [options, setOptions] = useState<OptionType[]>([])

  useEffect(() => {
    const loadInstances = async () => {
      if (!session?.accessToken) {
        console.warn('Token de acesso não disponível no session')
        return
      }

      try {
        const response = await fetch('/api/instance', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })

        if (!response.ok) {
          throw new Error(`Erro ao buscar instâncias: ${response.statusText}`)
        }

        const data = await response.json()
        const instanceOptions = data.map((instance: any) => ({
          value: instance.id,
          label: instance.name,
        }))
        setOptions(instanceOptions)
      } catch (error) {
        console.error('Erro ao carregar instâncias:', error)
      }
    }

    loadInstances()
  }, [session?.accessToken])

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value)
  }

  return (
    <div className="filter-container p-3 rounded shadow-sm bg-white">
      <div className="mb-3 content-select">
        <label htmlFor="instance-select" className="form-label me-3 text-secondary fw-bold">
          {dict.sidebar.items.webInstances}
        </label>
        <Select
          id="instance-select"
          options={options}
          placeholder={dict.dashboard.filters.selectOrSearch}
          value={selectedOption}
          onChange={(option) => setSelectedOption(option)}
          isClearable
        />
      </div>
      <div>
        <Form.Label className="title-period me-3 d-flex flex-column align-items-center text-secondary fw-bold">
          {dict.dashboard.filters.period}
        </Form.Label>
        <ToggleButtonGroup
          type="radio"
          name="period"
          value={selectedPeriod}
          onChange={handlePeriodChange}
        >
          <ToggleButton id="this-month" value="Este mês">
            {dict.dashboard.filters.thisMonth}
          </ToggleButton>
          <ToggleButton id="last-month" value="Mês passado">
            {dict.dashboard.filters.lastMonth}
          </ToggleButton>
          <ToggleButton id="yesterday" value="Ontem">
            {dict.dashboard.filters.yesterday}
          </ToggleButton>
          <ToggleButton id="today" value="Hoje">
            {dict.dashboard.filters.today}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  )
}

export default FilterComponent
