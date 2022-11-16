import React, { useEffect, useState } from 'react'
import FormInput from './FormInput'
import TableBody from './TableBody'
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
  const [formData, setFormData] = useState(defaultFormData);
  const [user, setUser] = useState([]);
  const [idToChange, setIdToChange] = useState(null);
  const [sorting, setSorting] = useState({ field: '', order: '' });

  const [showInputForm, setShowInputFrom] = useState(false);


  const [userPerPage, setUserPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);


  function getUserData() {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        //console.log(res)
        setUser(res)
      })
      .catch(err => console.log("ERROR", err))

  }
  useEffect(() => {
    getUserData()
  }, [])

  // handling this CTA 
  // input form
  const { name, email, company, city, zipcode } = formData;
  const fromInputAttribute = [
    {
      name: "name",
      value: name,
      type: "text",
      placeHolder: "Enter Name"
    },
    {
      name: "email",
      value: email,
      type: "email",
      placeHolder: "Enter Email"
    },
    {
      name: "company",
      value: company,
      type: "text",
      placeHolder: "Enter Company"
    },
    {
      name: "city",
      value: city,
      type: "text",
      placeHolder: "Enter Company"
    },
    {
      name: "zipcode",
      value: zipcode,
      type: "number",
      placeHolder: "Enter zipcode"
    }
  ];

  function handleInput(e) {
    const { name, value } = e.target;
    //console.log("name:",name, "value:",value)
    if (value !== "") {
      setFormData({ ...formData, [name]: value, id: Math.random() });
    }
  }


  function transformFormDataToJson(formData, idToChange) {
    return {
      id: idToChange || Math.random(),
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

  function addData() {
    if (idToChange) {
      console.log(idToChange)
      let otherData = user.filter((item) => item.id != idToChange);
      let editedData = [...otherData, transformFormDataToJson(formData, idToChange)];
      setUser(editedData);
      setFormData(" ")
    }
    const userDataToSet = [...user, transformFormDataToJson(formData)]
    setUser(userDataToSet)
    // if(idToChange<-1) {
     
    // }
   
    // console.log("from data",)
  };


  // input form

  //handel showInputForm
  function showForm() {
    setShowInputFrom(!showInputForm)
  }
  //handel showInputForm


  // update user
  function updateUser() {
    showForm()
    const dataTochange = user.filter((item) => item.id == idToChange);
    console.log(user);
    const defaultFormData = {
      name: dataTochange[0].name,
      email: dataTochange[0].email,
      company: dataTochange[0].company.name,
      city: dataTochange[0].address.city,
      zipcode: parseInt(dataTochange[0].address.zipcode)
    };

    setFormData(defaultFormData);

    console.log(dataTochange, defaultFormData);
  }
  // update user


  // handel delete user

  function deleteListItem() {
    //console.log(idToChange);
    const remainingData = user.filter((item, index) => item.id != idToChange);
    setUser(remainingData)
    //console.log("reamoanf", remainingData)
  }
  // handel delete user
  // handling this CTA 

  // sorting section
  const sortTableData = (sortedField, sortingOrder) => {
    console.log(user);
    console.log("sasas", sortedField, sortingOrder);
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
    <>

      {/* CTA SECTION */}
      <div className='btn-container'>
        <div className='cta'>
          <div>
            <UilMinus />
          </div>
          <div>
            <span
              onClick={showForm}
            ><UilPlus /> </span>
            <span
              onClick={() => updateUser()}
            ><UilEdit /></span>
            <span onClick={deleteListItem}><UilTrashAlt /></span>
          </div>

        </div>
      </div>
      {/* CTA SECTION */}



      {/* FORM SECTION */}
      {
        showInputForm ? <div className='form-section'>

          {fromInputAttribute.map((data, index) => {
            return (
              <FormInput key={index} attribute={data} onChange={handleInput} />
            );
          })}
          <button className='from-input' onClick={addData}>Add</button>

        </div> : null
      }

      {/* FORM SECTION */}




      {/* TABLE SECTION */}

      <div style={{ 'overflowX': 'auto' }}>
        <table className='table'>
          <TableHead header={header} onSorting={(field, order) => {
            setSorting(field, order);
            sortTableData(field, order);
          }} />
          {/* <TableBody content={user} setIdToChange = {setIdToChange}/> */}

          <tbody >
            {
              visibleUserPerPage && visibleUserPerPage.map((item, idx) => {
                return <tr key={idx} className='table-body-tr'>
                  <td><input type="radio" value={item.id} onChange={(e) => {
                    setIdToChange(e.target.value);
                  }
                  } /></td>
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
          {
            pages && pages.map(page =>
              <span
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "highlite" : ""}
              >&nbsp; {page} &nbsp;</span>)}
          <span onClick={nextFunc}><UilAngleRightB /></span>
        </div>

        <div className='page-select'>
          <span className=''>Show  &nbsp;</span>
          <select onChange={(e) => {
            setUserPerPage(e.target.value)
          }}>
            <option value="10">5</option>
            <option value="20">10</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
          <span className=''>Entries &nbsp;</span>
        </div>

      </div>
      {/* PAGINATION SECTION */}

    </>
  )
}

