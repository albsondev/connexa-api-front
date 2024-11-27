'use client'

import React, { useState } from 'react'
import {
  Form, ToggleButton, ToggleButtonGroup,
} from 'react-bootstrap'

// eslint-disable-next-line import/no-extraneous-dependencies
import Select, { SingleValue } from 'react-select'
import './Filter.scss'

interface OptionType {
  value: string;
  label: string;
}

const FilterComponent: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(null)
  const [selectedPeriod, setSelectedPeriod] = useState('Este mês')

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value)
  }

  const options = [
    { value: 'numero1', label: 'Número 1' },
    { value: 'numero2', label: 'Número 2' },
    { value: 'numero3', label: 'Número 3' },
  ]

  return (
    <div className="filter-container p-3 rounded shadow-sm bg-white">
      <div className="mb-3">
        <label htmlFor="instance-select" className="form-label me-3 text-secondary fw-bold">
          Instância web
        </label>
        <Select
          id="instance-select"
          options={options}
          placeholder="Selecione ou procure"
          value={selectedOption}
          onChange={(option) => setSelectedOption(option)}
          isClearable
        />
      </div>
      <div>
        <Form.Label className="me-3 d-flex flex-column align-items-center text-secondary fw-bold">Período</Form.Label>
        <ToggleButtonGroup
          type="radio"
          name="period"
          value={selectedPeriod}
          onChange={handlePeriodChange}
        >
          <ToggleButton id="this-month" value="Este mês" variant={selectedPeriod === 'Este mês' ? 'primary' : 'outline-secondary'}>
            Este mês
          </ToggleButton>
          <ToggleButton id="last-month" value="Mês passado" variant={selectedPeriod === 'Mês passado' ? 'primary' : 'outline-secondary'}>
            Mês passado
          </ToggleButton>
          <ToggleButton id="yesterday" value="Ontem" variant={selectedPeriod === 'Ontem' ? 'primary' : 'outline-secondary'}>
            Ontem
          </ToggleButton>
          <ToggleButton id="today" value="Hoje" variant={selectedPeriod === 'Hoje' ? 'primary' : 'outline-secondary'}>
            Hoje
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  )
}

export default FilterComponent
