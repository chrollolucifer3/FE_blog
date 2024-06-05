import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useDispatch } from 'react-redux';
import { updateAvatarInfo } from "../../../api/profile";
import { setVisibleModalUpdateAvatar } from '../../../states/modules/profile';
// import { useSelector } from 'react-redux';
// import { updateAvatarUserSuccess, updateAvatarUserFail } from '../../../states/modules/profile';

const AvatarUpload = ({ onUploadSuccess }) => {
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  // const isLoadingBtnUpdateAvatar = useSelector(state => state.profile.loadingBtnUpdateAvatar);

  const beforeUpload = (file) => {
    // Dùng file này để tạo formData
    const formData = new FormData();
    formData.append('avatar', file);
    // Gọi API để upload
    dispatch(updateAvatarInfo(formData))
      .then(() => {
        dispatch(setVisibleModalUpdateAvatar(false)); // Đóng modal
        onUploadSuccess(); // Gọi callback để thông báo thành công
      })
      .catch(() => {
      });

    return false; // Ngăn antd tự upload
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <ImgCrop rotationSlider aspect={1} modalTitle="Crop Image">
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        beforeUpload={beforeUpload}
      // showUploadList={{ showPreviewIcon: false }} // Ẩn nút xem trước
      >
        {fileList.length < 1 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default AvatarUpload;
