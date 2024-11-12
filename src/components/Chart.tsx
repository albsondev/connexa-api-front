import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import "../styles/chart/chart.scss";

const data = [
  { name: 'Jan', sent: 400, received: 240 },
  { name: 'Feb', sent: 300, received: 139 },
  { name: 'Mar', sent: 200, received: 980 },
];

const Chart = () => {
  return (
    <LineChart width={500} height={300} data={data} className="chart">
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="sent" stroke="#8884d8" />
      <Line type="monotone" dataKey="received" stroke="#82ca9d" />
    </LineChart>
  );
};

export default Chart;
