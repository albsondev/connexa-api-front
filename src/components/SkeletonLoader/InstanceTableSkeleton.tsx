import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Table } from 'react-bootstrap'

const InstanceTableSkeleton: React.FC = () => (
  <Table className="table-instances striped bordered hover responsive">
    <thead>
      <tr>
        <th><Skeleton width={100} /></th>
        <th><Skeleton width={100} /></th>
        <th><Skeleton width={100} /></th>
        <th><Skeleton width={100} /></th>
      </tr>
    </thead>
    <tbody>
      {[...Array(3)].map(() => {
        const uniqueKey = Math.random().toString(36).substr(2, 9)
        return (
          <tr key={`skeleton-row-${uniqueKey}`}>
            <td><Skeleton width={150} /></td>
            <td><Skeleton width={200} /></td>
            <td><Skeleton width={100} /></td>
            <td><Skeleton width={50} /></td>
          </tr>
        )
      })}
    </tbody>
  </Table>
)

export default InstanceTableSkeleton
