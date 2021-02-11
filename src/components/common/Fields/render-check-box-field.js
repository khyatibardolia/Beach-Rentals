import React from 'react';

const RenderCheckBoxField = ({input, onKeyPress, defaultChecked, onInput, label, disabled, readOnly, meta: {touched, asyncValidating, error}}) => (
  <>
    <div className="w-100 d-flex align-items-center">
      <input onKeyPress={onKeyPress} onInput={onInput} {...input}
             readOnly={readOnly}
             disabled={disabled}
             defaultChecked={defaultChecked}
             className="form-check-input m-0"
             id={input.name} type="checkbox"
             name={input.name}/>
      {label && <label className="form-check-label ml-3 cursor-pointer"
                       htmlFor={input.name}>{label}</label>}
    </div>
    <div className="_custom-input-border w-100">
      {touched ? (Array.isArray(error) ? (<ul>
        {error.map((d, i) =>
          <li key={i}>{d}</li>
        )}
      </ul>) : (error)) : ''}
    </div>
  </>
);

export default RenderCheckBoxField;
