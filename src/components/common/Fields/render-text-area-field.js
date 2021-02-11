import React from 'react';

const RenderTextAreaField = ({input, onKeyPress, maxLength, onInput, label, readOnly, rows, placeholder, meta: {touched, asyncValidating, error}}) => (
  <>
      <textarea onKeyPress={onKeyPress} onInput={onInput} {...input}
                maxLength={maxLength} readOnly={readOnly}
                placeholder={placeholder}
                rows={rows ? rows : 4}
                className={`form-control _custom-input p-0 ${touched && error ?
                  'has-error' : ''}`}
                id={input.name}
                name={input.name} value={input.value === 'undefined' ? '' : input.value}/>
    {label ? <label className="_custom-label" htmlFor={input.name}>{label}</label> : null}
    <div className="_custom-input-border">
      {touched ? (Array.isArray(error) ? (<ul>
        {error.map((d, i) =>
          <li key={i}>{d}</li>
        )}
      </ul>) : (error)) : ''}
    </div>
  </>
);

export default RenderTextAreaField;
