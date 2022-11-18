import React, { useEffect, useState } from 'react'
import FormInput from './FormInput'
import TableHead from './TableHead'
import { UilPlus, UilEdit, UilTrashAlt, UilMinus, UilAngleLeftB, UilAngleRightB } from '@iconscout/react-unicons'

const url = 'https://jsonplaceholder.typicode.com/users';
const header = [
  {
    label: 'id',
    isSortable: true
  },
  {
    label: 'name',
    isSortable: true
  },
  {
    label: 'email',
    isSortable: true
  },
  {
    label: 'company',
    isSortable: false
  },
  {
    label: 'city',
    isSortable: false
  },
  {
    label: 'zipcode',
    isSortable: false
  }
]

const defaultFormData = {
  name: '',
  email: '',
  company: '',
  city: '',
  zipcode: ''
};


export default function Main() {

  const [user, setUser] = useState([]);
  const [sorting, setSorting] = useState({ field: '', order: '' });

  const [formData, setFormData] = useState(defaultFormData);
  const [showInputForm, setShowInputFrom] = useState(false);
  
  const [userPerPage, setUserPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [checkedItemId, setCheckedItemId] = useState(null);
  




  function getUserData() {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        //console.log(res)
        setUser(res)
      })
      .catch(err => console.log("ERROR", err))

  }

//  const formDataAttributes = [
//       {
//         name: "name",
//         value: formData.name,
//         type: "text",
//         placeHolder: "Enter Name"
//       },
//       {
//         name: "email",
//         value: formData.email,
//         type: "email",
//         placeHolder: "Enter Email"
//       },
//       {
//         name: "company",
//         value: formData.company,
//         type: "text",
//         placeHolder: "Enter Company"
//       },
//       {
//         name: "city",
//         value: formData.city,
//         type: "text",
//         placeHolder: "Enter City"
//       },
//       {
//         name: "zipcode",
//         value: formData.zipcode,
//         type: "number",
//         placeHolder: "Enter zipcode"
//       }
//     ];


  useEffect(() => {
    getUserData();
  }, []);

  const { name, email, company, city, zipcode } = formData;


  // handling this CTA 
  // input form
  function handleFormDataChange(e) {
    const { name, value } = e.target;
    console.log("target", name, value);
    //console.log("name:",name, "value:",value)
    if (value !== "") {
      const data = { ...formData, [name]: value, id: Date.now() };
      setFormData(data);
      // updateFormAttribute(formData);
      // setFormData({ ...formData, [name]: value, id: Math.random() });
    }
  }

  function resetFormData() {
    setFormData({
      name: '',
      email: '',
      company: '',
      city: '',
      zipcode: ''
    });
  }
  function transformFormDataToJson() {
    return {
      id: Date.now(),
      name,
      email,
      company: {
        name: company,
      },
      address: {
        city,
        zipcode,
      }
    }
  }

  function transformFormUpdatedDataToJson(idToChange){
    if(idToChange){
      return {
        id: idToChange || Date.now(),
        name,
        email,
        company: {
          name: company,
        },
        address: {
          city,
          zipcode,
        }
      }
    }
    return;
    
  }

  function addData(e) {
    e.preventDefault();
    if (checkedItemId) {
      let otherData = user.filter((item) => item.id != checkedItemId);
      let editedData = [...otherData, transformFormUpdatedDataToJson(checkedItemId)];
      setUser(editedData);
      resetFormData();
      setCheckedItemId(null);
      showInputForm(false);
      //setFormData(defaultFormData)
      return;
     
     
    }
    if (checkedItemId == null){
      const userDataToSet = [...user, transformFormDataToJson(formData)]
      setUser(userDataToSet)  
      //setFormData(defaultFormData)  
      resetFormData();
    }
  };


  // input form

  //handel showInputForm
  function showForm() {
    setShowInputFrom(!showInputForm)
  }
  //handel showInputForm


  // update user
  function updateUser() {
    showForm(!showInputForm);
    const dataTochange = user.filter((item) => item.id == checkedItemId);
    //console.log(user);
    const defaultFormData = {
      name: dataTochange[0].name,
      email: dataTochange[0].email,
      company: dataTochange[0].company.name,
      city: dataTochange[0].address.city,
      zipcode: parseInt(dataTochange[0].address.zipcode)
    };

    setFormData(defaultFormData);
    console.log(defaultFormData);
    // updateFormAttribute(defaultFormData);


   
  }
  // update user


  // handel delete user

  function deleteListItem() {
    const remainingData = user.filter((item, index) => item.id != checkedItemId);
    setUser(remainingData)
   
  }
  // handel delete user
  // handling this CTA 



  // handling the checkbox
  function handleChecked(id){
    setCheckedItemId(id);  
  }
  // handling the checkbox




  // sorting section
  const sortTableData = (sortedField, sortingOrder) => {
    setUser([...user.sort((a, b) => {
      const multiplier = sortingOrder === "asc" ? 1 : -1;
      if (a[sortedField] < b[sortedField]) return -1 * multiplier;
      if (a[sortedField] > b[sortedField]) return 1 * multiplier;
      return 0;
    })]);
  }
  // sorting section



  // handling paginantion
  const totalNoOfPage = Math.ceil(user.length / userPerPage)
  const pages = [...Array(totalNoOfPage + 1).keys()].splice(1);

  const lastIndexOfUser = currentPage * userPerPage;  // 20
  const firstIndexOfUser = lastIndexOfUser - userPerPage; //1

  const visibleUserPerPage = user.slice(firstIndexOfUser, lastIndexOfUser)

  const prevFunc = function () {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    } else {
      setCurrentPage(totalNoOfPage)
    }
  }
  const nextFunc = function () {
    if (currentPage !== totalNoOfPage) {
      setCurrentPage(currentPage + 1)
    } else {
      setCurrentPage(1)
    }
  }
  // handling paginantion



  return (
    <div className='main-container'>

      {/* CTA SECTION */}
      <div className='selection-container'>
        <div className='cta'>
          <div>
            <UilMinus />
          </div>
          <div>
            <span
            className='cta-btn'
              onClick={showForm}
            ><UilPlus  /> </span>
            <span
              className='cta-btn'
              onClick={() => updateUser()}
            ><UilEdit /></span>
            <span 
              className='cta-btn'
            onClick={deleteListItem}><UilTrashAlt /></span>
          </div>

        </div>
        <div className='show-section'>
          <span className='no-select'>Showing {firstIndexOfUser + 1}-{(firstIndexOfUser + userPerPage)+1 > user.length+1 ? user.length : (firstIndexOfUser + userPerPage)} of {user.length}</span>
          <span className='row-select'>1 row selected</span>
        </div>
      </div>
      {/* CTA SECTION */}


    
      {/* FORM SECTION */}
      {
        showInputForm ? <form className='form-section' onSubmit={addData} action="" method="POST">
          <input className="from-input"  name="name" type="text" placeholder="Enter Name" value={formData.name} onChange={handleFormDataChange} required />
          <input className="from-input" name='email' type="email"  placeholder="Enter Email" value={formData.email} onChange={handleFormDataChange} required />
          <input className="from-input" name="company" type="text" placeholder="Enter Company" value={formData.company} onChange={handleFormDataChange} required />
          <input className="from-input" name="city" type="text" placeholder="Enter City" value={formData.city} onChange={handleFormDataChange} required />
          <input className="from-input" name="zipcode" type="number" placeholder="Enter Zipcode" value={formData.zipcode} onChange={handleFormDataChange} required />
          <input type='submit' className='from-input'/>

        </form> : null
      }

      {/* FORM SECTION */}

      {/* TABLE SECTION */}

      <div style={{ 'overflowX': 'auto' }}>
        <table className='table'>
          <TableHead header={header} onSorting={(field, order) => {
            setSorting(field, order);
            sortTableData(field, order);
          }} />

          <tbody >
            {
              visibleUserPerPage && visibleUserPerPage.map((item, idx) => {
                return <tr key={idx} className='table-body-tr'>
                  <td><input type="checkbox" value={item.id} 
                    checked={item.id == checkedItemId}
                  onChange={(e) => {
                   handleChecked(e.target.value)
                  }
                  } /> &nbsp;</td>
                 
                  <td className=''>{item.id} </td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.company.name}</td>
                  <td>{item.address.city}</td>
                  <td>{item.address.zipcode}</td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>

      {/* TABLE SECTION */}



      {/* PAGINATION SECTION */}
      <div className='footer'>

        <div role="button" className='page-no'>
          <span onClick={prevFunc}><UilAngleLeftB /></span>
          &nbsp;
          {
            pages && pages.map(page =>
              <span
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "highlite" : ""}
              >&nbsp; {page} &nbsp;</span>)}
          &nbsp;
          <span onClick={nextFunc}><UilAngleRightB /></span>
        </div>

        <div className='page-select'>
          <span className=''>Show  &nbsp;</span>
          <select onChange={(e) => {
            setUserPerPage(e.target.value)
          }}>
            <option value="10">5</option>
            <option value="10">10</option>
            <option value="20">30</option>
            <option value="50">50</option>
          </select>
          <span className=''> &nbsp; Entries &nbsp;</span>
        </div>

      </div>
      {/* PAGINATION SECTION */}

    </div>
  )
}

