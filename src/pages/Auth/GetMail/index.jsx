import React from 'react';
import { Result } from 'antd';
import styles from './styles.module.scss'

// import AuthLayout from '../../../layouts/AuthLayout'

function ForgotPassword() {

  return (
    <div className={styles.getMail}>
      <Result
        status="success"
        title="Please check your email to reset password!"
      />
    </div>
  )
}

export default ForgotPassword;

