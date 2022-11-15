import React from 'react'

export default function TableBody({ content, setIdToChange }) {
    //console.log(content)
   
  return (
    <tbody >
            {
               content.map((item, idx) => {
                   return <tr key={idx} className='table-body-tr'>
                     <td><input type="radio" value={item.id} onChange= { (e) => {
                       {/* console.log(e.target.value) */}
                       setIdToChange(e.target.value)
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
  )
}
