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

const bugList = [
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

const Project = () => {
  const navigate = useNavigate();
  const { orgName, proName } = useParams();
  const location = useLocation();
  const projectId = location.state?.id;

  const [createModal, setCreateModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const [proData, setProData] = useState(null);
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

  const onSubmit = formData => {
    try {
      // const url = server + "";
      // const jsonData = fetch(url,formData);
      // const data = jsonData.parse();

      // if(data.status === 200){
      //     toast.success(data.msg);
      // }
      toast.success(formData.name + " bug Created");
    } catch (error) {
      toast.error(error);
    }
  }

  const handleBugClick = (bug) => {
    const formattedName = bug.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${orgName}/${proName}/${formattedName}`, { state: { id: bug._id } });
  };


  return (
    <>
      <div className="mainContainer">
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

        <div className="addmember">
          <button onClick={() => setAddModal(true)}>Add Members</button>
          <Modal isOpen={addModal} isClose={setAddModal}>
            <MemberForm onSubmit={handleAddMembers} users={availableUsers} />
          </Modal>
        </div>

        <div className="lower">
          <button onClick={() => setCreateModal(true)}>Create Bug</button>
          <Modal isOpen={createModal} isClose={setCreateModal}>
            <CreateForm fields={bugFields} onSubmit={onSubmit} buttonText="Create Bug" />
          </Modal>
          <div className="bugList">
            <List data={bugList} onRowClick={handleBugClick} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Project
