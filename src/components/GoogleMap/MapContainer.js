import React, { Component } from 'react';

class MapContainer extends Component {
  render() {
    return (
      <div style={{height: '100%', width: '100%'}}>
        <iframe
          title="googleMap"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3483.6925924295397!2d-94.98957054670454!3d29.173729729567366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x863f866ff670a0a1%3A0x421faf15353f7ea7!2s17620+Termini-San+Luis+Pass+Rd%2C+Galveston%2C+TX+77554%2C+EE.+UU.!5e0!3m2!1ses-419!2smx!4v1524413239928"
          frameBorder="0" style={{border: 0, width: '100%', height: '500px'}} allowFullScreen>
        </iframe>
      </div>
    );
  }
}

export default MapContainer;

