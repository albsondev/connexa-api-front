'use client'

import React from 'react'
import { Card } from 'react-bootstrap'
import '@/components/Cards/CardsFilter.scss'

interface CardProps {
  title: string;
  value: number;
  bgColor: string;
  textColor?: string;
  arrowDirection: 'left' | 'right';
}

const CardsFilter: React.FC<CardProps> = ({
  title, value, bgColor, textColor = 'white', arrowDirection,
}) => (
  <Card style={{ backgroundColor: bgColor, color: textColor }} className="cardsFilter-container text-center shadow-sm p-3 rounded">
    <Card.Body>
      <div className="d-flex align-items-center justify-content-between">
        {arrowDirection === 'left' && <span>&laquo;</span>}
        <Card.Title className="cardsFilter-title d-flex align-items-center">{title}</Card.Title>
        {arrowDirection === 'right' && <span>&raquo;</span>}
      </div>
      <Card.Text style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '10px' }}>{value}</Card.Text>
    </Card.Body>
  </Card>
)

export default CardsFilter
