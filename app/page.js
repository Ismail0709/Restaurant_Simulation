'use client';
import Image from 'next/image';
import Link from 'next/link';
import '../components/CSS/Homepage.css';
import Hero from '../public/Hero.png'; 
import Card1 from '../public/Card1.jpg';
import Card2 from '../public/Card2.jpg';
import Card3 from '../public/Card3.jpg';

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero">
        <Image
          src={Hero} 
          alt="Restaurant Simulation"
          fill
          className="hero-image"
          priority
        />
        <div className="hero-content">
          <h1>Welcome to Restaurant Simulation</h1>
          <p>Simulate MM1 and MMC queues with real-time KPIs.</p>
          <Link href="/simulation/mm1" className="cta-button">
            Get Started
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="container">
          <div className="features-heading">
            <h2>Key Features</h2>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <Image
                src={Card1}
                alt="Queue Simulation"
                width={80}
                height={80}
                className="feature-icon"
              />
              <h3 className='feature-card-heading'>Queue Simulation</h3>
              <p>Simulate MM1 and MMC queues to understand customer flow and waiting times.</p>
            </div>
            <div className="feature-card">
              <Image
                src={Card2}
                alt="Real-Time KPIs"
                width={80}
                height={80}
                className="feature-icon"
              />
              <h3 className='feature-card-heading'>Real-Time KPIs</h3>
              <p>Monitor key performance indicators like waiting time and service efficiency.</p>
            </div>
            <div className="feature-card">
              <Image
                src={Card3}
                alt="Advanced Analytics"
                width={80}
                height={80}
                className="feature-icon"
              />
              <h3 className='feature-card-heading'>Advanced Analytics</h3>
              <p>Analyze simulation results to optimize restaurant operations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}