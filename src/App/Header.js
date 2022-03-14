import { Affix, Col, Layout, Menu, Row } from 'antd';

import { Link } from 'react-router-dom';
import React from 'react';

const { Header } = Layout;

const HeaderComponent = () => {
  const pathname = window.location.pathname;
  return (
    <Affix offsetTop={0} style={{ zIndex: 400 }}>
      <Header className="headerTemplate">
        <Row justify="space-between">
          <Col span={4}>
            <div className="containerLogoTemplate">
              <Link to="/">Logo</Link>
            </div>
          </Col>
          <Col span={8}>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={[pathname]}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="/">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="/inventories">
                <Link to="/inventories">Inventories</Link>
              </Menu.Item>
              <Menu.Item key="/suppliers">
                <Link to="/suppliers">Suppliers</Link>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
    </Affix>
  );
};

export default HeaderComponent;
