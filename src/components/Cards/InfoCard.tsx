'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Link from 'next/link'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import styles from './InfoCard.module.scss'

type InfoCardProps = {
  title: string;
  subtitle: string;
  value: number;
  bgColor: string;
  link: string;
  dict: any;
};

const InfoCard: React.FC<InfoCardProps> = ({
  title, subtitle, value, bgColor, link, dict,
}) => (
  <div className={styles.card} style={{ backgroundColor: bgColor }}>
    <h5 className={styles.title}>{title}</h5>
    <p className={`${styles.subtitle} text-muted`}>{subtitle}</p>
    <span className={`${styles.value} my-2`}>{value}</span>
    <div className={styles.footer}>
      <span>
        <Link href={link}>
          {dict.dashboard.cardsInfo.link}

          <FontAwesomeIcon className="ms-1" icon={faCaretRight} />
        </Link>
      </span>
    </div>
  </div>
)

export default InfoCard
