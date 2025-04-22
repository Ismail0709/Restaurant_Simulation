'use client';
import { Menu, Dropdown, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './CSS/Navbar.css'; // Adjust the path as necessary

const centerItems = [
  { label: <Link href="/">Home</Link>, key: 'home' },
  { label: <Link href="/simulation/mm1">MM1</Link>, key: 'mm1' },
  { label: <Link href="/simulation/mmc">MMC</Link>, key: 'mmc' },
  { label: <Link href="/simulation/kpis">KPIs</Link>, key: 'kpis' },
];

const rightItems = [
  {
    label: (
      <Link href="/auth/login" className="login-link">
        <span> Login </span>
      </Link>
    ),
    key: 'login',
  },
];

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-left">QueueBites</div>

      <div className="navbar-center">
        {isMobile ? (
          <Dropdown menu={{ items: centerItems }} placement="bottom" trigger={['click']}>
            <Button icon={<MenuOutlined />} />
          </Dropdown>
        ) : (
          <Menu mode="horizontal" items={centerItems} className="navbar-menu" />
        )}
      </div>

      <div className="navbar-right">
        {isMobile ? null : ( // Hide right items on mobile
          <Menu mode="horizontal" items={rightItems} className="navbar-menu" />
        )}
      </div>
    </div>
  );
}