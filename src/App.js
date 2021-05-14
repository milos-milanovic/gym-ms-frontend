import React, { useState, useEffect } from 'react';

import MainLayout from './components/MainLayout';

import Empty from './components/Empty';
import { fetchAllMembers } from './client';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';

const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;
const spinStyle = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' };

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState(null);

  const getMembers = () => {
    setIsLoading(true);

    fetchAllMembers()
      .then((res) =>
        res.json().then((members) => {
          setIsLoading(false);
          setMembers(members);
        })
      )
      .catch((error) => {
        setIsLoading(false);
        setMembers(null);
      });
  };

  useEffect(() => {
    getMembers();
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <Spin indicator={antIcon} style={spinStyle} />
      </MainLayout>
    );
  }

  if (members) {
    return <MainLayout />;
  }

  // if error
  return (
    <MainLayout>
      <Empty tryAgain={getMembers} />
    </MainLayout>
  );
}

export default App;
