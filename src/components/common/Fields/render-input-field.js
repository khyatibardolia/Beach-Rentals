import React from 'react';
import { Form } from 'react-bootstrap';

const RenderInputField = ({
                            input, maxLength, onKeyUp, onChange, onKeyDown, onBlur,
                            onKeyPress, placeholder, onInput, label, showError, type, readOnly,
                            isHideBorder, inputValue, meta: {touched, error}
                          }) => {
  const getErrors = () => {
    if ((touched || showError) && error) {
      return <div className="_custom-input-border">
        {Array.isArray(error) ? <ul>
          {error.map((d, i) =>
            <li key={i}>{d}</li>
          )}
        </ul> : (error)}
      </div>
    }
    return '';
  };
  return <>
    <Form.Control onKeyPress={onKeyPress}
                  onKeyUp={onKeyUp}
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                  maxLength={maxLength}
                  onBlur={onBlur}
                  autoComplete="none"
                  onInput={onInput}
                  {...input}
                  type={type}
                  readOnly={readOnly}
                  className={`_custom-input mb-0 ${isHideBorder ? 'border-0 transparent px-0' : ''} 
                  ${touched && error ? 'has-error' : ''} ${readOnly ? 'bgDisable' : ''} `}
                  id={input.name}
                  value={inputValue ? inputValue : input.value === 'undefined' ? '' : input.value}
                  placeholder={placeholder}
                  name={input.name}/>
    {label ?
      <label className="_custom-label" style={{pointerEvents: 'none'}}>{label}</label>
      : null}
    {getErrors()}
  </>;
};

export default RenderInputField;
