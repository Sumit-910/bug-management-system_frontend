import './org.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import MemberForm from '../../components/forms/memberForm/MemberForm';
import Modal from '../../components/modal/Modal';
import List from '../../components/listItems/List';
import proFields from '../../assets/formFields/project';
import CreateForm from '../../components/forms/createForm/CreateForm';

const initialUsers = [
  { id: 1, name: 'User One' },
  { id: 2, name: 'User Two' },
  { id: 3, name: 'User Three' },
  { id: 4, name: 'User Four' },
];

const projectList = [
  {
    name: "pro1",
    owner: "me",
    _id: "1"
  },
  {
    name: "pro2",
    owner: "hihi",
    _id: "2"
  },
  {
    name: "pro3",
    owner: "haha",
    _id: "3"
  }
]

const Org = () => {
  const navigate = useNavigate();
  const { orgName } = useParams();
  const location = useLocation();
  const orgId = location.state?.id;

  if(location.state?.orgN !== orgName)navigate("/notFound");

  const [createModal, setCreateModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const [orgData, setOrgData] = useState(null);
  const [availableUsers, setAvailableUsers] = useState(initialUsers);
  const [activeTab, setActiveTab] = useState('projects');

  useEffect(() => {
    const fetchOrgData = async () => {
      try {
        setOrgData({ owner: 'me' }); // Assuming 'me' is the current user's ID
        toast.success("Organization data loaded");
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

  const handleRemoveMember = (userId) => {
    setAvailableUsers(prevUsers => [...prevUsers, initialUsers.find(user => user.id === userId)]);
    toast.success('Member removed successfully');
  };

  const handleProjectClick = (project) => {
    const formattedName = project.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${orgName}/${formattedName}`, { state: { id: project._id, orgN: orgName, proN: formattedName } });
  };

  const handleProject = formData => {
    try {
      toast.success(formData.name + " Project Created");
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <>
      <div className="mainContainer">
        <div>
          <h2>Organization Details</h2>
          {orgData ? (
            <div>
              <p><strong>Name:</strong> {orgName}</p>
            </div>
          ) : (
            <div>No organization data found</div>
          )}
        </div>

        <div className="tabContainer">
          {orgData?.owner === 'me' && (
            <nav className="tabs">
              <button
                className={activeTab === 'projects' ? 'active' : ''}
                onClick={() => setActiveTab('projects')}
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
          {activeTab === 'projects' && (
            <div className="projectSection">
              <button onClick={() => setCreateModal(true)}>Create Project</button>
              <Modal isOpen={createModal} isClose={setCreateModal}>
                <CreateForm fields={proFields} onSubmit={handleProject} buttonText="Create Project" />
              </Modal>
              <div className="projectList">
                <List data={projectList} onRowClick={handleProjectClick} />
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
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Org;
