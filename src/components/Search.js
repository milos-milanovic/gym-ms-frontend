import React, { useState } from 'react';
import { Formik } from 'formik';
import { Input, Row, Col } from 'antd';

import MainTable from './MainTable';
import { searchMember } from '../client';
import { infoNotification, errorNotification } from '../notifications';

export default function Search() {
  const [searchResult, setSearchResult] = useState();

  return (
    <div>
      <Formik
        initialValues={{ searchQuery: '' }}
        onSubmit={(values, { setSubmitting }) => {
          if (!values.searchQuery.trim()) {
            infoNotification('Input field is empty', "Enter member's name, e-mail, phone number or full ID");
          } else {
            searchMember(values.searchQuery.trim())
              .then((res) => setSearchResult(res.data))
              .catch((error) => errorNotification(error.response.data.message, ''));
          }

          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <div style={{ display: 'grid', placeItems: 'center', height: '90vh' }}>
            <div style={{ width: '100%' }}>
              <Row justify='center'>
                <Col sm={24} md={18} lg={12} xl={10} xxl={8}>
                  <form onSubmit={handleSubmit}>
                    <Input.Search
                      type='text'
                      name='searchQuery'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.searchQuery}
                      disabled={isSubmitting}
                      onSearch={handleSubmit}
                      allowClear
                      enterButton
                    />
                    {errors.searchQuery && touched.searchQuery && errors.searchQuery}
                  </form>
                </Col>
              </Row>
              {searchResult && <MainTable data={searchResult} />}
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
