import * as AppAction from '../../../Redux/Action/AppAction';
import * as AppSelector from '../../../Redux/Selector/AppSelector';
import * as SupplierAction from '../../../Redux/Action/SupplierAction';
import * as SupplierSelector from '../../../Redux/Selector/SupplierSelector';

import React, { useEffect } from 'react';
import { bindActionCreators, compose } from 'redux';

import { EditFilled } from '@ant-design/icons';
import { Space } from 'antd';
import SupplierComponent from '../Component/SupplierComponent';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const SupplierContainer = (props) => {
  const { supplierAction, appAction, size, current, list } = props;

  useEffect(() => {
    supplierAction.fetchSupplierRequested();

    return () => {
      supplierAction.fetchSupplierFinished([]);
      supplierAction.setSelectedData({});
      supplierAction.setTotalData(0);
      supplierAction.setSizePerPage(10);
      supplierAction.setCurrentPage(1);
    };

    // eslint-disable-next-line
  }, []);

  const column = [
    {
      title: 'No',
      key: 'index',
      render: (text, record) => list.indexOf(record) + 1,
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: 'Address',
    },
    {
      key: 'city',
      dataIndex: 'city',
      title: 'City',
    },
    {
      key: 'postCode',
      dataIndex: 'postCode',
      title: 'Post Code',
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
                appAction.openModal('Supplier');
                supplierAction.setSelectedData(record);
                supplierAction.setEditMode(true);
              }}
            >
              <EditFilled className="icLibrary" style={{ color: 'black' }} />
            </a>
          </Space>
        </div>
      ),
    },
  ];

  const onRefetch = (pageParam, sizeParam) => {
    supplierAction.fetchSupplierRequested(
      pageParam ? pageParam : current,
      sizeParam ? sizeParam : size
    );
    supplierAction.setCurrentPage(pageParam ? pageParam : current);
    supplierAction.setSizePerPage(sizeParam ? sizeParam : size);
  };

  const openModal = () => {
    appAction.openModal('Supplier');
    supplierAction.setSelectedData({});
  };

  return (
    <SupplierComponent
      {...props}
      column={column}
      openModal={openModal}
      onRefetch={onRefetch}
    />
  );
};
const mapStateToProps = createStructuredSelector({
  list: SupplierSelector.List(),
  size: SupplierSelector.Size(),
  total: SupplierSelector.Total(),
  current: SupplierSelector.Page(),
  isLoading: AppSelector.Loading(),
});
const mapDispatchToProps = (dispatch) => ({
  supplierAction: bindActionCreators(SupplierAction, dispatch),
  appAction: bindActionCreators(AppAction, dispatch),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(SupplierContainer);
