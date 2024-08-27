import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// import axios from 'axios';

import MemberForm from '../../components/forms/memberForm/MemberForm';
import Modal from '../../components/modal/Modal';

const initialUsers = [
  { id: 1, name: 'User One' },
  { id: 2, name: 'User Two' },
  { id: 3, name: 'User Three' },
  { id: 4, name: 'User Four' },
];


const Org = () => {
  const { orgId } = useParams();
  const [orgData, setOrgData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableUsers, setAvailableUsers] = useState(initialUsers);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrgData = async () => {
      try {
        // const response = await axios.get(`/api/organizations/${orgId}`);
        // setOrgData(response.data);
        setOrgData(1);
        toast.success("hehe");
      } catch (err) {
        toast.error('Error fetching organization data');
      }
    };

    fetchOrgData();
  }, [orgId]);

  const handleAddMembers = (selectedUserIds) => {
    const selectedUsers = availableUsers.filter(user => selectedUserIds.includes(user.id));

    setAvailableUsers(prevUsers => prevUsers.filter(user => !selectedUserIds.includes(user.id)));
    console.log(selectedUsers);

    toast.success('Members added successfully');
  };


  return (
    <>
      <div className="mainContainer">
        <div>
          <h2>Organization Details</h2>
          {orgData ? (
            <div>
              <p><strong>Name:</strong> {orgData}</p>
            </div>
          ) : (
            <div>No organization data found</div>
          )}
        </div>

        <button onClick={() => setIsModalOpen(true)}>Add Members</button>
        <Modal isOpen={isModalOpen} isClose={setIsModalOpen}>
          <MemberForm onSubmit={handleAddMembers} users={availableUsers} />
        </Modal>
      </div>


    </>
  )
}

export default Org
