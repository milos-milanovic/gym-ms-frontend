import React, { useState } from 'react';
import { Input, Button, Modal, Popover, Tag, Row, Col } from 'antd';
import { Formik } from 'formik';
import { checkGiftCode } from '../../client';
import { errorNotification, infoNotification } from '../../notifications';

const Check = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [giftCodeData, setGiftCodeData] = useState();

  return (
    <div>
      {/* ---------- Form ---------- */}
      <>
        <Formik
          initialValues={{ inputcode: '' }}
          validate={(values) => {
            const errors = {};
            if (values.inputcode && !/^\d+$/.test(values.inputcode)) {
              errors.inputcode = <Tag color='red'>Gift code consists of numbers only</Tag>;
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            if (!values.inputcode) {
              infoNotification('Input field is empty', 'Enter the code then try again');
            } else {
              checkGiftCode(values.inputcode)
                .then((res) => {
                  setGiftCodeData(res.data);
                  setModalVisible(true);
                })
                .catch((error) => errorNotification(error.response.data.message, 'Check gift code then try again'));
            }
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Row justify='center'>
              <Col span={24}>
                <h1 style={{ textAlign: 'center' }}>Check gift code</h1>
              </Col>
              <Col sm={24} md={16} lg={8}>
                <form onSubmit={handleSubmit}>
                  <Input.Search
                    type='text'
                    name='inputcode'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.inputcode}
                    placeholder='Enter the gift code here'
                    disabled={isSubmitting}
                    onSearch={handleSubmit}
                    allowClear
                    enterButton
                  />
                  {errors.inputcode && touched.inputcode && errors.inputcode}
                </form>
              </Col>
            </Row>
          )}
        </Formik>
      </>
      {/* ---------- Modal ---------- */}
      <>
        <Modal
          visible={modalVisible}
          title='Gift code info'
          footer={null}
          onCancel={() => {
            setModalVisible(false);
          }}
        >
          <GiftCodeInfo data={giftCodeData} />
        </Modal>
      </>
    </div>
  );
};

const infoColStyle = { float: 'right', fontWeight: 'bold' };
const infoRowStyle = { border: '1px solid lightgrey' };
const infoSectionLabelStyle = {
  textAlign: 'center',
  fontWeight: 'bold',
  border: '1px solid lightgrey',
  borderTop: 'none',
  borderRadius: '0 0 15px 15px',
  margin: '0 25%',
};

const GiftCodeInfo = ({ data }) => {
  return (
    <div>
      <Row gutter={[16, 5]}>
        {/* --- Code info --- */}
        <Col span={12}>
          <p style={infoColStyle}>Status:</p>
        </Col>
        <Col span={12}>{data.member ? <Tag color='red'>NOT VALID - USED</Tag> : <Tag color='green'>VALID</Tag>}</Col>

        <Col span={12}>
          <p style={infoColStyle}>Code:</p>
        </Col>
        <Col span={12}>
          <p>
            {'*'.repeat(data.code.length - 5)}
            {data.code.substring(data.code.length - 5, data.code.length)}
          </p>
        </Col>

        <Col span={12}>
          <p style={infoColStyle}>Expires:</p>
        </Col>
        <Col span={12}>
          <p>{new Date(data.codeExpires).toLocaleDateString('sr-RS')}</p>
        </Col>
      </Row>
      {/* --- Employee who genereted the code --- */}
      <Row style={infoRowStyle} gutter={[16, 5]}>
        <Col span={24}>
          <p style={infoSectionLabelStyle}>Generated by</p>
        </Col>
        <Col span={12}>
          <p style={infoColStyle}>ID:</p>
        </Col>
        <Col span={12}>
          <Popover content={data.employee.id} title='Full ID' trigger='click'>
            <Button type='dashed' style={{ fontFamily: 'consolas' }}>
              {data.employee.id.substring(0, 8)}
            </Button>
          </Popover>
        </Col>

        <Col span={12}>
          <p style={infoColStyle}>Name:</p>
        </Col>
        <Col span={12}>{data.employee.name}</Col>

        <Col span={12}>
          <p style={infoColStyle}>E-mail:</p>
        </Col>
        <Col span={12}>{data.employee.email}</Col>

        <Col span={12}>
          <p style={infoColStyle}>Phone:</p>
        </Col>
        <Col span={12}>{data.employee.phone}</Col>
      </Row>
      {/* --- If used display member --- */}
      {data.member && (
        <Row style={{ ...infoRowStyle, borderTop: 'none' }} gutter={[16, 5]}>
          <Col span={24}>
            <p style={infoSectionLabelStyle}>Applied to</p>
          </Col>
          <Col span={12}>
            <p style={infoColStyle}>ID:</p>
          </Col>
          <Col span={12}>
            <Popover content={data.member.id} title='Full ID' trigger='click'>
              <Button type='dashed' style={{ fontFamily: 'consolas' }}>
                {data.member.id.substring(0, 8)}
              </Button>
            </Popover>
          </Col>

          <Col span={12}>
            <p style={infoColStyle}>Name:</p>
          </Col>
          <Col span={12}>{data.member.name}</Col>

          <Col span={12}>
            <p style={infoColStyle}>E-mail:</p>
          </Col>
          <Col span={12}>{data.member.email}</Col>

          <Col span={12}>
            <p style={infoColStyle}>Phone:</p>
          </Col>
          <Col span={12}>{data.member.phone}</Col>
        </Row>
      )}
    </div>
  );
};

export default Check;