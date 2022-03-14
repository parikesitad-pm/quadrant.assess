import * as AppAction from '../../../Redux/Action/AppAction';
import * as AppSelector from '../../../Redux/Selector/AppSelector';
import * as InventoryAction from '../../../Redux/Action/InventoryAction';
import * as InventorySelector from '../../../Redux/Selector/InventorySelector';
import * as SupplierAction from '../../../Redux/Action/SupplierAction';
import * as SupplierSelector from '../../../Redux/Selector/SupplierSelector';

import React, { useEffect } from 'react';
import { bindActionCreators, compose } from 'redux';

import ModalInventoryComponent from '../Component/ModalInventoryComponent';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const ModalInventoryContainer = (props) => {
  const { appAction, supplierAction, inventoryAction, selectedData } = props;

  useEffect(() => {
    supplierAction.fetchSupplierRequested();
    // eslint-disable-next-line
  }, []);

  const initialValues = {
    ...selectedData,
  };
  initialValues.supplierId = selectedData?.supplier?.id;

  const closeModal = () => {
    appAction.openModal('Inventory');
    inventoryAction.setEditMode('create');
  };

  const onSubmit = (values, reset) => {
    inventoryAction.submitInventoryRequested(values, reset);
  };

  const handleActionButton = (act) => {
    inventoryAction.setEditMode(act);
  };

  return (
    <ModalInventoryComponent
      onSubmit={onSubmit}
      closeModal={closeModal}
      initialValues={initialValues}
      handleActionButton={handleActionButton}
      {...props}
    />
  );
};
const mapStateToProps = createStructuredSelector({
  showModal: AppSelector.ShowModal('Inventory'),
  selectedData: InventorySelector.SelectedData(),
  mode: InventorySelector.EditMode(),
  supplierList: SupplierSelector.List(),
  isLoading: AppSelector.Loading(),
});
const mapDispatchToProps = (dispatch) => ({
  appAction: bindActionCreators(AppAction, dispatch),
  supplierAction: bindActionCreators(SupplierAction, dispatch),
  inventoryAction: bindActionCreators(InventoryAction, dispatch),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(ModalInventoryContainer);
