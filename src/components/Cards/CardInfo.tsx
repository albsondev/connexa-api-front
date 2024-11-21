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
  bgIcon: string;
  colorIcon: string;
  textLink: string;
}

const getCustomBgClass = (bgIcon: string): string => {
  const bgClasses: Record<string, string> = {
    'bg-success': 'bg-success-light',
    'bg-danger': 'bg-danger-light',
    'bg-warning': 'bg-warning-light',
    'bg-info': 'bg-info-light',
  }

  return bgClasses[bgIcon] || bgIcon
}

const CardInfo: React.FC<CardInfoProps> = ({
  title, count, subtitle, icon, link, bgIcon, colorIcon, textLink,
}) => {
  const customBgClass = getCustomBgClass(bgIcon)

  return (
    <Card className="card-info">
      <CardTitle className="title text-center">{title}</CardTitle>
      <CardBody className="card-info-body">
        <div className={`icon-container ${customBgClass}`}>
          <FontAwesomeIcon icon={icon} className={`icon ${colorIcon}`} />
        </div>
        <div className="content">
          <p className="count">{count}</p>
        </div>
      </CardBody>
      <CardFooter className="card-info-footer">
        <CardSubtitle className="subtitle">
          <p>{subtitle}</p>
          <a href={link} className="link">
            {textLink}
            {' '}
            &gt;
          </a>
        </CardSubtitle>
      </CardFooter>
    </Card>
  )
}

export default CardInfo
