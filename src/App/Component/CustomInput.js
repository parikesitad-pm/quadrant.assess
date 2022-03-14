import { Form, Input } from 'antd';

export const InputText = (props) => {
  const {
    input,
    meta: { error },
    placeholder,
    idcomponent,
    label,
    autoComplete,
    disabled,
    prefix,
    labelcol,
    maxlength,
    onKeyUp,
    className,
    showerror,
    suffix,
    onClick,
    formItemStyle,
    suffixIcon,
    tooltip,
  } = props;

  const handleOnChange = (e) => input.onChange(e.target.value);
  const showErrorValidate = showerror ? 'error' : '';
  const showErrorHelp = showerror ? error : '';

  const labelTitle = label ? (
    <span>
      <b className="capital">{label}</b>
    </span>
  ) : null;

  return (
    <Form.Item
      tooltip={tooltip}
      validateStatus={error !== undefined ? showErrorValidate : ''}
      help={error !== undefined ? showErrorHelp : ''}
      label={labelTitle}
      labelCol={labelcol}
      colon={false}
      key={label}
      style={formItemStyle}
    >
      <Input
        placeholder={placeholder}
        prefix={prefix}
        onChange={handleOnChange}
        id={idcomponent}
        value={input.value}
        autoComplete={autoComplete}
        disabled={disabled}
        maxLength={maxlength}
        onKeyUp={onKeyUp}
        className={className}
        suffix={suffixIcon ? suffixIcon : suffix}
        onClick={onClick}
        {...input}
      />
    </Form.Item>
  );
};
