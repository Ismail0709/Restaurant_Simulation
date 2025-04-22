'use client';
import { useState } from 'react';
import { useSimulation } from '../../../context/SimulationContext'; // ✅ make sure the path is correct
import './mmc.css';

const menu = [
  { name: 'Burger', servingTime: 5 },
  { name: 'Pizza', servingTime: 10 },
  { name: 'Pasta', servingTime: 7 },
  { name: 'Fries', servingTime: 3 },
];

export default function MMCPage() {
  const [customers, setCustomers] = useState([
    { arrivalTime: '', food: menu.length > 0 ? menu[0].name : '' }
  ]);
  const [servers, setServers] = useState(1);
  const [results, setResults] = useState(null);
  const { setSimulationResults } = useSimulation(); // ✅ use global context

  const handleCustomerChange = (index, key, value) => {
    const updated = [...customers];
    updated[index][key] = value;
    setCustomers(updated);
  };

  const addCustomer = () => {
    setCustomers([
      ...customers,
      { arrivalTime: '', food: menu.length > 0 ? menu[0].name : '' }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payloadCustomers = customers.map((c) => {
      const food = menu.find(f => f.name === c.food);
      return {
        arrivalTime: Number(c.arrivalTime),
        servingTime: food ? food.servingTime : 0,
      };
    });

    try {
      const res = await fetch('/api/simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customers: payloadCustomers,
          servers: Number(servers),
        }),
      });

      const data = await res.json();

      const updatedResults = {
        completionTime: data.completionTime || [],
        waitingTime: data.waitingTime || [],
        servingTime: data.servingTime || payloadCustomers.map(p => p.servingTime),
        turnaroundTime: data.turnaroundTime || [],
        servers: Number(servers),
      };

      setResults(updatedResults);
      setSimulationResults(updatedResults); // ✅ update global context
      localStorage.setItem('simulationResults', JSON.stringify(updatedResults)); // ✅ update localStorage too
    } catch (error) {
      console.error('Simulation failed:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="mmc-page">
      <div className="container">
        <div className="form-section">
          <h2 className="title">MMC Queue Simulation</h2>

          <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
              <label className="label">Number of Servers</label>
              <input
                type="number"
                min={1}
                value={servers}
                onChange={(e) => setServers(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="input-group">
              <p className="label">Customers</p>
              {customers.map((customer, index) => (
                <div key={index} className="customer-input">
                  <input
                    type="number"
                    placeholder="Arrival Time"
                    value={customer.arrivalTime}
                    onChange={(e) => handleCustomerChange(index, 'arrivalTime', e.target.value)}
                    className="input-field"
                    required
                  />
                  <select
                    value={customer.food}
                    onChange={(e) => handleCustomerChange(index, 'food', e.target.value)}
                    className="input-field"
                  >
                    {menu.length > 0 ? (
                      menu.map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name} ({item.servingTime} mins)
                        </option>
                      ))
                    ) : (
                      <option disabled>No menu items</option>
                    )}
                  </select>
                </div>
              ))}
              <button type="button" onClick={addCustomer} className="add-customer-button">
                + Add Customer
              </button>
            </div>

            <button type="submit" className="submit-button">Simulate</button>
          </form>
        </div>

        <div className="results-section">
          {results && (
            <div className="results">
              <h3 className="results-title">Simulation Results</h3>
              <p><strong>Completion Time:</strong> {results.completionTime.join(', ')}</p>
              <p><strong>Waiting Time:</strong> {results.waitingTime.join(', ')}</p>
              <p><strong>Service Time:</strong> {results.servingTime.join(', ')}</p>
              <p><strong>Turnaround Time:</strong> {results.turnaroundTime.join(', ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
