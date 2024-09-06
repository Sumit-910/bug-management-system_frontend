import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import './bug.css'
import Modal from '../../components/modal/Modal';
import MemberForm from '../../components/forms/memberForm/MemberForm';
import List from '../../components/listItems/List';

const initialUsers = [
  { id: 1, name: 'User One' },
  { id: 2, name: 'User Two' },
  { id: 3, name: 'User Three' },
  { id: 4, name: 'User Four' },
];

const Bug = () => {
  const navigate = useNavigate(); 
  const { orgName, proName, bugName } = useParams();
  const location = useLocation();
  const bugId = location.state?.id;

  if(orgName !== location.state?.orgN || proName !== location.state?.proN || bugName !== location.state?.bugN)navigate('/notFound');

  const [addModal, setAddModal] = useState(false);

  const [bugData, setBugData] = useState(null);
  const [availableUsers, setAvailableUsers] = useState(initialUsers);

  useEffect(() => {
    const fetchOrgData = async () => {
      try {
        setBugData({ owner: 'me' });
        toast.success("hehe");
      } catch (err) {
        toast.error('Error fetching organization data');
      }
    };

    fetchOrgData();
  }, [bugId]);

  const handleAddMembers = (selectedUserIds) => {
    const selectedUsers = availableUsers.filter(user => selectedUserIds.includes(user.id));

    setAvailableUsers(prevUsers => prevUsers.filter(user => !selectedUserIds.includes(user.id)));
    console.log(selectedUsers);

    toast.success('Members added successfully');
  };

  const handleRemoveMember = (userId) => {
    setAvailableUsers(prevUsers => [...prevUsers, initialUsers.find(user => user.id === userId)]);
    toast.success('Member removed successfully');
  };


  return (
    <>
      <div className="mainContainer">
        <div>
          <h2>bug Details</h2>
          {bugData ? (
            <div>
              <p><strong>Name:</strong> {bugName}</p>
            </div>
          ) : (
            <div>No organization data found</div>
          )}
        </div>

        

        {bugData?.owner === 'me' && (
            <div className="memberSection">
              <button onClick={() => setAddModal(true)}>Assign Members</button>
              <Modal isOpen={addModal} isClose={setAddModal}>
                <MemberForm onSubmit={handleAddMembers} users={availableUsers} />
              </Modal>
              <div className="memberList">
                <List
                  data={initialUsers}
                  onRowClick={handleRemoveMember}
                />
              </div>
            </div>
          )}
      </div>
    </>
  )
}

export default Bug
