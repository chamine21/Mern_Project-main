import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

import Loader from '../components/Loader';
import Error from '../components/Error';

const AdminHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const columns = [
    {
      title: 'Hotel_id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Website', dataIndex: 'website', key: 'website' },
    { title: 'Rating', dataIndex: 'rating', key: 'rating' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          {/* Edit button */}
          {/* <Button to={`/edit/${record._id}`}>edit</Button> */}
          <Link to={`/edit/${record._id}`}>Edit</Link>
          {/* Delete button */}
          <Button onClick={() => deleteHotel(record._id)}>Delete</Button>
        </span>
      ),
    },
  ];

  // delete function
  const deleteHotel = (id) => {
    axios
      .delete(`http://localhost:8000/api/hotels/${id}`)
      .then((res) => {
        setHotels(hotels.filter((hotel) => hotel._id !== id));
      })
      .catch((err) => {
        console.log('❌❌❌ Something Went Wrong', err);
      });
  };

  async function fetchMyData() {
    setError('');
    setLoading(true);
    try {
      const data = (await axios.get('/api/hotels')).data;
      setHotels(data);
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
        <>
          <div className='col md-12'>
            <button className='btn btn-success' onClick={fetchMyData} style={{marginBottom:"20px"}}>
              Refresh
            </button>
          </div>
          <div className='col-md-12'>
            <Table columns={columns} dataSource={hotels} />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHotel;
