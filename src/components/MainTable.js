import React, { useState } from 'react';
import { Table, Button, Popover, Modal, Tag } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import EditMemberForm from './EditMemberForm';
import { errorNotification, successNotification } from '../notifications';

const MainTable = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMemberData, setModalMemberData] = useState({});

  const columns = [
    {
      title: 'ID',
      key: 'id',
      render: (value, row, index) => (
        <Popover content={row.id} title='Full ID' trigger='click'>
          <Button type='dashed' style={{ fontFamily: 'consolas' }}>
            {row.id.substring(0, 8)}
          </Button>
        </Popover>
      ),
    },
    {
      title: 'Name', // full name
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'E-mail',
      key: 'email',
      render: (value, row, index) => {
        return row.email || <Tag color='cyan'>No email</Tag>;
      },
    },
    {
      title: 'Date of birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
    },
    {
      title: 'Membership expires',
      dataIndex: 'expires',
      key: 'expires',
    },
    {
      title: 'Phone number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '',
      key: 'profile',
      render: (value, member, index) => (
        <Button
          type='primary'
          icon={<ProfileOutlined />}
          onClick={() => {
            showModal(member);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  const showModal = (member) => {
    setModalMemberData(member);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Modal title='Edit user' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <EditMemberForm
          data={modalMemberData}
          onSuccess={() => {
            // 1. close modal
            setIsModalVisible(false);
            // 2. success notification -- TODO: Implement "ShowEditForm" to be displayed instead
            successNotification('Success', 'Member data changed successfuly');
            // 3. refresh table data
            props.refresh && props.refresh();
          }}
          onFailure={(e) => {
            // error notification
            errorNotification('An error has occurred', 'Please, try again');
          }}
        />
      </Modal>

      <Table columns={columns} dataSource={props.data} rowKey='id' scroll={{ x: 'max-content' }} />
    </div>
  );
};

export default MainTable;
