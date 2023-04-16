import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Navbar from './Navbar'


export default function Main() {
  var id = window.location.href.split('/').reverse()[0]
  // console.log(id);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('');






  useEffect(() => {
    // getEmployees();

    const getData = () => {
      //home router
      Axios.post('http://localhost:3001/specific1', { id: id }).then((response) => {

        console.log(response.data);
        setName(response.data[0].Name);
        setPrice(response.data[0].Price);
        setType(response.data[0].Type);
        setImage(response.data[0].Image);
      }
      );

      Axios.post('http://localhost:3001/specific2', { id: id }).then((response) => {

        console.log(response.data);
        

      });
    };
    getData();

  }, [id])



  return (
    <div >
      <Navbar />
      <div className='container' style={{ paddingLeft: '100px' }}>
        <div className='row'>
          <div className='col-md-6'>
            <img src={`http://localhost:3001/uploads/${image}`} style={{ height: '240px', width: '50%' }} alt="..." />

          </div>
        </div>

      </div>

    </div>
  )
}
