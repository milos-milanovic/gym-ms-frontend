import React, { useState, useRef } from 'react';
import { Button, Modal, Input, Tooltip, Spin } from 'antd';
import { ExclamationCircleOutlined, MailOutlined, LoadingOutlined } from '@ant-design/icons';

import { generateGiftCode } from '../../client';
import { errorNotification } from '../../notifications';

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const getGiftCodeExpirationDate = () => {
  const giftCodeDuration = 3;
  let currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + giftCodeDuration);
  return currentDate.toLocaleDateString('sr-RS');
};

export default function Generate() {
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const generatedCodeRef = useRef();

  const openConfirmModal = () => {
    setIsLoading(true);
    Modal.confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      content: 'The employee who generates the gift code will be associated with the code and that data will be stored to prevent abuse.',
      okText: 'Continue',
      cancelText: 'Cancel',
      onOk() {
        // if email is present
        if (emailInputRef.current.state.value && emailInputRef.current.state.value.trim()) {
          generateGiftCode(emailInputRef.current.state.value)
            .then((res) => {
              generatedCodeRef.current = res.data.code;
              displayGeneratedCode();
            })
            .catch((error) => {
              setIsLoading(false);
              errorNotification('Error', error.response.data.message);
            });
        } else {
          // else - no email input
          generateGiftCode()
            .then((res) => {
              generatedCodeRef.current = res.data.code;
              displayGeneratedCode();
            })
            .catch((error) => {
              setIsLoading(false);
              errorNotification('Error', error.response.data.message);
            });
        }
      },
      onCancel() {
        setIsLoading(false);
        emailInputRef.current.state.value = '';
      },
    });
  };

  const displayGeneratedCode = () => {
    Modal.info({
      title: 'Generated code info',
      content: (
        <p>
          <br />
          Code: {generatedCodeRef.current}
          <br />
          Expires: {getGiftCodeExpirationDate()}
        </p>
      ),
      okText: 'Close',
      onOk() {
        emailInputRef.current.state.value = '';
        setIsLoading(false);
      },
    });
  };

  return (
    <div style={{ height: '94vh', display: 'grid', placeItems: 'center' }}>
      <div>
        <Spin indicator={loadingIcon} spinning={isLoading}>
          <Tooltip title='Member e-mail address'>
            <Input
              ref={emailInputRef}
              size='large'
              placeholder='Enter member e-mail here (not required)'
              disabled={isLoading}
              prefix={<MailOutlined />}
              style={{ width: '25vw' }}
            />
          </Tooltip>

          <Button type='primary' size='large' onClick={openConfirmModal} disabled={isLoading}>
            Generate a gift code
          </Button>
        </Spin>
      </div>
    </div>
  );
}
