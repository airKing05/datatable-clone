import React, { useState } from 'react';
import { UilArrowUp, UilArrowDown } from '@iconscout/react-unicons'

export default function TableHead({ header, onSorting }) {

const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc")


function sortingChange(field){
  let order = field === sortingField && sortingOrder === "asc" ? "desc" : "asc" ;
 
  setSortingOrder(order);
  setSortingField(field);
  onSorting( field, order);


  console.log(order, field)
}
  return (<thead>
    <tr className='table-head-tr'>
      <th></th>
      {
        header.map((item, index) => {
          return <th
            className='table-head-th' style={{ cursor: `${item.isSortable ? 'pointer' : null}`}}
          onClick={() => sortingChange(item.label)} 
          >{item.label}
          <span>{
              item.isSortable ?  sortingOrder === "asc" ? <UilArrowUp className="table-heading-icon" /> : <UilArrowDown className="table-heading-icon" /> : null
          }
          </span>
          </th>
        })
      }
    </tr>
  </thead>)
}
