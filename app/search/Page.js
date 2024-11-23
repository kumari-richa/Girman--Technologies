
"use client";

import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaCity, FaPhoneAlt } from 'react-icons/fa';
import Image from 'next/image';

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setUsers(data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = users.filter((user) => {
        const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`
          .toLowerCase()
          .trim();
        const searchLower = searchTerm.toLowerCase().trim();

        return (
          fullName === searchLower ||
          user?.first_name?.toLowerCase() === searchLower ||
          user?.last_name?.toLowerCase() === searchLower
        );
      });
      setFilteredUsers(results);
    } else {
      setFilteredUsers([]);
    }
  }, [searchTerm, users]);

  const handleFetchDetails = (user) => {
    setSelectedUser(user);
  };

  const handleCloseDetails = () => {
    setSelectedUser(null);
  };

  return (
    <div>
      <nav className="bg-white text-black p-4 shadow-md border-b-2 border-gray-300">
        <div className="container mx-auto flex justify-between items-center">
         

          <div className="flex items-center ml-40">
            <Image src="/images/logo.jpg" alt="Logo" width={140} height={60} />
          </div>

         
          <div className="w-full max-w-md ml-10 text-black mx-10">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:hidden text-black">


          </div>
        </div>
      </nav>


      <div className="bg-gradient-to-b from-white to-blue-300 min-h-screen pt-6">

        
        
        <div className={`flex flex-col items-center justify-start p-6 ${selectedUser ? 'blur-sm' : ''}`}>
          <div className="w-full max-w-4xl flex flex-wrap justify-center gap-6 mt-6">
            {searchTerm ? (
              filteredUsers && filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user?.first_name}
                    className="border border-gray-300 rounded-lg p-6 bg-white shadow-lg flex flex-col justify-between w-80 h-80 relative"
                  >
                    <div className="flex-col my-4">
                      <Image
                        src="/images/u_logo.jpeg"
                        alt="Profile"
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div className="mt-2">
                        <h3 className="text-3xl font-semibold">
                          {user?.first_name} {user?.last_name}
                        </h3>
                      </div>
                      <div className="text-gray-500">
                        <FaCity className="mt-2" />
                        <p>{user?.city || 'N/A'}</p>
                        <hr className="my-2 border-gray-300" />
                      </div>
                      <div className="flex justify-between absolute bottom-4 left-4 right-4">
                        <FaPhoneAlt className="mr-0" />
                        <p className="text-black">
                          {user?.contact_number || 'N/A'}
                        </p>
                        <button
                          onClick={() => handleFetchDetails(user)}
                          className="bg-black text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
                        >
                          Fetch Details
                        </button>
                      </div>
                    </div>
                    <div className="my-6 text-gray-400">
                      <p>Available on phone</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center ">
                  <div className="text-center">
                    <Image
                      src="/images/no-data.png"
                      alt="No Data Background"
                      width={600}
                      height={500}
                    />
                  </div>
                </div>
              )
            ) : (
              <p className="text-lg text-gray-600">
                Please enter the name you want to search
              </p>
            )}
          </div>
        </div>



        {selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-white-400 bg-opacity-65 z-40">
            <div className="bg-white p-8 rounded-lg shadow-lg relative w-96">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                onClick={handleCloseDetails}
              >
                <FaTimes size={24} />
              </button>
              <div>
                <h1 className='text-2xl font-semibold'>Fetch Details</h1>
              </div>
              <div className='text-gray-400'>
                <p>Here are the details of the following employee.</p>
              </div>

              <div className='mt-3 font-semibold'>
                <p>Name: {selectedUser?.first_name} {selectedUser?.last_name} </p>
                <p>Location: {selectedUser?.city || 'N/A'}</p>
                <p>Contact Number: {selectedUser?.contact_number || 'N/A'}</p>
              </div>
                
              <div className='mt-3 font-semibold'>
                <p>Profile Image:</p>
              </div>

              <div className="text-center">
                <Image
                  src="/images/u_logo.jpeg"
                  alt="Profile"
                  width={200}
                  height={200}
                  className="rounded-lg mb-4"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
