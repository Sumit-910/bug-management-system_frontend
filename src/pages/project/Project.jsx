import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from '../../components/modal/Modal';
import MemberForm from '../../components/forms/memberForm/MemberForm';

const initialUsers = [
  { id: 1, name: 'User One' },
  { id: 2, name: 'User Two' },
  { id: 3, name: 'User Three' },
  { id: 4, name: 'User Four' },
];

const Project = () => {
  const { projectId } = useParams();
  const [proData, setProData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableUsers, setAvailableUsers] = useState(initialUsers);

  useEffect(() => {
    const fetchOrgData = async () => {
      try {
        // const response = await axios.get(`/api/organizations/${projectId}`);
        // setProData(response.data);
        setProData(1);
        toast.success("hehe");
      } catch (err) {
        toast.error('Error fetching organization data');
      }
    };

    fetchOrgData();
  }, [projectId]);

  const handleAddMembers = (selectedUserIds) => {
    const selectedUsers = availableUsers.filter(user => selectedUserIds.includes(user.id));

    setAvailableUsers(prevUsers => prevUsers.filter(user => !selectedUserIds.includes(user.id)));
    console.log(selectedUsers);
    
    toast.success('Members added successfully');
  };

  return (
    <>
      <div>
      <h2>Project Details</h2>
      {proData ? (
        <div>
          <p><strong>Name:</strong> {proData}</p>
        </div>
      ) : (
        <div>No organization data found</div>
      )}
    </div>

    <button onClick={() => setIsModalOpen(true)}>Add Members</button>
      <Modal isOpen={isModalOpen} isClose={setIsModalOpen}>
      <MemberForm onSubmit={handleAddMembers} users={availableUsers} />
      </Modal>
    </>
  )
}

export default Project
