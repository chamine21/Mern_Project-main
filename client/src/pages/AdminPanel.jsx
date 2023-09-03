import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import AdminBooking from './AdminBooking';
import AdminHotel from './AdminHotel';
import AdminUser from './AdminUser';
import AddHotelRoom from './AddHotelRoom';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const AdminPanel = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!user || user.isAdmin === false) {
      window.location.href = '/';
    }
  }, []);

  return (
    <div className='ml-3 mt-3 mr-3 profile'>
      <h1 className='text-center' id='color'>Admin Panel</h1>
      <Tabs defaultActiveKey='1' onChange={callback}>
        <TabPane tab='Bookings' key='1'>
          <AdminBooking></AdminBooking>
        </TabPane>
        <TabPane tab='Hotels' key='2'>
          <AdminHotel></AdminHotel>
        </TabPane>
        <TabPane tab='Add Hotel' key='3'>
          <AddHotelRoom></AddHotelRoom>
        </TabPane>
        <TabPane tab='Users' key='4'>
          <AdminUser></AdminUser>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
