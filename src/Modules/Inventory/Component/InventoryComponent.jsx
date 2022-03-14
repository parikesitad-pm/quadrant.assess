import { Button, Col, PageHeader, Row, Table } from 'antd';

import ModalInventoryContainer from '../Container/ModalInventoryContainer';
import React from 'react';

const InventoryComponent = (props) => {
  const {
    inventoryList,
    column,
    currentPage,
    totalData,
    sizePerPage,
    onRefetch,
    openModal,
    isLoading,
  } = props || {};
  return (
    <>
      <Row justify="space-between" align="middle">
        <Col flex="auto">
          <PageHeader className="site-page-header" title="Inventories" />
        </Col>
        <Col flex="100px">
          <Button onClick={openModal} type="primary">
            Add
          </Button>
        </Col>
      </Row>
      <Table
        columns={column}
        loading={isLoading}
        dataSource={inventoryList}
        pagination={{
          total: totalData,
          current: currentPage,
          pageSize: sizePerPage,
          showSizeChanger: true,
          onChange: (e, g) => onRefetch(e, g),
        }}
        rowKey="id"
      />
      <ModalInventoryContainer />
    </>
  );
};

export default InventoryComponent;
