import React, { useEffect, useState } from 'react'
import Flag from 'react-world-flags'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare as faSquareRegular } from '@fortawesome/free-regular-svg-icons'

interface FlagWithIconProps {
  code: string;
  alt: string;
  iconSize?: 'xs' | 'sm' | 'lg' | '1x' | '2x' | '3x' | '4x' | '5x';
}

const FlagWithIcon: React.FC<FlagWithIconProps> = ({
  code,
  alt,
  iconSize = 'lg',
}) => {
  const [codeFlag, setCodeFlag] = useState('br')

  useEffect(() => {
    if (code === 'br') {
      setCodeFlag('br')
    } else if (code === 'en') {
      setCodeFlag('us')
    } else if (code === 'jp') {
      setCodeFlag('jp')
    } else if (code === 'sp') {
      setCodeFlag('es')
    } else {
      setCodeFlag('unknown')
    }
  }, [code])

  return (
    <div className="flag-container">
      <Flag
        code={codeFlag}
        alt={alt}
        className="country-flag"
      />
      <FontAwesomeIcon className="d-none" icon={faSquareRegular} size={iconSize} />
    </div>
  )
}

export default FlagWithIcon
