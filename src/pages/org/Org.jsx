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
    name: "abc",
    owner: "def",
    _id: "login"
  },
  {
    name: "abc",
    owner: "def"
  },
  {
    name: "213",
    owner: "def",
    _id: "register"
  }
]


const Org = () => {
  const navigate = useNavigate();
  const { orgName } = useParams();
  const location = useLocation();
  const orgId = location.state?.id;

  const [createModal, setCreateModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const [orgData, setOrgData] = useState(null);
  const [availableUsers, setAvailableUsers] = useState(initialUsers);

  useEffect(() => {
    const fetchOrgData = async () => {
      try {
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


  const handleProjectClick = (project) => {
    const formattedName = project.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${orgName}/${formattedName}`, { state: { id: project._id } });
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
              <p><strong>Name:</strong> {orgData}</p>
            </div>
          ) : (
            <div>No organization data found</div>
          )}
        </div>

        <div className="addmember">
          <button onClick={() => setAddModal(true)}>Add Members</button>
          <Modal isOpen={addModal} isClose={setAddModal}>
            <MemberForm onSubmit={handleAddMembers} users={availableUsers} />
          </Modal>
        </div>

        <div className="lower">
          <button onClick={() => setCreateModal(true)}>Create Project</button>
          <Modal isOpen={createModal} isClose={setCreateModal}>
            <CreateForm fields={proFields} onSubmit={handleProject} buttonText="Create Project" />
          </Modal>
          <div className="projectList">
            <List data={projectList} onRowClick={handleProjectClick} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Org
