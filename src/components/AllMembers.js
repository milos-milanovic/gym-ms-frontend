import React, { useState, useEffect } from 'react';

import MainTable from './MainTable';
import Empty from './Empty';
import { fetchAllMembers } from '../client';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;
const spinStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default function AllMembers() {
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState(JSON.parse(sessionStorage.getItem('members')));

  useEffect(() => {
    if (!members) {
      getMembers();
    }
  }, [members]);

  const getMembers = () => {
    setIsLoading(true);

    fetchAllMembers()
      .then((res) => {
        setIsLoading(false);
        setMembers(res.data);
        sessionStorage.setItem('members', JSON.stringify(res.data));
      })
      .catch(() => {
        setIsLoading(false);
        setMembers(null);
      });
  };

  if (isLoading) {
    return <Spin indicator={antIcon} style={spinStyle} />;
  }

  if (members) {
    return <MainTable data={members} refresh={getMembers} />;
  }

  // if error
  return <Empty tryAgain={getMembers} />;
}
