import Image from 'next/image';
import logo from './logo-no-bg.png';

const Logo = () => {
  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <Image src={logo.src} alt="Logo" fill style={{ objectFit: 'cover' }} />
    </div>
  );
};

export default Logo;
