import React from 'react'
import '@/components/SkeletonLoader/InstanceCardsSkeletonLoader.scss'

const InstanceCardsSkeletonLoader = () => (
  <div className="skeleton-cards">
    <div className="skeleton-card">
      <div className="skeleton-title" />
      <div className="skeleton-subtitle" />
      <div className="skeleton-number" />
      <div className="skeleton-link" />
    </div>
    <div className="skeleton-card">
      <div className="skeleton-title" />
      <div className="skeleton-subtitle" />
      <div className="skeleton-number" />
      <div className="skeleton-link" />
    </div>
    <div className="skeleton-card">
      <div className="skeleton-title" />
      <div className="skeleton-subtitle" />
      <div className="skeleton-number" />
      <div className="skeleton-link" />
    </div>
  </div>
)

export default InstanceCardsSkeletonLoader
