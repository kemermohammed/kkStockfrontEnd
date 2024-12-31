import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const DashboardCharts = () => {
  const salesData = {
    labels: Array.from({ length: 50 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Sales',
        data: Array.from({ length: 50 }, () => Math.floor(Math.random() * 1000)),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Profit',
        data: Array.from({ length: 50 }, () => Math.floor(Math.random() * 1000)),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const productSalesData = {
    labels: Array.from({ length: 10 }, (_, i) => `Product ${i + 1}`),
    datasets: [
      {
        label: 'Sales',
        data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 1000)),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="p-4 border rounded shadow">
        <h2 className="text-lg font-bold mb-4">Sales and Profit</h2>
        <Chart type="line" data={salesData} />
      </div>
      <div className="p-4 border rounded shadow">
        <h2 className="text-lg font-bold mb-4">Product Sales</h2>
        <Chart type="bar" data={productSalesData} />
      </div>
    </div>
  );
};

export default DashboardCharts;
