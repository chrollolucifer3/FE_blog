import React, { useEffect, useState } from 'react';
import styles from "./styles.module.scss";
import InputMASQ from "../../../../components/UI/Input";
import ButtonMASQ from "../../../../components/UI/Button";
import _ from "lodash";
import { isValidate } from "../../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../../utils/helper";
import ModalGeneral from "../../../../components/UI/Modal/ModalGeneral";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    setErrorCreateAuthor,
    setVisibleModalCreateAuthor
} from "../../../../states/modules/author";
import { } from "../../../../api/author";

Create.prototype = {
    isModalOpen: PropTypes.bool.isRequired,
    configModal: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
}

Create.defaultProps = {
    isModalOpen: false,
    textBtnConfirm: 'OK',
    configModal: {
        title: 'Title',
        type: 'CREATE',
    }
}

function Create(props) {
    let { author, configModal } = props
    const [dataCreate, setDataCreate] = useState({
        name: '',
        email: '',
        phone: '',
        bio: '',
    })
    const visibleModalCreateAuthor = useSelector(state => state.author.visibleModalCreateAuthor);
    const isLoadingBtnCreateAuthor = useSelector(state => state.author.isLoadingBtnCreateAuthor);
    const errorCreateAuthor = useSelector(state => state.author.errorCreateAuthor);
    const dispatch = useDispatch();

    useEffect(() => {
        handleReloadData();
    }, [visibleModalCreateAuthor])

    useEffect(() => {
        dispatch(setErrorCreateAuthor({
            name: '',
            email: '',
            phone: '',
            bio: '',
        }));
    }, [dataCreate, dispatch])

    useEffect(() => {
        setDataCreate({
            name: author.name,
            email: author.email,
            phone: author.phone,
            bio: author.bio,
        })
    }, [author])

    const handleReloadData = () => {
        setDataCreate({
            name: '',
            email: '',
            phone: '',
            bio: '',
        })
    }

    const handleChangeInput = (valueInput, type) => {
        let value = valueInput.target.value;
        let data = _.cloneDeep(dataCreate);
        data[type] = value;
        setDataCreate(data);
    }

    const validateBlur = (type) => {
        let validate = isValidate(dataCreate, type,);
        dispatch(setErrorCreateAuthor(validate.error));
        return validate.isError;
    }

    const handleConfirmCreateAuthor = () => {
        let dataValidate = dataCreate;
        let data = new FormData();
        data.append(`name`, dataCreate.name);
        data.append(`email`, dataCreate.email);
        data.append(`phone`, dataCreate.phone);
        data.append(`bio`, dataCreate.bio);

        let validate = handleCheckValidateConfirm(dataValidate,);
        dispatch(setErrorCreateAuthor(validate.dataError));
    }

    return (
        <ModalGeneral
            isModalOpen={visibleModalCreateAuthor}
            onClose={() => dispatch(setVisibleModalCreateAuthor(false))}
            configModal={configModal}
        >
            <div className={styles.mainModalWrap}>
                <div className={styles.inputWrapper}>
                    <div className={styles.label}>Name *</div>
                    <InputMASQ
                        type={"text"}
                        placeholder={"Enter email..."}
                        onChange={(e) => handleChangeInput(e, 'name')}
                        onBlur={() => validateBlur('name')}
                        value={dataCreate.name}
                        error={errorCreateAuthor.name}
                    />
                </div>

                <div className={styles.inputWrapper}>
                    <div className={styles.label}>Email *</div>
                    <InputMASQ
                        type={"text"}
                        placeholder={"Enter email..."}
                        onChange={(e) => handleChangeInput(e, 'email')}
                        onBlur={() => validateBlur('email')}
                        value={dataCreate.email}
                        error={errorCreateAuthor.email}
                    />
                </div>

                <div className={styles.inputWrapper}>
                    <div className={styles.label}>Phone *</div>
                    <InputMASQ
                        type={"text"}
                        placeholder={"Enter phone..."}
                        onChange={(e) => handleChangeInput(e, 'phone')}
                        onBlur={() => validateBlur('phone')}
                        value={dataCreate.phone}
                        error={errorCreateAuthor.phone}
                    />
                </div>
                <div>
                    <div className={styles.label}>Bio *</div>
                    <InputMASQ
                        type={"text"}
                        placeholder={"Enter bio..."}
                        onChange={(e) => handleChangeInput(e, 'bio')}
                        onBlur={() => validateBlur('bio')}
                        value={dataCreate.bio}
                        error={errorCreateAuthor.bio}
                    />
                </div>

                <div className={styles.btnWrap}>
                    <ButtonMASQ
                        textBtn={'Save'}
                        loading={isLoadingBtnCreateAuthor}
                        onClick={() => handleConfirmCreateAuthor()}
                        disable={false}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    />
                </div>
            </div>
        </ModalGeneral>
    );
}

export default Create;
