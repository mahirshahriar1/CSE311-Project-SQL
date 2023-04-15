import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Navbar from './Navbar'


export default function Main() {
  var iid = window.location.href.split('/').reverse()[0]
  // console.log(id);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imglink, setImglink] = useState('');
  const [id, setId] = useState();
  const [price, setPrice] = useState();





  useEffect(() => {
    // getEmployees();
    const getData = () => {
      Axios.post('http://localhost:3001/specific', { iid: iid }).then((response) => {

        console.log(response.data);
        setDescription(response.data[0].description);
        setImglink(response.data[0].imglink);
        setId(response.data[0].id);
        setName(response.data[0].name);
        setPrice(response.data[0].price);

      });
    };
    getData();

  }, [iid])



  return (
    <div >
      <Navbar />
      <div className='container' style={{paddingLeft:'100px'}}>
        <div >

          id={id}
        </div>
        <div>

          name={name}
        </div>
        <div>

          description={description}
        </div>
        <div>

          imglink={imglink}
        </div>
        <div>

          price={price}
        </div>

      </div>

    </div>
  )
}
