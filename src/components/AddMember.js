import React, { useRef } from 'react';
import { Formik, Form } from 'formik';
import { Input, Button, Select, Tag, Row, Col } from 'antd';
import { addNewMember } from '../client';
import { successNotification, errorNotification } from '../notifications';

const { Option } = Select;

export default function AddMemberForm() {
  const selectedGender = useRef('MALE');

  const inputStyle = { marginBottom: '15px' };

  return (
    <Formik
      initialValues={{
        name: '',
        gender: 'MALE',
        phone: '',
        email: '',
        dateOfBirth: '',
        expires: '',
      }}
      validate={(values) => {
        const errors = {};

        if (!values.name.trim()) {
          errors.name = <Tag color='red'>Required</Tag>;
        }

        if (!values.phone.trim()) {
          errors.phone = <Tag color='red'>Required</Tag>;
        } else if (!/^\+(?:[0-9] ?){6,14}[0-9]$/i.test(values.phone.trim())) {
          errors.phone = <Tag color='red'>Invalid phone number</Tag>;
        }

        // Since email is not required
        if (!values.email.trim()) {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = <Tag color='red'>Invalid email address</Tag>;
          }
        }

        if (!values.dateOfBirth) {
          errors.dateOfBirth = <Tag color='red'>Required</Tag>;
        }

        if (!values.expires) {
          errors.expires = <Tag color='red'>Required</Tag>;
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        let gender = selectedGender.current;
        addNewMember({ ...values, gender })
          .then(() => {
            sessionStorage.removeItem('members');
            successNotification(`${values.name} added successfuly!`, '');
          })
          .catch((error) => {
            errorNotification('An error occurred while adding the member', error.response.data.message);
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, submitForm, isValid }) => (
        <Row justify='center'>
          <Col xs={24} sm={20} md={18} lg={8}>
            <Form onSubmit={handleSubmit} style={{ padding: 15 }}>
              <div style={inputStyle}>
                <label>Full name:</label>
                <Input type='text' name='name' placeholder='Name' onChange={handleChange} onBlur={handleBlur} value={values.name} />
                {errors.name && touched.name && errors.name}
              </div>

              <div style={inputStyle}>
                <label>Gender:</label>
                <Select
                  style={{ display: 'block' }}
                  defaultValue={values.gender}
                  onChange={(e) => {
                    handleChange(e);
                    selectedGender.current = e;
                  }}
                  onBlur={handleBlur}
                >
                  <Option value='MALE'>Male</Option>
                  <Option value='FEMALE'>Female</Option>
                </Select>
              </div>

              <div style={inputStyle}>
                <label>Phone number:</label>
                <Input type='text' name='phone' placeholder='Phone number' onChange={handleChange} onBlur={handleBlur} value={values.phone} />
                {errors.phone && touched.phone && errors.phone}
              </div>

              <div style={inputStyle}>
                <label>E-mail:</label>
                <Input type='email' name='email' placeholder='E-mail' onChange={handleChange} onBlur={handleBlur} value={values.email} />
                {errors.email && touched.email && errors.email}
              </div>

              <div style={inputStyle}>
                <label>Date of birth:</label>
                <Input type='date' name='dateOfBirth' onChange={handleChange} onBlur={handleBlur} value={values.dateOfBirth} />
                {errors.dateOfBirth && touched.dateOfBirth && errors.dateOfBirth}
              </div>

              <div style={inputStyle}>
                <label>Membership expiration date:</label>
                <Input type='date' name='expires' onChange={handleChange} onBlur={handleBlur} value={values.expires} />
                {errors.expires && touched.expires && errors.expires}
              </div>

              <Button type='submit' onClick={submitForm} disabled={isSubmitting | (touched && !isValid)}>
                SAVE
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Formik>
  );
}
