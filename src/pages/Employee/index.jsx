import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import styles from './styles.module.scss';
import TableCustom from '../../components/UI/Table'
import InputMASQ from "../../components/UI/Input";
import ButtonMASQ from "../../components/UI/Button";
// import IconDeleteTable from "../../assets/images/icon/table/delete_14x14.svg";
import Avatar from 'react-avatar';
import _ from "lodash";
import { FormOutlined, DeleteOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
// import IconEditTable from "../../assets/images/icon/table/edit_12x12.svg";
// import SwitchMASQ from "../../components/UI/Switch";
import CreateOrUpdate from "./components/CreateOrUpdate";
import ModalConfirm from "../../components/UI/Modal/ModalConfirm";

import { Tag } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getListEmployee, handleDeleteEmployee, updateEmployeeStatus } from "../../api/employee";
import {
  setVisibleModalCreateOrUpdateEmployee,
  setVisibleModalDeleteEmployee,
  setVisibleModalUpdateStatusEmployee
}
  from "../../states/modules/employee";
// import User from '../../assets/images/user/6.jpg';
// import Filter from './components/Filter';
// import BtnFilter from "../../components/ButtonFilter";

function Employee() {

  const authUser = useSelector(state => state.auth.authUser);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <div className={styles.nameWrap}>
        <div className={styles.imgWrap}>
          {
            record.avatar ?
              <img src={record.avatar} alt="" /> : <Avatar name={record.name} size="31" round={false} />
          }
        </div>
        <span>{record.name}</span>
      </div>,
      defaultSortOrder: '',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => <span>{record.email}</span>,
      defaultSortOrder: '',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (text, record) => <span>{record.phone}</span>,
      defaultSortOrder: '',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <>
          {
            record.status === "active" ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>
          }
        </>
      ),
      filters: [
        {
          text: 'Active',
          value: 'active',
        },
        {
          text: 'Inactive',
          value: 'inactive',
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
    },
    {
      title: 'Deleted At',
      dataIndex: 'deletedAt',
      key: 'Deleted At',
      render: (text, record) => {
        const date = new Date(record.deleted_at);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return <span>{record.deleted_at ? formattedDate : ''}</span>;
      },
    },
    {
      title: 'Actions',
      key: 'action',
      fixed: 'right',
      align: 'center',
      width: '80px',
      render: (text, record) => (
        <>
          {
            authUser._id !== record._id ?
              <div className={styles.btnAction}>
                <div onClick={() => handleEdit(record)} className={styles.btnWrap} title='Update'>
                  <FormOutlined />
                  {/* <img src={IconEditTable} alt="" /> */}
                </div>
                <div onClick={() => handleShowConfirmDelete(record)} className={styles.btnWrap} title='Delete'>
                  <DeleteOutlined />
                  {/* <img src={IconDeleteTable} alt="" /> */}
                </div>
                <div className={`switch-table-style-custom ${styles.btnWrap}`} onClick={() => handleShowConfirmUpdateStatus(record)}>
                  {
                    record.status === "active" ?
                      <span
                        title='Deactivate'
                        style={{
                          color: "#FF4D4F"
                        }}>
                        <CloseCircleOutlined />
                      </span> : <span
                        title='Activate'
                        style={{
                          color: "#52C41A"
                        }}>
                        <CheckCircleOutlined />
                      </span>
                  }
                </div>
              </div> : ''
          }
        </>
      ),
    },
  ];
  const employees = useSelector(state => state.employee.employees);
  const isLoadingTableEmployee = useSelector(state => state.employee.isLoadingTableEmployee);
  const paginationListEmployee = useSelector(state => state.employee.paginationListEmployee);
  const visibleModalDeleteEmployee = useSelector(state => state.employee.visibleModalDeleteEmployee);
  const visibleModalUpdateStatusEmployee = useSelector(state => state.employee.visibleModalUpdateStatusEmployee);
  const [employee, setEmployee] = useState({});
  const [configModal, setConfigModal] = useState({
    title: 'Create user',
    type: 'CREATE',
  })
  const [dataFilter, setDataFilter] = useState({
    keySearch: '',
    status: '',
    perPage: 10,
    page: 1,
    order: null,
    column: null,
  })
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListEmployee(dataFilter))
  }, [dataFilter, dispatch])

  useEffect(() => {
    if (!visibleModalDeleteEmployee && !visibleModalUpdateStatusEmployee) {
      dispatch(getListEmployee());
    }
  }, [visibleModalDeleteEmployee, visibleModalUpdateStatusEmployee, dispatch]);

  const handleCreate = () => {
    dispatch(setVisibleModalCreateOrUpdateEmployee(true))
    setConfigModal({
      title: "Create user",
      type: "CREATE"
    })
  }

  const handleEdit = (employee) => {
    let employeeSelect = _.cloneDeep(employee)
    setEmployee(employeeSelect)
    dispatch(setVisibleModalCreateOrUpdateEmployee(true))
    setConfigModal({
      title: "Update user",
      type: "UPDATE"
    })
  }

  const handleShowConfirmDelete = (employee) => {
    let employeeSelect = _.cloneDeep(employee)
    setEmployee(employeeSelect)
    dispatch(setVisibleModalDeleteEmployee(true))
  }

  const handleConfirmDeleteEmployee = () => {
    dispatch(handleDeleteEmployee(employee._id))
  }

  const changeCurrentPage = (page) => {
    setDataFilter({ ...dataFilter, page: page });
  }

  const handleSearch = (e) => {
    setDataFilter({ ...dataFilter, keySearch: e.target.value });
  }

  const onChange = (pagination, filters, sorter) => {
    // Lấy các giá trị bộ lọc cho cột 'status'
    let status = '';
    if (filters.status && filters.status.length === 1) {
      status = filters.status[0];
    }
    // Cập nhật trạng thái dataFilter với thứ tự sắp xếp và bộ lọc
    setDataFilter({
      ...dataFilter,
      order: sorter.order ? (sorter.order === "descend" ? "desc" : "asc") : null,
      column: sorter.field ? sorter.field : null,
      status: status, // Thêm bộ lọc trạng thái vào trạng thái dataFilter
    });
  };


  const handleShowConfirmUpdateStatus = (employee) => {
    let employeeSelect = _.cloneDeep(employee)
    setEmployee(employeeSelect)
    dispatch(setVisibleModalUpdateStatusEmployee(true))
  }

  const handleUpdateEmployeeStatus = () => {
    dispatch(updateEmployeeStatus(employee._id, employee.status));
  }

  return (
    <MainLayout>
      <div className={styles.userManagementWrap}>
        <div className={styles.mainWrap}>
          <div className={styles.headerMainWrap}>
            <span
              className={styles.title}>Total records ({paginationListEmployee.totalRecord})</span>
            {/* <div className={styles.btnWrap}>
              <ButtonMASQ
                onClick={() => handleCreate()}
                style={{
                  minWidth: "80px",
                  margin: "0",
                  border: "none",
                  padding: "8px 12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                textBtn={'+ Create'}>
              </ButtonMASQ>
            </div> */}
          </div>

          <div className={styles.boxFilterWrap}>
            <div className={styles.inputWrap}>
              <InputMASQ
                placeholder="Search by name, email or phone"
                value={dataFilter.keySearch}
                onChange={(e) => handleSearch(e)}
              />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path
                    d="M11.78 9.97 9.75 7.94c.473-.788.75-1.707.75-2.69A5.256 5.256 0 0 0 5.25 0 5.256 5.256 0 0 0 0 5.25a5.256 5.256 0 0 0 5.25 5.25c.984 0 1.902-.277 2.69-.75l2.03 2.03a.748.748 0 0 0 1.06 0l.75-.75a.749.749 0 0 0 0-1.06ZM5.25 9a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5Z"
                    fill="#3D4667" />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h12v12H0z" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className={styles.btnWrap}>
              <ButtonMASQ
                onClick={() => handleCreate()}
                style={{
                  minWidth: "80px",
                  margin: "0",
                  border: "none",
                  padding: "8px 12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                textBtn={'+ Create'}>
              </ButtonMASQ>
            </div>
            {/* <BtnFilter
              content={
                <Filter
                  statusUser={dataFilter.status}
                  onChangeStatus={handleChangeStatus}
                />
              }
            /> */}
          </div>

          <TableCustom
            loading={isLoadingTableEmployee}
            columns={columns}
            dataSource={employees}
            rowKey={(record) => record._id}
            pagination={paginationListEmployee}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
          />
        </div>

        <CreateOrUpdate
          employee={employee}
          configModal={configModal}
        />

        <ModalConfirm
          isModalOpen={visibleModalDeleteEmployee}
          title={`Do you want delete ${employee.name}?`}
          textBtnConfirm="Delete"
          description={`Are you sure you want to delete ${employee.name}? Your action can not be undone.`}
          onClose={() => dispatch(setVisibleModalDeleteEmployee(false))}
          onConfirm={() => handleConfirmDeleteEmployee()}
        />

        <ModalConfirm
          isModalOpen={visibleModalUpdateStatusEmployee}
          title={`Change status of ${employee?.name}?`}
          description={`Are you sure you want to ${employee.status === 'active' ? 'deactivate' : 'activate'} ${employee?.name}?`}
          onClose={() => dispatch(setVisibleModalUpdateStatusEmployee(false))}
          onConfirm={() => handleUpdateEmployeeStatus()}
        />
      </div>
    </MainLayout>
  );
}

export default Employee;
