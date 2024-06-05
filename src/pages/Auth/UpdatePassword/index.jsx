import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import AuthLayout from '../../../layouts/AuthLayout';
import InputMASQ from "../../../components/UI/Input";
import _ from 'lodash';
import ButtonMASQ from "../../../components/UI/Button";
import { useNavigate, useLocation  } from "react-router-dom";
import { isValidate } from "../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../../api/auth";

function UpdatePassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [dataUpdate, setDataUpdate] = useState({
        password: '',
        confirmPassword: '',
        token: ''
    })
    const [errorDataUpdate, setErrorDataUpdate] = useState({
        password: '',
        confirmPassword: ''
    })
    const isLoadingBtnUpdate = useSelector(state => state.auth.isLoadingBtnUpdate);

    useEffect(() => {
        // Lấy token từ URL
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        setDataUpdate(prevData => ({ ...prevData, token }));
      }, [location]);

    useEffect(() => {
        handleResetError();
    }, [dataUpdate])

    const handleResetError = () => {
        setErrorDataUpdate({
            password: '',
            confirmPassword: ''
        });
    }

    const handleChangeInput = (valueInput, type) => {
        let value = valueInput.target.value;
        let data = _.cloneDeep(dataUpdate);
        data[type] = value;
        setDataUpdate(data);
    }

    const validateBlur = (type) => {
        let validate = isValidate(dataUpdate, type, errorDataUpdate);
        setErrorDataUpdate(validate.error);
        return validate.isError;
    }

    const handleConfirmUpdate = () => {
        let validate = handleCheckValidateConfirm(dataUpdate, errorDataUpdate);
        setErrorDataUpdate(validate.dataError);
        if (!validate.isError) {
            dispatch(updatePassword(dataUpdate));
            navigate('/login')
        }
    }

    return (
        <AuthLayout title={'Welcome back'}>
            <div className={styles.loginWrap}>
                <div className={styles.inputWrapper}>
                    <div className={styles.label}>Password *</div>
                    <InputMASQ
                        type={"password"}
                        placeholder={'******'}
                        onChange={(e) => handleChangeInput(e, 'password')}
                        onBlur={() => validateBlur('password')}
                        value={dataUpdate.password}
                        error={errorDataUpdate.password}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <div className={styles.label}>Confirm Password *</div>
                    <InputMASQ
                        type={'password'}
                        placeholder={'******'}
                        value={dataUpdate.confirmPassword}
                        onChange={(e) => handleChangeInput(e, 'confirmPassword')}
                        onBlur={() => validateBlur('confirmPassword')}
                        error={errorDataUpdate.confirmPassword}
                    />
                </div>
                <div className={styles.btnWrap}>
                    <ButtonMASQ
                        textBtn={'Update'}
                        loading={isLoadingBtnUpdate}
                        onClick={() => handleConfirmUpdate()}
                        disable={false}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    />
                </div>
            </div>
        </AuthLayout>
    );
}

export default UpdatePassword;
