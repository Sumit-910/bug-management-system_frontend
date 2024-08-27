import './projects.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../../components/modal/Modal';
import List from '../../components/listItems/List';
import proFields from '../../assets/formFields/project';
import CreateForm from '../../components/forms/createForm/CreateForm';
// import { server } from '../../../assets/constants';

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

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = formData => {
    try {
      // const url = server + "";
      // const jsonData = fetch(url,formData);
      // const data = jsonData.parse();

      // if(data.status === 200){
      //     toast.success(data.msg);
      // }
      toast.success(formData.name + " Project Created");
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <>
      <div className="mainContainer">
        <div className="top_info">Hello project</div>
        <button onClick={() => setIsModalOpen(true)}>Create Project</button>
        <Modal isOpen={isModalOpen} isClose={setIsModalOpen}>
          <CreateForm fields={proFields} onSubmit={onSubmit} buttonText="Create Project" />
        </Modal>
        <div className="projectList">
          <List data={projectList} />
        </div>
      </div>
    </>
  )
}

export default Projects
