import React from 'react';
import './logo.css'; 

interface LogoProps {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  tagline?: string;
}

const Logo: React.FC<LogoProps> = ({
  src = '/images/logo-retock.png',
  alt = 'Retock - Salão de Beleza Logo',
  width = '400px',
  height = 'auto',
  tagline
}) => {
  return (
    <div className="logo-container">
      <img src={src} alt={alt} style={{ width, height }} />

      {tagline && <p className="logo-tagline">{tagline}</p>}
    </div>
  );
};

export default Logo;