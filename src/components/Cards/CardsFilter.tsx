'use client'

import React from 'react'
import { Card } from 'react-bootstrap'
import '@/components/Cards/CardsFilter.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

interface CardProps {
  title: string;
  value: number;
  bgColor: 'sended' | 'received';
  textColor?: string;
  arrowDirection: 'sended' | 'received';
  dict: any;
}

const CardsFilter: React.FC<CardProps> = ({
  title, value, bgColor, textColor = 'white', arrowDirection,
}) => (
  <Card
    bg={'light'}
    key={'Light'}
    className="mt-2"
  >
    <Card.Header className='d-flex justify-content-between'>
      <div>
        { title }
      </div>
      <div>
        {
          arrowDirection === 'sended' ? (
            <FontAwesomeIcon className='me-1 icon-sended' icon={faAngleDoubleRight} />
          ) : (
            <FontAwesomeIcon className='ms-1 icon-received' icon={faAngleDoubleLeft} />
          )
        }
      </div>
      </Card.Header>
    <Card.Body className='text-center'>
      <Card.Title>{ value } </Card.Title>
    </Card.Body>
  </Card>
)

export default CardsFilter
