import 'antd/dist/antd.css';
import Navbar from "../components/Navbar";
import { SimulationProvider } from "../context/SimulationContext";
import { AuthProvider } from "../context/AuthContext";
import Footer from '../components/Footer';

export const metadata = {
  title: 'Restaurant Simulation',
  description: 'MM1 & MMC based restaurant simulation with KPIs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SimulationProvider>
            <Navbar />
            <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
              {children}
            </main>
            <Footer />
          </SimulationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
