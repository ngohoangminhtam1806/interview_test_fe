import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Card, Row, Col } from 'antd';
import { Pie } from '@ant-design/charts';

const Home = () => {
  const [statistics, setStatistics] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [topSales, setTopSales] = useState([]);

  useEffect(() => {
    axios.get('/api/branch/statistics').then(res => setStatistics(res.data));
    axios.get('/api/branch/top-services').then(res => setTopServices(res.data));
    axios.get('/api/branch/top-customers').then(res => setTopCustomers(res.data));
    axios.get('/api/branch/top-sales').then(res => setTopSales(res.data));
  }, []);

  const columns = [
    { title: 'Branch ID', dataIndex: 'branch_id', key: 'branch_id' },
    { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
    { title: 'Actual Revenue', dataIndex: 'actual_revenue', key: 'actual_revenue' },
    { title: 'Debt', dataIndex: 'debt', key: 'debt' },
  ];

  const topServicesConfig = {
    appendPadding: 10,
    data: topServices,
    angleField: 'percentage',
    colorField: 'service_id',
    radius: 1,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: { fontSize: 14, textAlign: 'center' },
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Branch Statistics</h1>
      <Table dataSource={statistics} columns={columns} rowKey="branch_id" />

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Top 5 Services">
            <Pie {...topServicesConfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Top 5 Customers">
            <Table dataSource={topCustomers} columns={[
              { title: 'Customer ID', dataIndex: 'customer_id', key: 'customer_id' },
              { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
            ]} rowKey="customer_id" />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Top 5 Sales">
            <Table dataSource={topSales} columns={[
              { title: 'Sale ID', dataIndex: 'sale_id', key: 'sale_id' },
              { title: 'Order Count', dataIndex: 'order_count', key: 'order_count' },
            ]} rowKey="sale_id" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
