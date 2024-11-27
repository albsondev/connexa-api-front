import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './InfoCard.module.scss';
import { getDictionary } from '@/locales/dictionary'
import Link from 'next/link';
import { faCaretRight, faHandPointRight, faPaperclip } from '@fortawesome/free-solid-svg-icons';

type InfoCardProps = {
  title: string;
  subtitle: string;
  value: string;
  bgColor: string;
  link: string;
};

const InfoCard: React.FC<InfoCardProps> = async ({ title, subtitle, value, bgColor, link }) => {
    const dict = await getDictionary()

  return (
    <div className={styles.card} style={{ backgroundColor: bgColor }}>
      <h5 className={styles.title}>{title}</h5>
      <p className={styles.subtitle + ' text-muted'}>{subtitle}</p>
      <h3 className={styles.value}>{value}</h3>
      <div className={styles.footer}>
        <span>
            <Link href={link}>
                {dict.dashboard.cardsInfo.link}
                {''} 
                <FontAwesomeIcon className='ms-1' icon={faCaretRight} />
            </Link>
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
