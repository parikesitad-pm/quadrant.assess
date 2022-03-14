import { Form, Modal } from 'antd';

import { Field } from 'react-final-form';
import { FormHOC } from '../../../App/Component/CustomForm';
import { InputSelect } from '../../../App/Component/CustomSelect';
import { InputText } from '../../../App/Component/CustomInput';
import React from 'react';

const ModalSupplierComponent = (props) => {
  const { showModal, closeModal, edit, form, onSubmit, isLoading } = props;
  const {
    values,
    form: { reset },
  } = form;
  const contentModal = () => {
    const enumType = [
      {
        id: 'mobilePhone',
        name: 'Mobile Phone',
      },
      {
        id: 'officePhone',
        name: 'Office Phone',
      },
      {
        id: 'email',
        name: 'Email',
      },
    ];

    const selectedType = enumType.find((x) => x.id === values.contactType);
    return (
      <>
        <Form layout="vertical">
          <Field name="name" label="Name" component={InputText} />
          <Field name="address" label="Address" component={InputText} />
          <Field name="city" label="City" component={InputText} />
          <Field name="postCode" label="Post Code" component={InputText} />
          {!edit && (
            <>
              <Field
                name="contactType"
                label="Contact Type"
                defaultitemname="Please Select Contact"
                component={InputSelect}
                options={enumType}
              />
              {values.contactType && (
                <>
                  <Field
                    name="contactName"
                    label="Contact Name"
                    component={InputText}
                  />
                  <Field
                    label={`Input ${selectedType?.name}`}
                    name="contactValue"
                    component={InputText}
                  />
                </>
              )}
            </>
          )}
        </Form>
      </>
    );
  };

  return (
    <>
      <Modal
        title={edit ? 'Update Supplier' : 'Add Supplier'}
        visible={showModal}
        onCancel={closeModal}
        confirmLoading={isLoading}
        onOk={() => onSubmit(values, reset)}
      >
        {contentModal()}
      </Modal>
    </>
  );
};

export default FormHOC(ModalSupplierComponent);
