import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Modal from '../../components/modal/Modal';
import MemberForm from '../../components/forms/memberForm/MemberForm';
import CreateForm from '../../components/forms/createForm/CreateForm';
import bugFields from '../../assets/formFields/bug';
import List from '../../components/listItems/List';

const initialUsers = [
  { id: 1, name: 'User One' },
  { id: 2, name: 'User Two' },
  { id: 3, name: 'User Three' },
  { id: 4, name: 'User Four' },
];

const Project = () => {
  const navigate = useNavigate();
  const { orgName, proName } = useParams();
  const location = useLocation();
  const projectId = location.state?.id;

  if (orgName !== location.state?.orgN || proName !== location.state?.proN) navigate('/notFound');

  const bugList = [];

  const [createModal, setCreateModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const [proData, setProData] = useState(null);
  const [availableUsers, setAvailableUsers] = useState(initialUsers);
  const [activeTab, setActiveTab] = useState('bugs');

  useEffect(() => {
    const fetchOrgData = async () => {
      try {
        setProData({ owner: 'me' });
        toast.success("project data loaded");
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

  const onSubmit = formData => {
    try {
      toast.success(formData.name + " bug Created");
    } catch (error) {
      toast.error(error);
    }
  }

  const handleBugClick = (bug) => {
    const formattedName = bug.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${orgName}/${proName}/${formattedName}`, { state: { id: bug._id, orgN: orgName, proN: proName, bugN: formattedName } });
  };

  const handleRemoveMember = (userId) => {
    setAvailableUsers(prevUsers => [...prevUsers, initialUsers.find(user => user.id === userId)]);
    toast.success('Member removed successfully');
  };

  const onEdit = () => {
    toast.success("row edited");
  }
  const onDelete = () => {
    toast.success("row deleted");
  }


  return (
    <>
      <div className="mainContainer">
        <div>
          <h2>Project Details</h2>
          {proData ? (
            <div>
              <p><strong>Name:</strong> {proName}</p>
            </div>
          ) : (
            <div>No project data found</div>
          )}
        </div>

        <div className="tabContainer">
          {proData?.owner === 'me' && (
            <nav className="tabs">
              <button
                className={activeTab === 'bugs' ? 'active' : ''}
                onClick={() => setActiveTab('bugs')}
              >
                Projects
              </button>
              <button
                className={activeTab === 'members' ? 'active' : ''}
                onClick={() => setActiveTab('members')}
              >
                Members
              </button>
            </nav>
          )}
        </div>

        <div className="tabContent">
          {activeTab === 'bugs' && (
            <div className="bugSection">
              <button onClick={() => setCreateModal(true)}>Create Bug</button>
              <Modal isOpen={createModal} isClose={setCreateModal}>
                <CreateForm fields={bugFields} onSubmit={onSubmit} buttonText="Create Project" />
              </Modal>
              <div className="bugList">
              <List data={bugList} onRowClick={handleBugClick} />
            </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="memberSection">
              <button onClick={() => setAddModal(true)}>Add Members</button>
              <Modal isOpen={addModal} isClose={setAddModal}>
                <MemberForm onSubmit={handleAddMembers} users={availableUsers} />
              </Modal>
              <div className="memberList">
                <List
                  data={initialUsers}
                  onRowClick={handleRemoveMember}
                  userRoles={["admin","projectLead"]}
                  requiredRole={"admin"}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Project
