import './orgs.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../../components/modal/Modal';
import List from '../../components/listItems/List';
import orgFields from '../../assets/formFields/org';
import CreateForm from '../../components/forms/createForm/CreateForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

<<<<<<< HEAD
// const orgList = [
//   {
//     name: "abc",
//     owner: "def",
//     _id: "1"
//   },
//   {
//     name: "abc",
//     owner: "def"
//   },
//   {
//     name: "213",
//     owner: "def",
//     _id: "2"
//   }
// ]
=======
const orgList = [
  {
    name: "org1",
    owner: "me",
    _id: "1"
  },
  {
    name: "org2",
    owner: "hehe",
    _id: "2"
  },
  {
    name: "org3",
    owner: "hihi",
    _id: "3"
  }
];
>>>>>>> 8b1ded89c3c18f507ead08e3863b952afad91477

const Orgs = () => {
  const data=useSelector((state)=>{
    return state.orgs;
})
  // const dispatch=useDispatch();
  const navigate = useNavigate();
  const [createModal, setCreateModal] = useState(false);
  const [filter, setFilter] = useState('all');

  const onSubmit = formData => {
    try {
      toast.success(formData.name + " Org Created");
    } catch (error) {
      toast.error(error);
    }
  }

  const handleOrgClick = (org) => {
    const formattedName = org.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${formattedName}`, { state: { id: org._id, orgN: formattedName } });
  };

  const filteredOrgList = orgList.filter(org => {
    if (filter === 'created') {
      return org.owner === "me";
    } else if (filter === 'joined') {
      // return org.owner !== user._id;
      return org.owner !== "me";
    }
    return true;
  });

  return (
    <>
      <div className="mainContainer">
        <div className="top_info">Hello User</div>
        <div className="middle">
          <button onClick={() => setCreateModal(true)}>Create Organization</button>
          <Modal isOpen={createModal} isClose={setCreateModal}>
            <CreateForm fields={orgFields} onSubmit={onSubmit} buttonText="Create Organisation" />
          </Modal>
        </div>
        <div className="filterDropdown">
            <label htmlFor="filter">Filter:</label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}  // Inline function
            >
              <option value="all">All</option>
              <option value="created">My Orgs</option>
              <option value="joined">Joined</option>
            </select>
          </div>
        <div className="orgList">
<<<<<<< HEAD
          <List data={data} onRowClick={handleOrgClick} />
=======
          <List data={filteredOrgList} onRowClick={handleOrgClick} />
>>>>>>> 8b1ded89c3c18f507ead08e3863b952afad91477
        </div>
      </div>
    </>
  )
}

export default Orgs
