import React from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import styles from './index.module.scss';

const BackdropCircularProgress = ({ open }) => {
  return (
    <div>
      <Backdrop className={styles.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default React.memo(BackdropCircularProgress);
