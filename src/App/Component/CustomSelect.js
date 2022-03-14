import { Divider, Form, Select } from 'antd';

export const InputSelect = (props) => {
  const {
    input: { onFocus, onBlur, onChange, value },
    meta: { error },
    options,
    data,
    defaultitemname,
    idcomponent,
    label,
    addLabel,
    customKeyValue,
    descriptionValue,
    customKeyLabel,
    showSearch,
    filterOption,
    disabled,
    handleOnSelect,
    forceValue,
    labelcol,
    mode,
    className,
    formItemStyle,
    dividerStyle,
    listView,
    showerror,
    tooltip,
    placeholder,
    groupOption,
    groupKeyValue,
    customKeyOptions,
    icon,
  } = props;
  const defaultDividerStyle = {
    marginTop: '2px',
    marginBottom: '0px',
    ...dividerStyle,
  };

  const showErrorValidate = showerror ? 'error' : '';
  const showErrorHelp = showerror ? error : '';

  const loopData = data || options;
  const items = !groupOption
    ? loopData?.map((item, key) => (
        <Select.Option
          disabled={item?.disabled}
          id={`optionValue${label}-${key}`}
          key={customKeyValue ? item[customKeyValue] : item.id}
          value={customKeyValue ? item[customKeyValue] : item.id}
          name={customKeyLabel ? item[customKeyLabel] : item.name}
        >
          {descriptionValue ? (
            <>
              <p className="selectDescTitle">
                {customKeyLabel ? item[customKeyLabel] : item.name}
              </p>
              <p className="selectDescDecription">{item[descriptionValue]}</p>
              {listView && <Divider style={defaultDividerStyle} />}
            </>
          ) : customKeyLabel ? (
            item[customKeyLabel]
          ) : (
            item.name
          )}
        </Select.Option>
      ))
    : loopData?.map((item, key) => {
        const loopOptions = customKeyOptions
          ? item[customKeyOptions]
          : item?.options;

        return (
          <Select.OptGroup
            label={
              groupKeyValue
                ? `${item[groupKeyValue]} ${
                    loopOptions?.length > 0
                      ? `(${loopOptions?.length})`
                      : '(No data)'
                  }`
                : `${
                    item.name?.length > 0
                      ? `(${item.name?.length})`
                      : '(No data)'
                  }`
            }
            key={key}
          >
            {loopOptions?.map((sub, idx) => (
              <Select.Option
                disabled={sub?.disabled}
                id={`optionValue${label}-${idx}`}
                key={customKeyValue ? sub[customKeyValue] : sub.id}
                value={customKeyValue ? sub[customKeyValue] : sub.id}
                name={customKeyLabel ? sub[customKeyLabel] : sub.name}
              >
                {descriptionValue ? (
                  <>
                    <p className="selectDescTitle">
                      {customKeyLabel ? sub[customKeyLabel] : sub.name}
                    </p>
                    <p className="selectDescDecription">
                      {sub[descriptionValue]}
                    </p>
                    {listView && <Divider style={defaultDividerStyle} />}
                  </>
                ) : customKeyLabel ? (
                  sub[customKeyLabel]
                ) : (
                  sub.name
                )}
              </Select.Option>
            ))}
          </Select.OptGroup>
        );
      });

  const handleOnChange = (e) => {
    onChange(e);
  };
  const labelTitle = label && (
    <span>
      <b className="capital">{label}</b>
    </span>
  );

  const inputValue =
    value === '' && (mode === 'multiple' || mode === 'tags') ? [] : value;

  return (
    <Form.Item
      tooltip={tooltip}
      validateStatus={error !== undefined ? showErrorValidate : ''}
      help={error !== undefined ? showErrorHelp : ''}
      label={labelTitle}
      colon={false}
      labelCol={labelcol}
      style={formItemStyle}
    >
      <Select
        onChange={handleOnChange}
        showSearch={showSearch}
        id={idcomponent}
        mode={mode}
        value={forceValue ? forceValue : inputValue}
        filterOption={filterOption ? filterOption : true}
        optionFilterProp="name"
        disabled={disabled}
        style={{ border: 'none', width: '100%' }}
        className={className}
        tokenSeparators={[',']}
        placeholder={placeholder}
        dropdownRender={(menu) => (
          <div>
            {menu}
            {addLabel && (
              <div
                className="btnAddItemSelect"
                onMouseDown={(e) => e.preventDefault()}
              >
                {icon} {addLabel}
              </div>
            )}
          </div>
        )}
        onSelect={handleOnSelect}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {defaultitemname && (
          <Select.Option value="">{defaultitemname}</Select.Option>
        )}
        {items}
      </Select>
    </Form.Item>
  );
};
