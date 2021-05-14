import React, { useState, useRef } from 'react';
import { Input, Button, Radio, Modal, Popover, Tag, Row, Col } from 'antd';
import { Formik } from 'formik';
import { fetchMemberByEmail, redeemGiftCodeToMemberId, fetchMemberById } from '../../client';
import { errorNotification, successNotification } from '../../notifications';

const Redeem = () => {
  const [memberData, setMemberData] = useState();
  const codeRef = useRef();
  const [identifyBy, setIdentifyBy] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleModalOk = () => {
    setConfirmLoading(true);

    redeemGiftCodeToMemberId(codeRef.current, memberData.id)
      .then((res) => {
        setModalVisible(false);
        setConfirmLoading(false);
        successNotification('Success', '');
      })
      .catch((error) => {
        setModalVisible(false);
        setConfirmLoading(false);
        errorNotification(error.response.data.message, '');
      });

    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <div>
      {/* ---------- Form ---------- */}
      <>
        <Formik
          initialValues={{ code: '', identificationInput: '' }}
          validate={(values) => {
            const errors = {};

            // this error wont be displayed but will prevent the form from being submitted
            // for: empty values
            if (!values.code || !values.identificationInput) {
              errors.notVisibleError = '';
            }

            // if gift code consist of other than numbers
            if (values.code && !/^\d+$/.test(values.code)) {
              errors.code = <Tag color='red'>Gift code consists of numbers only</Tag>;
            }

            // if `email` is selected
            if (
              identifyBy === 'email' &&
              values.identificationInput &&
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.identificationInput)
            ) {
              errors.identificationInput = <Tag color='red'>E-mail not valid</Tag>;
            }
            // if `id` is selected
            else if (
              identifyBy === 'id' &&
              values.identificationInput &&
              !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(values.identificationInput)
            ) {
              errors.identificationInput = <Tag color='red'>Member ID not valid</Tag>;
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            if (identifyBy === 'email') {
              fetchMemberByEmail(values.identificationInput)
                .then((res) => {
                  codeRef.current = values.code;
                  setMemberData(res.data);
                  setModalVisible(true);
                })
                .catch((error) => errorNotification(error.message, 'Check identification then try again'));
            } else if (identifyBy === 'id') {
              fetchMemberById(values.identificationInput)
                .then((res) => {
                  codeRef.current = values.code;
                  setMemberData(res.data);
                  setModalVisible(true);
                })
                .catch((error) => errorNotification(error.message, 'Check identification then try again'));
            } else {
              errorNotification('An unexpected error occurred', '');
            }

            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, submitForm, isSubmitting, isValid }) => (
            <Row justify='center'>
              <Col span={24}>
                <h1 style={{ textAlign: 'center' }}>Reedem gift code</h1>
              </Col>
              <Col sm={20} md={15} lg={10} xl={8} xxl={6}>
                <form onSubmit={handleSubmit}>
                  <label>Code</label>
                  <Input type='text' name='code' onChange={handleChange} onBlur={handleBlur} value={values.code} placeholder='Code' allowClear />
                  {errors.code && touched.code && errors.code}

                  <br />
                  <br />

                  <label>Identify member by</label>
                  <Radio.Group onChange={(e) => setIdentifyBy(e.target.value)} buttonStyle='solid' style={{ display: 'block' }}>
                    <Radio.Button value='id' style={{ minWidth: '25%' }}>
                      ID
                    </Radio.Button>
                    <Radio.Button value='email' style={{ minWidth: '25%' }}>
                      E-mail
                    </Radio.Button>
                  </Radio.Group>

                  <br />

                  <label>Identification</label>
                  <Input
                    type='text'
                    name='identificationInput'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.identification}
                    placeholder='ID or Email'
                    disabled={!identifyBy}
                    allowClear
                  />
                  {errors.identificationInput && touched.identificationInput && errors.identificationInput}

                  <br />
                  <br />
                  <Button type='submit' onClick={submitForm} disabled={!touched.code || isSubmitting || !isValid}>
                    Apply
                  </Button>
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
          title='Code will be applied to'
          onCancel={handleModalCancel}
          onOk={handleModalOk}
          confirmLoading={confirmLoading}
        >
          <MemberData data={memberData} />
        </Modal>
      </>
    </div>
  );
};

const infoColStyle = { float: 'right', fontWeight: 'bold' };

const MemberData = ({ data }) => {
  return (
    <div>
      <Row gutter={[16, 5]}>
        <Col span={12}>
          <p style={infoColStyle}>ID:</p>
        </Col>
        <Col span={12}>
          <Popover content={data.id} title='Full ID' trigger='click'>
            <Button type='dashed' style={{ fontFamily: 'consolas' }}>
              {data.id.substring(0, 8)}
            </Button>
          </Popover>
        </Col>

        <Col span={12}>
          <p style={infoColStyle}>Name:</p>
        </Col>
        <Col span={12}>{data.name}</Col>

        <Col span={12}>
          <p style={infoColStyle}>Gender:</p>
        </Col>
        <Col span={12}>{data.gender}</Col>

        <Col span={12}>
          <p style={infoColStyle}>E-mail:</p>
        </Col>
        <Col span={12}>{data.email}</Col>

        <Col span={12}>
          <p style={infoColStyle}>Date of birth:</p>
        </Col>
        <Col span={12}>{data.dateOfBirth}</Col>

        <Col span={12}>
          <p style={infoColStyle}>Phone:</p>
        </Col>
        <Col span={12}>{data.phone}</Col>

        <Col span={12}>
          <p style={infoColStyle}>Expires:</p>
        </Col>
        <Col span={12}>{data.expires}</Col>
      </Row>
    </div>
  );
};

export default Redeem;
