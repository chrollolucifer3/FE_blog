import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import styles from './styles.module.scss';
import './styles.scss';
import { Col, Row, Tabs } from 'antd';
import { formatDate } from 'utils/helper';
import { useSelector, useDispatch } from 'react-redux';
import EditProfile from './components/EditProfile';
import Avatar from 'react-avatar';
import AvatarUpload from '../../components/UI/Avatar';
import ModalGeneral from 'components/UI/Modal/ModalGeneral';
import { setVisibleModalUpdateAvatar } from '../../states/modules/profile';
import { getMe } from '../../api/auth';

function Profile() {
  const authUser = useSelector(state => state.auth.authUser);
  const dispatch = useDispatch();
  const visibleModalUpdateAvatar = useSelector(state => state.profile.visibleModalUpdateAvatar);
  const isLoadingBtnUpdateAvatar = useSelector(state => state.profile.loadingBtnUpdateAvatar);
  const [keyTable, setKeyTable] = useState('1');
  const [avatarUpdateKey, setAvatarUpdateKey] = useState(0);
  const items = [
    {
      key: '1',
      label: 'Edit profile',
    },
  ];

  const handleUpdateAvatar = () => {
    dispatch(setVisibleModalUpdateAvatar(true));
  };

  const handleUploadSuccess = () => {
    dispatch(setVisibleModalUpdateAvatar(false));
    dispatch(getMe());
    setAvatarUpdateKey(prevKey => prevKey + 1);  // increment key to force re-render
  };


  const onChange = key => {
    setKeyTable(key);
  };

  return (
    <MainLayout>
      <div className={styles.profileWrap}>
        <Row gutter={20}>
          <Col span={24}>
            <div className={`${styles.profileItem}`}>
              <div className={styles.informationWrap}>
                <div className={styles.avatarWrap}>
                  <div className={styles.btnChangeAvatar}>
                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" width="13" height="13">
                      <path
                        fill="currentColor"
                        d="M3.656 7.313c0-1.571 1.272-2.844 2.844-2.844s2.844 1.272 2.844 2.844-1.272 2.844-2.844 2.844-2.844-1.273-2.844-2.844zM6.5 5.688c-.896 0-1.625.729-1.625 1.625S5.604 8.938 6.5 8.938s1.625-.729 1.625-1.625S7.396 5.688 6.5 5.688zm2.715-4.041.264.791h1.896c.896 0 1.625.729 1.625 1.625v6.5c0 .896-.729 1.625-1.625 1.625h-9.75A1.625 1.625 0 0 1 0 10.563v-6.5a1.625 1.625 0 0 1 1.625-1.625h1.896l.264-.791A1.216 1.216 0 0 1 4.942.813H8.06a1.216 1.216 0 0 1 1.155.834zm-7.59 2.009a.407.407 0 0 0-.406.406v6.5a.406.406 0 0 0 .406.406h9.75a.408.408 0 0 0 .406-.406V4.063a.408.408 0 0 0-.406-.406H8.599l-.541-1.625H4.942l-.541 1.625H1.625z"
                      />
                    </svg>
                  </div>
                  <div className={styles.imgWrap} onClick={handleUpdateAvatar}>
                    {authUser.avatar ? (
                      <img src={authUser.avatar} alt="" />
                    ) : (
                      <Avatar name={authUser.name} style={{ fontSize: '24px' }} size="80" round={false} />
                    )}
                  </div>
                </div>
                <div className={styles.infoWrap}>
                  <div className={styles.name}>{authUser.name}</div>
                  <div className={styles.bod}>Member Since: {formatDate(authUser.created_at)}</div>
                  <div className={styles.btnWrap}></div>
                </div>
              </div>
              <div className={`${styles.tabWrap} tab-custom`}>
                <Tabs defaultActiveKey={keyTable} items={items} onChange={onChange} />
              </div>
            </div>
          </Col>

          {keyTable === '1' ? (
            <Col span={24}>
              <EditProfile />
            </Col>
          ) : (
            ''
          )}
        </Row>
        <ModalGeneral
          isModalOpen={visibleModalUpdateAvatar}
          configModal={{
            title: 'Do you want to change Avatar?',
            type: 'UPDATE',
          }}
          content={
            <AvatarUpload
              key={avatarUpdateKey}
              onUploadSuccess={handleUploadSuccess}
            />}
          onClose={() => dispatch(setVisibleModalUpdateAvatar(false))}
          onConfirm={() => dispatch(setVisibleModalUpdateAvatar(false))}
          loading={isLoadingBtnUpdateAvatar}
        />
      </div>
    </MainLayout>
  );
}

export default Profile;
