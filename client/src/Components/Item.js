import React from 'react'
import { Link } from 'react-router-dom'


const Item = (props) => {
    let { name, description, imglink, id } = props;
    //console.log(props);
   // console.log("id", id);

    return (
        <div>              
            <div className="container my-3">
                <div className="card" style={{ width: '18rem' }}>
                    <img src={imglink} className="card-img-top " style={{ height: '240px', width: '100%' }} alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{description}</p>
                        
                        <Link to={`/ItemInfo/${id}`} className="btn btn-primary">Go somewhere</Link>              
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Item
