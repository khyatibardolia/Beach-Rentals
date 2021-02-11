import React from 'react';

class RenderCommonRadioField extends React.Component {

  componentDidMount() {
    const {defaultSelected, input, propsChange} = this.props;
    if (defaultSelected) {
      propsChange(input.name, input.value);
    }
  }

  getErrors = () => {
    const {showError, meta: {touched, error}} = this.props;
    if ((touched || showError) && error) {
      return <div className="_custom-input-border">
        {Array.isArray(error) ? <ul>
          {error.map((d, i) =>
            <li key={i}>{d}</li>
          )}
        </ul> : (error)}
      </div>;
    }
    return '';
  };

  render() {
    const {input, id, isChecked, defaultChecked, label} = this.props;
    return <>
      <input {...input}
             type="radio"
             id={id}
             checked={isChecked}
             defaultChecked={defaultChecked}
             name={input.name}
             className="form-check-input my-0 d-flex align-items-center"/>
      {label ?
        <label
          className={`form-check-label ${!isChecked ? 'ml-2' : ''} cursor-pointer`}
          htmlFor={id}>
          {label}
        </label>
        : null}
      {this.getErrors()}
    </>;
  }
};

export default RenderCommonRadioField;
