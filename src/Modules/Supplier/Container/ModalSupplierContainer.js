import * as AppAction from '../../../Redux/Action/AppAction';
import * as AppSelector from '../../../Redux/Selector/AppSelector';
import * as SupplierAction from '../../../Redux/Action/SupplierAction';
import * as SupplierSelector from '../../../Redux/Selector/SupplierSelector';

import { bindActionCreators, compose } from 'redux';

import ModalSupplierComponent from '../Component/ModalSupplierComponent';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const ModalSupplierContainer = (props) => {
  const { appAction, supplierAction } = props;

  const closeModal = () => {
    appAction.openModal('Supplier');
  };

  const onSubmit = (values, reset) => {
    supplierAction.addNewSupplierRequested(values, reset);
  };

  return (
    <ModalSupplierComponent
      onSubmit={onSubmit}
      closeModal={closeModal}
      {...props}
    />
  );
};
const mapStateToProps = createStructuredSelector({
  showModal: AppSelector.ShowModal('Supplier'),
  initialValues: SupplierSelector.SelectedData(),
  edit: SupplierSelector.EditMode(),
  isLoading: AppSelector.Loading(),
});
const mapDispatchToProps = (dispatch) => ({
  appAction: bindActionCreators(AppAction, dispatch),
  supplierAction: bindActionCreators(SupplierAction, dispatch),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(ModalSupplierContainer);
