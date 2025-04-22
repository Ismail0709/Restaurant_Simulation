'use client';
import { createContext, useState, useContext } from 'react';

const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {
  const [simulationResults, setSimulationResults] = useState(null);

  return (
    <SimulationContext.Provider value={{ simulationResults, setSimulationResults }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => useContext(SimulationContext);
