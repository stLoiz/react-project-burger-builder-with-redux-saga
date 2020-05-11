import PropTypes from 'prop-types';
import React from 'react';

import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

const Modal = ({ children, show, modalClosed }) => {
  return (
    <>
      <Backdrop show={show} clicked={modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : 0,
        }}
      >
        {children}
      </div>
    </>
  );
};
Modal.defaultProps = {
  show: false,
  children: null,
};
Modal.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
  modalClosed: PropTypes.func.isRequired,
};
export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children,
);
