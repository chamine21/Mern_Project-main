import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Tag, Space } from 'antd';

import Loader from '../components/Loader';
import Error from '../components/Error';

const AdminUser = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const columns = [
    { title: 'User_id', dataIndex: '_id', key: '_id' },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },

    {
      title: 'IsAdmin',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      render: (isAdmin) => (
        <>
          {isAdmin === true ? <Tag color='green'>YES</Tag> : <Tag color='red'>NO</Tag>}
        </>
      ),
    },
  ];

  async function fetchMyData() {
    setError('');
    setLoading(true);
    try {
      const data = (await axios.get('/getallusers')).data;
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchMyData();
  }, []);

  return (
    <div className='row'>
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className='col-md-12'>
          <Table columns={columns} dataSource={users} />
        </div>
      )}
    </div>
  );
};

export default AdminUser;
