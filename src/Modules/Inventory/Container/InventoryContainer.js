import * as AppAction from '../../../Redux/Action/AppAction';
import * as AppSelector from '../../../Redux/Selector/AppSelector';
import * as InventoryAction from '../../../Redux/Action/InventoryAction';
import * as InventorySelector from '../../../Redux/Selector/InventorySelector';
import * as SupplierAction from '../../../Redux/Action/SupplierAction';
import * as SupplierSelector from '../../../Redux/Selector/SupplierSelector';

import { EditFilled, EyeFilled } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { bindActionCreators, compose } from 'redux';

import InventoryComponent from '../Component/InventoryComponent';
import { Space } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const InventoryContainer = (props) => {
  const {
    inventoryAction,
    inventoryList,
    appAction,
    currentPage,
    sizePerPage,
  } = props || {};

  useEffect(() => {
    inventoryAction.fetchInventoryRequested();

    return () => {
      inventoryAction.fetchInventoryFinished([]);
      inventoryAction.setSelectedDataInventory({});
      inventoryAction.setSelectedIdInventory(null);
      inventoryAction.setTotalData(0);
      inventoryAction.setCurrentPage(1);
      inventoryAction.setSizePerPage(10);
    };
    // eslint-disable-next-line
  }, []);

  const column = [
    {
      title: 'No',
      key: 'index',
      render: (text, record) => inventoryList.indexOf(record) + 1,
    },
    {
      key: 'sku',
      dataIndex: 'sku',
      title: 'SKU',
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
    },
    {
      key: 'costPrice',
      dataIndex: 'costPrice',
      title: 'Cost Price',
    },
    {
      key: 'retailPrice',
      dataIndex: 'retailPrice',
      title: 'Retail Price',
    },
    {
      key: 'qty',
      dataIndex: 'qty',
      title: 'Quantity',
    },
    {
      key: 'marginPercentage',
      dataIndex: 'marginPercentage',
      title: 'Margin Percentage',
    },
    {
      key: 'supplier.name',
      dataIndex: 'supplier.name',
      title: 'Supplier Name',
      render: (text, record) => record?.supplier?.name,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div className="actionWrapperTable">
          <Space size="middle">
            {/* eslint-disable-next-line */}
            <a
              onClick={() => {
                appAction.openModal('Inventory');
                inventoryAction.setSelectedIdInventory(record?.id);
                inventoryAction.fetchInventoryByIdRequested(record?.id);
                inventoryAction.setEditMode('edit');
              }}
            >
              <EditFilled className="icLibrary" style={{ color: 'black' }} />
            </a>
          </Space>
          <Space size="middle">
            {/* eslint-disable-next-line */}
            <a
              onClick={() => {
                appAction.openModal('Inventory');
                inventoryAction.setSelectedIdInventory(record?.id);
                inventoryAction.fetchInventoryByIdRequested(record?.id);
                inventoryAction.setEditMode('view');
              }}
            >
              <EyeFilled className="icLibrary" style={{ color: 'black' }} />
            </a>
          </Space>
        </div>
      ),
    },
  ];

  const onRefetch = (pageParam, sizeParam) => {
    inventoryAction.fetchInventoryRequested(
      pageParam ? pageParam : currentPage,
      sizeParam ? sizeParam : sizePerPage
    );
    inventoryAction.setCurrentPage(pageParam ? pageParam : currentPage);
    inventoryAction.setSizePerPage(sizeParam ? sizeParam : sizePerPage);
  };

  const openModal = () => {
    appAction.openModal('Inventory');
    inventoryAction.setEditMode('create');
    inventoryAction.setSelectedIdInventory(null);
    inventoryAction.setSelectedDataInventory({});
  };

  return (
    <InventoryComponent
      column={column}
      openModal={openModal}
      onRefetch={onRefetch}
      {...props}
    />
  );
};
const mapStateToProps = createStructuredSelector({
  inventoryList: InventorySelector.List(),
  supplierList: SupplierSelector.List(),
  currentPage: InventorySelector.CurrentPage(),
  totalData: InventorySelector.Total(),
  sizePerPage: InventorySelector.SizePerPage(),
  isLoading: AppSelector.Loading(),
});
const mapDispatchToProps = (dispatch) => ({
  inventoryAction: bindActionCreators(InventoryAction, dispatch),
  supplierAction: bindActionCreators(SupplierAction, dispatch),
  appAction: bindActionCreators(AppAction, dispatch),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(InventoryContainer);
