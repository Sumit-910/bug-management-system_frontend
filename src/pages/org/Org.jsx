import './org.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import MemberForm from '../../components/forms/memberForm/MemberForm';
import Modal from '../../components/modal/Modal';
import List from '../../components/listItems/List';
import proFields from '../../assets/formFields/project';
import CreateForm from '../../components/forms/createForm/CreateForm';
import { server } from '../../assets/constants';

const initialUsers = [
  { id: 1, name: 'User One' },
  { id: 2, name: 'User Two' },
  { id: 3, name: 'User Three' },
  { id: 4, name: 'User Four' },
];

// const projectList = [
//   {
//     _id: 1,
//     name: "p1",
//     owner: "hehe"
//   },
//   {
//     _id: 2,
//     name: "p2",
//     owner: "haha"
//   },
//   {
//     _id: 3,
//     name: "p3",
//     owner: "hihi"
//   },
// ]

const Org = () => {
  const userToken = useSelector((state) => state.user.accessToken);
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const { orgName } = useParams();
  const location = useLocation();
  const orgId = location.state?.id;
  // console.log("orgId " + orgId);
  

  if (location.state?.orgN !== orgName) navigate("/notFound");

  const [createModal, setCreateModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const [orgData, setOrgData] = useState(null);
  const [availableUsers, setAvailableUsers] = useState(initialUsers);
  const [activeTab, setActiveTab] = useState('projects');
  const [projectList, setProjectList] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`, // Send Bearer token as userId
    },
  };

  useEffect(() => {
    const fetchOrgData = async () => {
      const url = server + '/org/singleOrg';
      try {
        const response = await axios.post(url, { orgId: orgId }, config);
        console.log(response.data);
        
        setOrgData(response.data);
        toast.success("Organization data loaded");
      } catch (err) {
        toast.error('Error fetching organization data');
      }
    };
  
    fetchOrgData();
  }, []);


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

  const handleProject = (formData) => {
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

        {
          userId === "admin" && (
            <div className="addmember">
              <button onClick={() => setAddModal(true)}>Add Members</button>
              <Modal isOpen={addModal} isClose={setAddModal}>
                <MemberForm onSubmit={handleAddMembers} users={availableUsers} />
              </Modal>
            </div>
          )
        }

        <div className="lower">
          {
            userId === "admin" && (
              <>
                <button onClick={() => setCreateModal(true)}>Create Project</button>
                <Modal isOpen={createModal} isClose={setCreateModal}>
                  <CreateForm fields={proFields} onSubmit={handleProject} buttonText="Create Project" />
                </Modal>
              </>
            )
          }
          <div className="projectList">
            <List data={projectList} onRowClick={handleProjectClick} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Org;
