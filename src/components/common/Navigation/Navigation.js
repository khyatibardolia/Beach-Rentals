import objectPath from 'object-path';
import React, { Component } from 'react';
import Footer from '../../../components/common/Footer/Footer';
import TopNav from '../../../components/common/TopNav/index';

export const Navigation = (WrappedComponent) => {
  return class extends Component {
    componentDidMount() {
      const {history} = this.props;
      const path = objectPath.get(history, 'location.pathname').split('/')[1];
      if (path === '') {
        document.title = 'Rick\'s Beach';
      } else {
        document.title = path?.charAt(0).toUpperCase() + path?.slice(1).toLowerCase();
      }
     /* window.onbeforeunload = (e) => {
        const confirmationMessage = 'Are you sure you want to leave this page?';

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
      };*/
    }

    render() {
      const {history} = this.props;
      const path = objectPath.get(history, 'location.pathname');
      return (
        <>
          <div className={'m-0 p-0 w-100 h-100'} style={{overflowX: 'hidden'}}>
            <TopNav/>
            <div className={`main-app ${path === '/' ? '' : ''}`}>
              <WrappedComponent {...this.props}/>
            </div>
            <Footer/>
          </div>
        </>
      );
    }
  };
};
