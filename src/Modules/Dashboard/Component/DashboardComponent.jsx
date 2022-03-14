import { Card, Col, Row } from 'antd';

import { Link } from 'react-router-dom';
import React from 'react';

const DashboardComponent = () => {
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Dashboard" style={{ margin: '24px 80px' }}>
            <Card
              type="inner"
              title="Inventories"
              extra={<Link to="/inventories">More</Link>}
            >
              Click more to see detail Inventories
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="Suppliers"
              extra={<Link to="/suppliers">More</Link>}
            >
              Click more to see detail Suppliers
            </Card>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardComponent;
