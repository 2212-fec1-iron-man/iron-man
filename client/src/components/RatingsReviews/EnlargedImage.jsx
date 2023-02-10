import React from 'react';
import ReactModal from 'react-modal';

const EnlargedImage = ({imageUrl, isOpen, onClose }) => {

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)'
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: 'none',
          background: 'none'
        },
      }}
    >

      <img src={imageUrl} alt="enlarged review photo" style={{ height: '100%', width: '100%' }} />
      <div className="overlay"  style={{ background: 'rgba(255, 255, 255, 0.9)' }} onClick={onClose}>
        <span style={{ color: 'black', cursor: 'pointer', position: 'absolute', top: '10px', right: '10px' }}>
          [Close]
        </span>
      </div>


    </ReactModal>
  );
};

export default EnlargedImage;