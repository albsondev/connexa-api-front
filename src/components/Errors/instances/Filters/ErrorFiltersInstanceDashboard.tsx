import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import '@/components/Errors/instances/Filters/ErrorFiltersInstanceDashboard.scss'

interface ErrorFiltersInstanceDashboardProps {
  msg: string;
}

const ErrorFiltersInstanceDashboard: React.FC<ErrorFiltersInstanceDashboardProps> = ({ msg }) => (
  <div
    id="error-filters-instance-dashboard"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '10px 20px',
      borderRadius: '8px',
      backgroundColor: '#f0f0f0',
      width: '100%',
      height: '125px',
    }}
  >
    {/* Skeleton para o dropdown */}
    <div style={{ flex: 1 }}>
      <Skeleton height={40} width="100%" borderRadius={4} />
    </div>

    {/* Skeleton para os botões */}
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      {Array(4)
        .fill(null)
        .map(() => (
          <Skeleton key={crypto.randomUUID()} height={40} width={80} borderRadius={4} />
        ))}
    </div>
    <div className="msg-error">{msg}</div>
  </div>
)

export default ErrorFiltersInstanceDashboard
