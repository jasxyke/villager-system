import React from 'react';
import mainLogo from "../../assets/logo.png";

const Container = () => {
  const mainContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    background: 'linear-gradient(180deg, rgba(174, 192, 154, 1) 40%, rgba(52, 76, 17, 1) 100%)',
    height: '1200px',
    width: 'auto',
  };

  const userContainerStyle = {
    width: 'calc(100% - 400px)',
    maxWidth: '1200px',
    borderRadius: '8px',
    padding: '20px',
    alignItems: 'center',
    marginLeft: '300px',
    display: 'flex',
    justifyContent: 'center',
  };

  const logoContainerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
  };

  const mainLogoStyle = {
    maxWidth: '150px',
    height: 'auto',
  };

  return (
    <div style={mainContainerStyle}>
      <div style={userContainerStyle}>
        <div style={logoContainerStyle}>
          <img src={mainLogo} alt="Main Logo" style={mainLogoStyle} />
        </div>
      </div>
    </div>
  );
}

export default Container;
