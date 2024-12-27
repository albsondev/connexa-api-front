import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DetailsInstanceSkeletonLoader = () => (
  <div style={{
    padding: '16px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  }}
  >
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px',
    }}
    >
      <Skeleton width={200} height={20} />
      <Skeleton width={100} height={36} borderRadius={8} />
    </div>

    <div style={{ display: 'flex', gap: '24px' }}>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '12px' }}>
          <Skeleton width="40%" height={20} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <Skeleton width="70%" height={20} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <Skeleton width="50%" height={20} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <Skeleton width="60%" height={20} />
        </div>
      </div>

      <div style={{ width: '300px', height: '300px', flexShrink: 0 }}>
        <Skeleton width="100%" height="100%" />
      </div>
    </div>

    <div style={{ marginTop: '24px', textAlign: 'center' }}>
      <Skeleton width={400} height={40} borderRadius={8} />
    </div>
  </div>
)

export default DetailsInstanceSkeletonLoader
