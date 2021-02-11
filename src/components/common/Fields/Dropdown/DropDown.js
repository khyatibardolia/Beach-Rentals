import React from 'react';
import adjust from '../../../../assets/img/icons/adjust.png';
import './style.scss';

const DropDown = ({input, optionList, isCategory, icon, selectedValue, customClass}) => {
  return <div className={`d-flex align-items-center ${customClass ? customClass : ''}`}>
    <span className="m-auto">
      {isCategory ? <img src={adjust} alt={'adjust'}/> : null}
      {icon ? <i className={`fa ${icon} text-blue`}/> : null}
      </span>
    <select {...input}
            id={input.name}
            name={input.name}
            value={selectedValue}
            className="pl-1 pr-0 category-dropdown form-control input-lg date-text cursor-pointer border-0">
      {optionList && optionList.length ? optionList.map((d, i) => {
        return <option key={i} className={'date-text'} value={d.title}
                       defaultValue={selectedValue === d.title}>{d.title}</option>
      }) : null}
    </select>
  </div>;
};

export default DropDown;
