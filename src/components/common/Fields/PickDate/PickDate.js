import moment from 'moment';
import React, { Component, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '../../../../assets/img/icons/calendar.svg';
import './pick-date.scss';

class PickDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected ? this.props.selected : new Date()
    };
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.minDate && nextState.selected && nextState.minDate !== nextProps.minDate &&
      new Date(nextState.selected).getTime() <= new Date(nextProps.minDate).getTime()) {
      return {selected: new Date(nextProps.minDate), minDate: nextProps.minDate};
    } else if (nextProps.selected && nextState.selected !== nextProps.selected) {
      return {selected: nextProps.selected};
    } else {
      return null;
    }
  }

  handleChange = (date) => {
    const {input, onChangeDate} = this.props;
    this.setState({
      selected: date
    });
    if (onChangeDate || input.name === 'discounts.0.date_start') {
      onChangeDate(date);
    }
    if (typeof input.onChange === 'function') {
      input.onChange(moment(date).format(`YYYY-MM-DD`));
    }
  };

  getDate = () => {
    const {isDob} = this.props;
    let currDate = new Date();
    let year, month, day;
    const hours = currDate.getHours();
    const minutes = currDate.getMinutes();
    const seconds = currDate.getSeconds();
    year = currDate.getFullYear();
    month = currDate.getMonth() + 1;
    day = currDate.getDate();

    /*If current date is the first day of the month, than get previous month's last day
     as selection.*/
    let date = new Date();
    date.setFullYear(date.getFullYear(), date.getMonth(), 0);

    if (day === 1) {
      month = date.getMonth() + 1;
      day = date.getDate();
    } else if (isDob) {
      year = date.getFullYear() - 18;
    }
    let prevDate = year + '-' + (month <= 9 ? ('0' + month) : month) + '-' +
      (day <= 9 ? ('0' + day) : day) + ' ' + hours + ':' + minutes + ':' + seconds;
    return new Date(prevDate.toString());
  };

  componentDidMount() {
    /*if (!this.props.dob) {
      const {input, isDob} = this.props;
      const {selected} = this.state;
      if (selected) {
        const date = moment(selected).format('MM-DD-YYYY');
        if (typeof input.onChange === 'function') {
          this.setState((state) => {
            state.selected = date;
            return state;
          });
          input.onChange(date);
        }
        if (isDob) {
          input.onChange(moment(this.getDate()).format('MM-DD-YYYY'));
          this.setState((state) => {
            state.selected = moment(this.getDate()).format('MM-DD-YYYY');
            return state;
          });
        }
      }
    }*/
  }

  render() {
    const {selected} = this.state;
    const {
      input, label, isSetMinDate, minDate, maxDate, disabled, customClass, hideIcon,
      isBookingPage, meta: {touched, error, submitFailed}, showLabel
    } = this.props;
    return (
      <Fragment>{
        <DatePicker className={`${customClass ? customClass : ''}`}
                    customInput={<DateCustomInput showLabel={showLabel}
                                                  label={label}
                                                  input={input}
                                                  hideIcon={hideIcon}
                                                  isBookingPage={isBookingPage}
                                                  disabled={disabled}
                                                  meta={{touched, error, submitFailed}}/>}
                    onChange={this.handleChange}
                    peekNextMonth
                    showMonthDropdown
                    selected={selected ? new Date(selected) : null}
                    popperPlacement="bottom-start"
                    minDate={isSetMinDate && new Date(minDate)}
                    showYearDropdown
                    dropdownMode="select"
                    maxDate={maxDate && new Date(maxDate)}
                    disabled={disabled}
        />
      }
        <div className="_custom-select-border _custom-input-border">
          {touched ? (Array.isArray(error) ? (<ul className={'pl-3 my-1 mb-0'}>
            {error.map((d, i) =>
              <li key={i}>{d}</li>
            )}
          </ul>) : (error)) : ''}
        </div>
      </Fragment>
    );
  }
}

class DateCustomInput extends Component {

  render() {
    const {
      input, label, customLabelClass, hideIcon, id, onClick, isBookingPage,
      meta: {error, touched}, showLabel
    } = this.props;
    return (
      <div className={`custom-date-picker cursor-pointer ${touched && error ? 'mt-2' : ''}`}>
        <input
          className={`datepicker-input pl-3 pr-0 cursor-pointer w-100
          ${!showLabel ? 'selected-date' : ''}
          ${touched && error ? 'red-border my-0' : ''}`}
          id={input.name}
          readOnly={true}
          onClick={onClick}
          {...input}>
        </input>
        <div className={`d-flex align-items-center date-picker-label h-100
                                      ${isBookingPage ? 'w-100 pl-2' : ''}`}>
          {!hideIcon ? <img src={CalendarIcon} alt={'CalendarIcon'}/> : null}
          {showLabel ? <label id={id}
                              className={`date-text _custom-label label-blue cursor-pointer mb-0
                              ${!hideIcon ? 'ml-2' : ''} ${isBookingPage ? 'w-100' : ''}
          ${customLabelClass ? customLabelClass : ''}`}
                              htmlFor={input.name}>{label}</label> :
            <label id={id}
                   className={`date-text _custom-label cursor-pointer mb-0 h-100
                              ${!hideIcon ? 'ml-2' : ''} ${isBookingPage ? 'w-100' : ''}
          ${customLabelClass ? customLabelClass : ''}`}
                   htmlFor={input.name}/>}
        </div>
      </div>
    );
  }
}

export default PickDate;
