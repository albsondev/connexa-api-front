import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const QrCodeSkeletonLoader: React.FC = () => (
  <div style={{
    width: '100%', textAlign: 'center', margin: '0 auto',
  }}
  >
    <div style={{ width: '100%', height: '200px', margin: '0 auto' }}>
      <Skeleton width="100%" height="100%" />
    </div>
  </div>
)

export default QrCodeSkeletonLoader
