import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    haulingCompany: '',
    bookinNumber: '',
    customerName: '',
    containerNumber: '',
  });
  const [response, setResponse] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    haulingCompany: '',
    bookinNumber: '',
    customerName: '',
    containerNumber: '',
  });
  const [isNext, setIsNext] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const changeStep = () => {
    setIsNext(!isNext);
  };

  const onNextStep = () => {
    setIsValidate(true);
    if (
      state.firstName &&
      state.lastName &&
      state.phoneNumber &&
      state.haulingCompany
    ) {
      changeStep();

      setIsValidate(false);
    }
  };

  const submitForm = () => {
    setIsValidate(true);
    if (state.bookinNumber && state.customerName && state.containerNumber) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${state.firstName} ${state.lastName}`,
          phoneNumber: state.phoneNumber,
          company: state.haulingCompany,
          loadNumber: state.bookinNumber,
          customerName: state.customerName,
          containerNumber: state.containerNumber,
        }),
      };
      fetch('http://localhost:3000/api/navtrac', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setResponse({ ...data.data });
          setIsSuccess(true);
        });
    }
  };

  const resetStates = () => {
    setIsNext(false);
    setIsValidate(false);
    setIsSuccess(false);
    setState({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      haulingCompany: '',
      bookinNumber: '',
      customerName: '',
      containerNumber: '',
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        {isSuccess && (
          <div className='absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-opacity-50 bg-slate-800'>
            <div className='px-16 bg-white rounded-md py-14 '>
              <h1 className='mb-4 text-xl font-bold text-slate-500'>
                Following information is submitted
              </h1>
              <ul className='list-disc'>
                <li>
                  <b>Name:</b> {response.name || ''}
                </li>
                <li>
                  <b>Phone Number:</b> {response.phoneNumber || ''}
                </li>
                <li>
                  <b>Hauling Company:</b> {response.company || ''}
                </li>
                <li>
                  <b>Bookin Number:</b> {response.loadNumber || ''}
                </li>
                <li>
                  <b>Customer Name:</b> {response.customerName || ''}
                </li>
                <li>
                  <b>Container Number:</b> {response.containerNumber || ''}
                </li>
              </ul>
              <button
                class='bg-teal-600 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold float-right mt-3'
                onClick={resetStates}
              >
                Ok
              </button>
            </div>
          </div>
        )}
        <div className='p-5'>
          <div className='p-4 mx-4'>
            <div className='flex items-center'>
              <div className={`flex items-center  text-teal-600  relative`}>
                <div
                  className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600`}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='100%'
                    height='100%'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-bookmark '
                  >
                    <path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'></path>
                  </svg>
                </div>
                <div
                  className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600`}
                >
                  Personal
                </div>
              </div>
              <div
                className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                  isNext ? 'border-teal-600' : 'border-gray-300'
                }`}
              ></div>

              <div
                className={`flex items-center ${
                  isNext ? 'text-teal-600' : 'text-gray-500'
                } relative`}
              >
                <div
                  className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
                    isNext ? 'border-teal-600' : 'border-gray-300'
                  }`}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='100%'
                    height='100%'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-database '
                  >
                    <ellipse cx='12' cy='5' rx='9' ry='3'></ellipse>
                    <path d='M21 12c0 1.66-4 3-9 3s-9-1.34-9-3'></path>
                    <path d='M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5'></path>
                  </svg>
                </div>
                <div
                  className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
                    isNext ? 'text-teal-600' : 'text-gray-500'
                  }`}
                >
                  Hauling Information
                </div>
              </div>
            </div>
          </div>
          <div className='p-4 mt-8'>
            {!isNext ? (
              <div>
                <div className='h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase'>
                  Name
                </div>
                <div className='flex flex-col md:flex-row'>
                  <div className='flex-1 w-full mx-2 svelte-1l8159u'>
                    <div className='flex p-1 my-2 bg-white border border-gray-200 rounded svelte-1l8159u'>
                      <input
                        placeholder='First Name'
                        className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                        value={state.firstName}
                        onChange={(e) =>
                          setState({ ...state, firstName: e.target.value })
                        }
                      />{' '}
                    </div>
                    {!state.firstName && isValidate && (
                      <p class='text-red-500 text-xs italic'>
                        Please fill out this field.
                      </p>
                    )}
                  </div>
                  <div className='flex-1 w-full mx-2 svelte-1l8159u'>
                    <div className='flex p-1 my-2 bg-white border border-gray-200 rounded svelte-1l8159u'>
                      <input
                        placeholder='Last Name'
                        className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                        value={state.lastName}
                        onChange={(e) =>
                          setState({ ...state, lastName: e.target.value })
                        }
                      />{' '}
                    </div>
                    {!state.lastName && isValidate && (
                      <p class='text-red-500 text-xs italic'>
                        Please fill out this field.
                      </p>
                    )}
                  </div>
                </div>
                <div className='flex flex-col md:flex-row'>
                  <div className='flex-1 w-full mx-2 svelte-1l8159u'>
                    <div className='h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase'>
                      {' '}
                      Phone Number
                    </div>
                    <div className='flex p-1 my-2 bg-white border border-gray-200 rounded svelte-1l8159u'>
                      <input
                        placeholder='Phone Number'
                        className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                        value={state.phoneNumber}
                        type='number'
                        onChange={(e) =>
                          setState({ ...state, phoneNumber: e.target.value })
                        }
                      />{' '}
                    </div>
                    {!state.phoneNumber && isValidate && (
                      <p class='text-red-500 text-xs italic'>
                        Please fill out this field.
                      </p>
                    )}
                  </div>
                </div>

                <div className='flex flex-col md:flex-row'>
                  <div className='flex-1 w-full mx-2 svelte-1l8159u'>
                    <div className='h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase'>
                      {' '}
                      Hauling Company
                    </div>
                    <div className='flex p-1 my-2 bg-white border border-gray-200 rounded svelte-1l8159u'>
                      <input
                        placeholder='Hauling Company'
                        className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                        value={state.haulingCompany}
                        onChange={(e) =>
                          setState({ ...state, haulingCompany: e.target.value })
                        }
                      />{' '}
                    </div>
                    {!state.haulingCompany && isValidate && (
                      <p class='text-red-500 text-xs italic'>
                        Please fill out this field.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className='h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase'>
                  Load/Booking Number
                </div>
                <div className='flex flex-col md:flex-row'>
                  <div className='flex-1 w-full mx-2 svelte-1l8159u'>
                    <div className='flex p-1 my-2 bg-white border border-gray-200 rounded svelte-1l8159u'>
                      <input
                        placeholder='Load/Booking Number'
                        className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                        value={state.bookinNumber}
                        type='number'
                        onChange={(e) =>
                          setState({ ...state, bookinNumber: e.target.value })
                        }
                      />{' '}
                    </div>
                    {!state.bookinNumber && isValidate && (
                      <p class='text-red-500 text-xs italic'>
                        Please fill out this field.
                      </p>
                    )}
                  </div>
                </div>
                <div className='flex flex-col md:flex-row'>
                  <div className='flex-1 w-full mx-2 svelte-1l8159u'>
                    <div className='h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase'>
                      {' '}
                      Customer Name
                    </div>
                    <div className='flex p-1 my-2 bg-white border border-gray-200 rounded svelte-1l8159u'>
                      <input
                        placeholder='Customer Name'
                        className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                        value={state.customerName}
                        onChange={(e) =>
                          setState({ ...state, customerName: e.target.value })
                        }
                      />{' '}
                    </div>
                    {!state.customerName && isValidate && (
                      <p class='text-red-500 text-xs italic'>
                        Please fill out this field.
                      </p>
                    )}
                  </div>
                  <div className='flex-1 w-full mx-2 svelte-1l8159u'>
                    <div className='h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase'>
                      {' '}
                      Container Number
                    </div>
                    <div className='flex p-1 my-2 bg-white border border-gray-200 rounded svelte-1l8159u'>
                      <input
                        placeholder='Container Number'
                        className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                        value={state.containerNumber}
                        type='number'
                        onChange={(e) =>
                          setState({
                            ...state,
                            containerNumber: e.target.value,
                          })
                        }
                      />{' '}
                    </div>
                    {!state.containerNumber && isValidate && (
                      <p class='text-red-500 text-xs italic'>
                        Please fill out this field.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className='flex p-2 mt-4'>
              {isNext && (
                <button
                  className='flex justify-center px-4 py-2 text-base font-bold text-gray-700 transition duration-200 ease-in-out bg-gray-100 border border-gray-600 rounded cursor-pointer hover:scale-110 focus:outline-none hover:bg-gray-200'
                  onClick={changeStep}
                >
                  Previous
                </button>
              )}
              <div className='flex flex-row-reverse flex-auto'>
                {!isNext && (
                  <button
                    className='flex justify-center px-4 py-2 ml-2 text-base font-bold text-teal-100 transition duration-200 ease-in-out bg-teal-600 border border-teal-600 rounded cursor-pointer hover:scale-110 focus:outline-none hover:bg-teal-600'
                    onClick={onNextStep}
                  >
                    Next
                  </button>
                )}

                {isNext && (
                  <button
                    className='flex justify-center px-4 py-2 ml-2 text-base font-bold text-teal-100 transition duration-200 ease-in-out bg-teal-600 border border-teal-600 rounded cursor-pointer hover:scale-110 focus:outline-none hover:bg-teal-600'
                    onClick={submitForm}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
