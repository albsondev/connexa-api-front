import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import './CardInfo.scss'
import {
  Card, CardBody, CardFooter, CardSubtitle, CardTitle,
} from 'react-bootstrap'

interface CardInfoProps {
  title: string;
  count: number;
  subtitle: string;
  icon: IconDefinition;
  link: string;
}

const CardInfo: React.FC<CardInfoProps> = ({
  title, count, subtitle, icon, link,
}) => (
  <Card className="card-info">
    <CardTitle className="title text-center">{title}</CardTitle>
    <CardBody className="card-info-body">
      <div className="icon-container">
        <FontAwesomeIcon icon={icon} className="icon" />
      </div>
      <div className="content">
        <p className="count">{count}</p>
      </div>
    </CardBody>
    <CardFooter className="card-info-footer">
      <CardSubtitle className="subtitle">
        <p className="subtitle">{subtitle}</p>
      </CardSubtitle>
      <a href={link} className="link">
        Ver &gt;
      </a>
    </CardFooter>

  </Card>
)

export default CardInfo
