import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import '@/components/Errors/instances/cards/ErrorInstanceCards.scss'

interface ErrorInstanceCardsProps {
  msg: string;
}

const ErrorInstanceCards: React.FC<ErrorInstanceCardsProps> = ({ msg }) => (
  <div id="error-instance-cards-skeleton" style={{ display: 'flex', gap: '1rem' }}>
    {['card1', 'card2', 'card3'].map((id) => (
      <div
        key={id}
        style={{
          width: '100%',
          height: '110px',
          padding: '10px 30px',
          borderRadius: '16px',
          backgroundColor: '#f0f0f0',
        }}
      >
        <Skeleton height={20} width="60%" />
        <Skeleton height={15} width="80%" />
        <Skeleton height={30} width="40%" />
        <Skeleton height={10} width="20%" />
      </div>
    ))}
    <div className="msg-error">
      <p>{msg}</p>
    </div>
  </div>
)

export default ErrorInstanceCards
