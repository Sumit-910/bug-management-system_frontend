import './orgs.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../../components/modal/Modal';
import List from '../../components/listItems/List';
import orgFields from '../../assets/formFields/org';
import CreateForm from '../../components/forms/createForm/CreateForm';
// import { server } from '../../../assets/constants';

const orgList = [
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

const Orgs = () => {
  // const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = formData => {
    try {
      // const url = server + "";
      // const jsonData = fetch(url,formData);
      // const data = jsonData.parse();

      // if(data.status === 200){
      //     toast.success(data.msg);
      // }
      toast.success(formData.name + " Org Created");
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <>
      <div className="mainContainer">
        <div className="top_info">Hello User</div>
        <button onClick={() => setIsModalOpen(true)}>Create Organization</button>
        <Modal isOpen={isModalOpen} isClose={setIsModalOpen}>
          <CreateForm fields={orgFields} onSubmit={onSubmit} buttonText="Create Organisation" />
        </Modal>
        <div className="orgList">
          <List data={orgList} />
        </div>
      </div>
    </>
  )
}

export default Orgs
