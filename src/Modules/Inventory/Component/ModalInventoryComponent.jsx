import { Button, Form, Modal, Skeleton } from 'antd';

import { Field } from 'react-final-form';
import { FormHOC } from '../../../App/Component/CustomForm';
import { InputSelect } from '../../../App/Component/CustomSelect';
import { InputText } from '../../../App/Component/CustomInput';
import React from 'react';

const ModalInventoryComponent = (props) => {
  const {
    showModal,
    closeModal,
    mode,
    form,
    onSubmit,
    supplierList,
    handleActionButton,
    isLoading,
    initialValues,
  } = props;
  const {
    values,
    form: { reset },
  } = form;

  const globalDisable = mode === 'view' ? true : false;

  const contentModal = () => {
    return (
      <>
        <Skeleton
          active
          loading={isLoading && mode !== 'create' && !initialValues}
        >
          <Form layout="vertical">
            <Field
              name="sku"
              label="SKU"
              component={InputText}
              disabled={globalDisable}
            />
            <Field
              name="name"
              label="Name"
              component={InputText}
              disabled={globalDisable}
            />
            <Field
              name="costPrice"
              label="Cost Price"
              component={InputText}
              disabled={globalDisable}
            />
            <Field
              name="retailPrice"
              label="Retail Price"
              component={InputText}
              disabled={globalDisable}
            />
            <Field
              name="qty"
              label="Quantity"
              component={InputText}
              disabled={globalDisable}
            />
            <Field
              name="marginPercentage"
              label="Margin Percentage"
              component={InputText}
              disabled={globalDisable}
            />
            <Field
              name="supplierId"
              label="Supplier"
              defaultitemname="Please Select Supplier"
              component={InputSelect}
              options={supplierList}
              disabled={globalDisable}
            />
            {mode === 'view' && (
              <>
                <Field
                  name="supplier.address"
                  label="Supplier Address"
                  component={InputText}
                  disabled={globalDisable}
                />
                <Field
                  name="supplier.city"
                  label="Supplier City"
                  component={InputText}
                  disabled={globalDisable}
                />
                <Field
                  name="supplier.postCode"
                  label="Supplier Post Code"
                  component={InputText}
                  disabled={globalDisable}
                />
              </>
            )}
          </Form>
        </Skeleton>
      </>
    );
  };

  const handleTitle = () => {
    if (mode === 'create') {
      return 'Add Inventory';
    } else if (mode === 'edit') {
      return 'Edit Inventory';
    } else {
      return 'View Inventory';
    }
  };

  const handleButton = () => {
    if (mode === 'view') {
      return <Button onClick={() => handleActionButton('edit')}>Edit</Button>;
    } else if (mode === 'edit') {
      return (
        <Button onClick={() => onSubmit(values, reset)} loading={isLoading}>
          Update
        </Button>
      );
    } else {
      return (
        <Button onClick={() => onSubmit(values, reset)} loading={isLoading}>
          Submit
        </Button>
      );
    }
  };

  return (
    <>
      <Modal
        title={handleTitle()}
        visible={showModal}
        onCancel={closeModal}
        footer={((<Button onClick={closeModal}>Close</Button>), handleButton())}
      >
        {contentModal()}
      </Modal>
    </>
  );
};

export default FormHOC(ModalInventoryComponent);
