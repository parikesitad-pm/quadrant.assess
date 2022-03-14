import { Form } from 'react-final-form';

export const FormHOC = (WrappedComponent, formProps) => {
  const component = (props) => {
    const { onSubmit, initialValues } = props;
    const subscribedField = {
      error: true,
      value: true,
    };

    return (
      <Form
        {...formProps}
        // validate={
        //   formProps.validate
        //     ? validationProps
        //       ? validationProps.withProps === true
        //         ? (val) =>
        //             formProps.validate(val, { ...props, ...validationProps })
        //         : (val) => formProps.validate(val, validationProps)
        //       : (val) => formProps.validate(val)
        //     : null
        // }
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={(propsrender) => (
          <WrappedComponent
            form={{ ...propsrender, subscribedField }}
            {...props}
          />
        )}
      />
    );
  };
  return component;
};
