import './orgs.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../../components/modal/Modal';
import List from '../../components/listItems/List';
import orgFields from '../../assets/formFields/org';
import CreateForm from '../../components/forms/createForm/CreateForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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

const Orgs = () => {
  const data=useSelector((state)=>{
    return state.orgs;
})
  // const dispatch=useDispatch();
  const navigate = useNavigate();
  const [createModal, setCreateModal] = useState(false);

  const onSubmit = formData => {
    try {
      toast.success(formData.name + " Org Created");
    } catch (error) {
      toast.error(error);
    }
  }

  const handleOrgClick = (org) => {
    const formattedName = org.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${formattedName}`, { state: { id: org._id } });
  };

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
        <div className="orgList">
          <List data={data} onRowClick={handleOrgClick} />
        </div>
      </div>
    </>
  )
}

export default Orgs
