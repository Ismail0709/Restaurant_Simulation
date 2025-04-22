'use client';
import { useState } from 'react';
import { useSimulation } from '../../../context/SimulationContext';
import './mm1.css'; // Import your CSS styles

const menu = [
  { name: 'Burger', servingTime: 5 },
  { name: 'Pizza', servingTime: 10 },
  { name: 'Pasta', servingTime: 7 },
  { name: 'Fries', servingTime: 3 },
];

export default function MM1Page() {
  const [customers, setCustomers] = useState([{ arrivalTime: '', food: menu[0].name }]);
  const [results, setResults] = useState(null);
  const { setSimulationResults } = useSimulation();

  const handleCustomerChange = (index, key, value) => {
    const updated = [...customers];
    updated[index][key] = value;
    setCustomers(updated);
  };

  const addCustomer = () => {
    setCustomers([...customers, { arrivalTime: '', food: menu[0].name }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payloadCustomers = customers.map((c) => {
      const food = menu.find(f => f.name === c.food);
      return {
        arrivalTime: Number(c.arrivalTime),
        servingTime: food.servingTime,
      };
    });

    const res = await fetch('/api/simulation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customers: payloadCustomers }),
    });

    const data = await res.json();

    // Ensure that servingTime array is included in results
    const servingTimeArray = payloadCustomers.map(c => c.servingTime);
    const updatedData = { ...data, servingTime: servingTimeArray };

    setResults(updatedData);
    setSimulationResults(updatedData);
    localStorage.setItem('simulationResults', JSON.stringify(updatedData));
  };

  return (
    <div className="mm1-page">
      <div className="container">
        <div className="form-section">
          <h2 className="title">MM1 Queue Simulation</h2>
          <form onSubmit={handleSubmit} className="form">
            {customers.map((customer, index) => (
              <div key={index} className="customer-input">
                <input
                  type="number"
                  placeholder={`Customer ${index + 1} Arrival Time`}
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
                  {menu.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name} ({item.servingTime} mins)
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <button
              type="button"
              onClick={addCustomer}
              className="add-customer-button"
            >
              + Add Customer
            </button>
            <button
              type="submit"
              className="submit-button"
            >
              Simulate
            </button>
          </form>
        </div>

        <div className="results-section">
          {results && (
            <div className="results">
              <h3 className="results-title">Simulation Results</h3>
              <p><strong>Completion Time:</strong> {results.completionTime.join(', ')}</p>
              <p><strong>Waiting Time:</strong> {results.waitingTime.join(', ')}</p>
              <p><strong>Turnaround Time:</strong> {results.turnaroundTime.join(', ')}</p>
              <p><strong>Serving Time:</strong> {results.servingTime.join(', ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
