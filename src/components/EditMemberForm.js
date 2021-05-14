import React, { useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import { Input, Button, Select, Tag } from 'antd';
import { editMember } from '../client';

const { Option } = Select;

export default function EditMemberForm(props) {
  const { data } = props; // form is prepopulated using `data`

  const editMemberFormRef = useRef();
  const selectedGender = useRef();

  const inputStyle = { marginBottom: '15px' };

  useEffect(() => {
    editMemberFormRef.current.setValues(data);
  });

  return (
    <Formik
      innerRef={editMemberFormRef}
      initialValues={{
        name: data.name,
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        expires: data.expires,
      }}
      validate={(values) => {
        const errors = {};

        if (!values.name.trim()) {
          errors.name = <Tag color='red'>Required</Tag>;
        }

        if (!values.phone) {
          errors.phone = <Tag color='red'>Required</Tag>;
        } else if (!/^\+(?:[0-9] ?){6,14}[0-9]$/i.test(values.phone)) {
          errors.phone = <Tag color='red'>Invalid phone number</Tag>;
        }

        if (values.email) {
          // Since email is not required
          if (values.email.trim() !== '') {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = <Tag color='red'>Invalid email address</Tag>;
            }
          }
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        let gender = selectedGender.current;
        editMember({ ...values, gender })
          .then(() => {
            props.onSuccess();
          })
          .catch((error) => {
            props.onFailure(error.response.data.message);
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, submitForm, isValid }) => (
        <Form onSubmit={handleSubmit}>
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
          </div>

          <div style={inputStyle}>
            <label>Membership expiration date:</label>
            <Input type='date' name='expires' onChange={handleChange} onBlur={handleBlur} value={values.expires} />
          </div>

          <Button type='submit' onClick={submitForm} disabled={isSubmitting | (touched && !isValid)}>
            Apply
          </Button>
        </Form>
      )}
    </Formik>
  );
}
