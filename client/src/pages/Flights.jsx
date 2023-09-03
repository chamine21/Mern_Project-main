import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture, faPlaneArrival, faCalendarDays, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import airports from '../Flights/airports.json';
import { useSelector } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';
import DropDownSearch from './DropDownSearch';
import SearchResult from './SearchResult';
import useFlightStore from '../Flights/zustand store/ZStore';

const Flights = () => {
  const token = useSelector((state) => state.accesstoken);
  const { addFlight } = useFlightStore();
  const [departureOption, setDepartureOption] = useState(null);
  const [arrivalOption, setArrivalOption] = useState(null);
  const [searchInputs, setSearchInputs] = useState({
    origin: null,
    destination: null,
    departure_date: '',
    adults: '1',
  });
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState(null);
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    if (departureOption) {
      setSearchInputs((prevValues) => ({ ...prevValues, origin: departureOption.value }));
    }
    if (arrivalOption) {
      setSearchInputs((prevValues) => ({ ...prevValues, destination: arrivalOption.value }));
    }
  }, [departureOption, arrivalOption]);

  const options = airports.map((item) => ({
    value: item.code,
    label: `${item.city} - ${item.code}`,
  }));

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setSearchInputs((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevValues) => ({ ...prevValues, [name]: '' }));
  };

  const verifyInputs = () => {
    let errors = {};
    if (!departureOption) {
      errors.departureOption = 'Please select your origin';
      console.log(errors.departureOption);
    }
    if (!arrivalOption) {
      errors.arrivalOption = 'Please select your destination';
      console.log(errors.arrivalOption);
    }
    if (!searchInputs.departure_date) {
      errors.departure_date = 'Please select flight date';
      console.log(errors.departure_date);
    }
    if (departureOption && arrivalOption && departureOption === arrivalOption) {
      errors.match = 'Match! Origin cannot be the same as destination.';
      console.log(errors.match);
    }
    return errors;
  };

  const handleSearchFlight = (event) => {
    setIsPending(true);
    event.preventDefault();
    const validated = verifyInputs();
    console.log(validated);
    console.log(searchInputs);
    if (Object.keys(validated).length === 0) {
      console.log('loading... ');
      const headers = {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      };
      axios
        .post('https://flight-search-api.onrender.com/flight/search', searchInputs, { headers })
        .then((response) => {
          console.log(response);
          let data = response.data.data;
          setSearchData(data);
          addFlight(data);
          localStorage.setItem('flight-data', JSON.stringify(data));
          setIsPending(false);
        })
        .catch((error) => {
          console.log(error);
          setIsPending(false);
        });
    } else {
      setIsPending(false);
      setErrors(validated);
      console.log('something happened');
    }
  };

  const setDepartureError = () => {
    console.log('clear departure error');
    // setErrors((prevValues)=>({...prevValues, departureOption:""}))
  };

  const setArrivalError = () => {
    setErrors((prevValues) => ({ ...prevValues, arrivalOption: '' }));
  };

  return (
    <>
      <div className='hidden md:flex md:flex-col md:items-center mt-3 bg-white'>
        <div className='md:w-3/4 flex flex-col rounded-lg shadow-xl md:h-auto pb-10 md:px-2 mt-10 border-2'>
          <div className='flex md:flex-row md:divide-x md:text-xs rounded md:border-2 md:w-fit md:mt-3 md:mx-3'>
            {/* {flightClass} */}
          </div>
          <div className='md:w-full'>
            <form onSubmit={handleSearchFlight} className='md:flex md:flex-row md:mt-4 md:gap-5 md:mx-2 md:w-[100%]'>
              <div className='md:w-[45%] md:flex md:flex-row md:divide-x-2 md:rounded-lg md:border-2'>
                <div
                  className={`md:w-[50%] md:flex md:flex-row md:divide-x md:py-4 md:items-center ${
                    errors && errors.departureOption && 'outline outline-red-300'
                  }`}
                >
                  <div className='md:flex md:flex-row md:justify-center md:items-center md:rounded-full md:bg-blue-950 md:w-7 md:h-6 md:mx-1'>
                    <FontAwesomeIcon className='text-white text-sm' icon={faPlaneDeparture} />
                  </div>
                  <div className='md:flex md:flex-col md:pl-1 md:w-full md:px-3'>
                    <small className='md:text-xs md:text-slate-400 md:font-medium md:mb-1'>Departure</small>
                    <div className={`md:w-full md:font-medium md:text-blue-950`}>
                      <DropDownSearch selectedOption={departureOption} setSelectedOption={setDepartureOption} options={options} setError={setDepartureError} />
                    </div>
                  </div>
                </div>
                <div
                  className={`md:w-[50%] md:flex md:flex-row md:divide-x md:pl-1 md:py-2 md:items-center ${
                    errors && errors.arrivalOption && 'outline outline-red-300'
                  }`}
                >
                  <div className='md:flex md:flex-row md:justify-center md:items-center md:rounded-full md:bg-blue-950 md:w-7 md:h-6 md:mx-1'>
                    <FontAwesomeIcon className='text-white text-sm' icon={faPlaneArrival} />
                  </div>
                  <div className='md:flex md:flex-col md:w-full md:px-1'>
                    <small className='md:text-xs md:text-slate-400 md:font-medium md:mb-1'>Arrival</small>
                    <div className={`md:w-full md:font-medium md:text-blue-950`}>
                      <DropDownSearch selectedOption={arrivalOption} setSelectedOption={setArrivalOption} options={options} setError={setArrivalError} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='md:w-[45%] md:flex md:flex-row md:divide-x-2 md:rounded-lg md:border-2'>
                <div
                  className={`md:w-[50%] md:flex md:flex-row md:divide-x md:py-2 md:items-center ${
                    errors && errors.departure_date && 'outline outline-red-300'
                  }`}
                >
                  <div className='md:flex md:flex-row md:justify-center md:items-center md:rounded-full md:bg-blue-950 md:w-6 md:h-6 md:mx-1'>
                    <FontAwesomeIcon className='text-white text-sm' icon={faCalendarDays} />
                  </div>
                  <div className='md:flex md:flex-col md:pl-1'>
                    <small className='md:text-sm md:font-medium md:text-slate-400'>Departure Date</small>
                    <p className='md:text-sm md:font-medium md:text-blue-950'>
                      <input
                        type='date'
                        name='departure_date'
                        value={searchInputs.departure_date}
                        onChange={onInputChange}
                      />
                    </p>
                  </div>
                </div>
                <div className='md:w-[50%] md:flex md:flex-row md:divide-x md:items-center md:mx-1 '>
                  <div className='md:flex md:flex-row md:justify-center md:items-center md:rounded-full md:bg-blue-950 md:w-6 md:h-6 md:mx-1'>
                    <FontAwesomeIcon className='text-white text-sm' icon={faShoePrints} rotation={270} />
                  </div>
                  <div className='md:w-full md:flex md:flex-col'>
                    <small className='md:text-sm md:mx-1 md:text-slate-400 md:font-medium'>Passengers</small>
                    <input
                      type='number'
                      name='adults'
                      value={searchInputs.adults}
                      onChange={onInputChange}
                      className='md:text-sm md:font-medium md:text-blue-950 md:mx-1 md:focus:outline-none'
                    />
                  </div>
                </div>
              </div>
              <div className='md:flex md:flex-row md:items-center md:w-[10%]'>
                <button
                  className={`md:bg-blue-950 md:w-full md:mr-2 md:font-bold md:text-slate-200 md:py-4 md:px-3 md:rounded-lg ${isPending && 'md:w-20 md:px-2'}`}
                  disabled={isPending}
                >
                  {!isPending ? <span>SEARCH</span> : <PulseLoader color='#ffffff' size={7} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='md:w-full md:flex md:flex-col md:items-center'>
        <SearchResult />
      </div>
      {/* Dynamic search data from server */}
    </>
  );
};

export default Flights;
