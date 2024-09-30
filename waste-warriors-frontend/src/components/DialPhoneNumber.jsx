import React from 'react';

const DialPhoneNumber = ({ phoneNumber }) => {
  return (
    <div>
      <a href={`tel:${phoneNumber}`} style={{ textDecoration: 'none', color: 'blue' }}>
        Call {phoneNumber}
      </a>
    </div>
  );
};

export default DialPhoneNumber;
