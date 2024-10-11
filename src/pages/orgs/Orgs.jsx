import './orgs.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Modal from '../../components/modal/Modal';
import List from '../../components/listItems/List';
import orgFields from '../../assets/formFields/org';
import CreateForm from '../../components/forms/createForm/CreateForm';
import { server } from '../../assets/constants';

const Orgs = () => {
  const userToken = useSelector((state) => state.user.accessToken);
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const [createModal, setCreateModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [orgList, setOrgList] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`, // Send Bearer token as userId
    },
  };

  const url = server + '/org/getAllOrgs';
    const fetchOrgs = async () => {
      try {
        const response = await axios.get(url,
          config
        );
        console.log(response);

        setOrgList(response.data);
        // console.log('orgList :- ');
        // console.log(orgList);

      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
  };

  useEffect(() => {
    fetchOrgs();
    console.log("userId "+ userId);
    
  }, [])


  const onSubmit = async(formData) => {
    const url = server + '/org/create'
    try {
      const response = await axios.post(url, {
        name: formData.name,
        description: formData.description
      }, config);

      if (response.status === 200) {
        toast.success(`${formData.name} Org Created`);
        fetchOrgs();
      } else {
        toast.error("Failed to create organization");
      }

    } catch (error) {
      toast.error(error.response?.data?.msg || 'Internal Server Error');
      console.error(error);
    }
    finally{
      setCreateModal(createModal => !createModal)
    }
  }

  const handleOrgClick = (org) => {
    const formattedName = org.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${formattedName}`, { state: { id: org._id, orgN: formattedName } });
  };

  const filteredOrgList = orgList?.filter(org => {
    if (filter === 'created') {
      return org.ownerId === userId;
    } else if (filter === 'joined') {
      // return org.owner !== user._id;
      return org.ownerId !== userId;
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
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="created">My Orgs</option>
            <option value="joined">Joined</option>
          </select>
        </div>
        <div className="orgList">
          <List
            data={filteredOrgList}
            onRowClick={handleOrgClick}
          />
        </div>
      </div>
    </>
  )
}

export default Orgs
