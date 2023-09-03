import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Tag } from 'antd';

import Loader from '../components/Loader';
import Error from '../components/Error';

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const columns = [
    {
      title: 'Transactionid',
      dataIndex: 'transactionid',
      key: 'transactionid',
    },
    { title: 'Roomid', dataIndex: 'roomid', key: 'roomid' },
    { title: 'Room', dataIndex: 'room', key: 'room' },
    { title: 'Fromdate', dataIndex: 'fromdate', key: 'fromdate' },
    { title: 'Todate', dataIndex: 'todate', key: 'todate' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <>
          {status === 'booked' ? (
            <Tag color='green'>CONFIRMED</Tag>
          ) : (
            <Tag color='red'>CANCELLED</Tag>
          )}
        </>
      ),
    },
  ];

  async function fetchMyData() {
    setError('');
    setLoading(true);
    try {
      const data = (await axios.post('/api/bookings/getallbookings')).data;
      setBookings(data);
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
        <Loader />
      ) : error.length > 0 ? (
        <Error msg={error} />
      ) : (
        <div className='col-md-12'>
          <Table columns={columns} dataSource={bookings} />
        </div>
      )}
    </div>
  );
};

export default AdminBooking;
