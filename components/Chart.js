import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Chart({ data }) {
  const chartData = {
    labels: data.map(kpi => kpi.label),
    datasets: [
      {
        label: 'Value',
        data: data.map(kpi => kpi.value),
        backgroundColor: 'rgba(59, 130, 246, 0.6)'
      }
    ]
  };

  return <Bar data={chartData} />;
}
