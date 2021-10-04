import React from 'react';

function Map() {
  return (
    <div>
      <iframe
        title="This is a unique title"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.761549873132!2d-118.34587228529938!3d34.10124852259447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bf20e4c82873%3A0x14015754d926dadb!2zNzA2MCBIb2xseXdvb2QgQmx2ZCwgTG9zIEFuZ2VsZXMsIENBIDkwMDI4LCDQodCo0JA!5e0!3m2!1sru!2sua!4v1633371121925!5m2!1sru!2sua"
        style={{
          width: '100vw',
          height: '450px',
          border: '0',
          allowfullscreen: '',
          loading: 'lazy',
        }}
      />
    </div>
  );
}

export default Map;







