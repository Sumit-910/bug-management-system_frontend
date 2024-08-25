import { useState } from 'react'
import { toast } from 'react-toastify';
import Modal from '../../components/modal/Modal';
import List from '../../components/listItems/List';
import CreateForm from '../../components/forms/createForm/CreateForm';
import bugFields from '../../assets/formFields/bug';
// import { server } from '../../../assets/constants';

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



const Bugs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <div className="top_info">Hello Bug</div>
      <button onClick={() => setIsModalOpen(true)}>Create Bug</button>
      <Modal isOpen={isModalOpen} isClose={setIsModalOpen}>
        <CreateForm fields={bugFields} onSubmit={onSubmit} buttonText="Create Bug" />
      </Modal>
      <div className="bugList">
        <List data={bugList} />
      </div>
    </>
  )
}

export default Bugs
