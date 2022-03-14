import { Button, Col, PageHeader, Row, Table } from 'antd';

import ModalSupplierContainer from '../Container/ModalSupplierContainer';

const SupplierComponent = (props) => {
  const {
    column,
    list,
    openModal,
    onRefetch,
    total,
    size,
    current,
    isLoading,
  } = props || {};

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col flex="auto">
          <PageHeader className="site-page-header" title="Suppliers" />
        </Col>
        <Col flex="100px">
          <Button onClick={openModal} type="primary">
            Add
          </Button>
        </Col>
      </Row>
      <Table
        loading={isLoading}
        columns={column}
        dataSource={list}
        pagination={{
          total: total,
          current: current,
          pageSize: size,
          showSizeChanger: true,
          onChange: (e, g) => onRefetch(e, g),
        }}
        rowKey="id"
      />
      <ModalSupplierContainer />
    </>
  );
};

export default SupplierComponent;
