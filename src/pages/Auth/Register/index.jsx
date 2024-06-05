import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss'
import AuthLayout from '../../../layouts/AuthLayout'
import InputMASQ from "../../../components/UI/Input";
import _ from 'lodash';
import ButtonMASQ from "../../../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { isValidate } from "../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../utils/helper";
import { register } from "../../../api/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorRegister
} from "../../../states/modules/auth";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataRegister, setDataRegister] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  // const [errorDataRegister, setErrorDataRegister] = useState({
  //   name: '',
  //   email: '',
  //   phone: '',
  //   password: '',
  //   confirmPassword: ''
  // })
  const isLoadingBtnRegister = useSelector(state => state.auth.isLoadingBtnRegister);
  const errorRegister = useSelector(state => state.auth.errorRegister);

  // useEffect(() => {
  //   handleResetError();
  // }, [dataRegister])

  useEffect(() => {
    dispatch(setErrorRegister({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }));
  }, [dataRegister, dispatch])

  const handleChangeInput = (valueInput, type) => {
    let value = valueInput.target.value;
    let data = _.cloneDeep(dataRegister);
    data[type] = value;
    setDataRegister(data);
  }

  // const handleResetError = () => {
  //   setErrorRegister({
  //     email: '',
  //     phone: '',
  //     password: '',
  //     confirmPassword: ''
  //   });
  // }

  const validateBlur = (type) => {
    let validate = isValidate(dataRegister, type, errorRegister);
    dispatch(setErrorRegister(validate.error));
    return validate.isError;
  }

  const handleConfirmRegister = () => {
    let validate = handleCheckValidateConfirm(dataRegister, errorRegister);
    setErrorRegister(validate.dataError);
    if (!validate.isError) {
      dispatch(register(dataRegister));
    }
  }

  return (
    <AuthLayout title={'Register account'}>
      <div className={styles.registerWrap}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Name *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Enter name..."}
            onChange={(e) => handleChangeInput(e, 'name')}
            onBlur={() => validateBlur('name')}
            value={dataRegister.name}
            error={errorRegister.name}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Email *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Enter email..."}
            onChange={(e) => handleChangeInput(e, 'email')}
            onBlur={() => validateBlur('email')}
            value={dataRegister.email}
            error={errorRegister.email}
          />

        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Phone *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Enter phone..."}
            onChange={(e) => handleChangeInput(e, 'phone')}
            onBlur={() => validateBlur('phone')}
            value={dataRegister.phone}
            error={errorRegister.phone}
          />
        </div>

        {/* <div className={styles.inputWrapper}>
          <div className={styles.label}>Address *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Enter address..."}
            onChange={(e) => handleChangeInput(e, 'address')}
            onBlur={() => validateBlur('address')}
            value={dataRegister.address}
            error={errorDataRegister.address}
          />
        </div> */}

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Password *</div>
          <InputMASQ
            type={'password'}
            placeholder={'******'}
            value={dataRegister.password}
            onChange={(e) => handleChangeInput(e, 'password')}
            onBlur={() => validateBlur('password')}
            error={errorRegister.password}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Confirm password *</div>
          <InputMASQ
            type={'password'}
            placeholder={'******'}
            value={dataRegister.confirmPassword}
            onChange={(e) => handleChangeInput(e, 'confirmPassword')}
            onBlur={() => validateBlur('confirmPassword')}
            error={errorRegister.confirmPassword}
          />
        </div>

        <div className={styles.btnWrap}>
          <ButtonMASQ
            textBtn={'Register'}
            loading={isLoadingBtnRegister}
            onClick={() => handleConfirmRegister()}
            disable={false}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          />
        </div>

        <div className={styles.btnSwitchWrap}>
          <div
            onClick={() => navigate('/login')}
            className={styles.btnRegister}
          >
            Already have an account, <span className={styles.text}>login</span>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Register;
