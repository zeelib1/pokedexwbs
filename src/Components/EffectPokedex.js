import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Styles/Pokedex.css";

export default function Effect({ name, img, types, number, element, toggler }) {
  const [smShow, setSmShow] = React.useState(true);

  return (
    <>
      <Modal size='sm' show={smShow} onHide={() => setSmShow(false)} aria-labelledby='example-modal-sizes-title-sm'>
        <Modal.Header closeButton onClick={() => toggler()}>
          <Modal.Title id='example-modal-sizes-title-sm'>
            <div className='text-center' className='toUpper'>
              <h5>
                {name}
                {""} #{number}
              </h5>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='text-center'>
            <img src={img} alt={name} width='100' />
          </div>
          <div className='text-center'>
            <span className={`ml-2 badge badge-${types[0].type.name} toUpper`}>{types[0].type.name}</span>
            {types[1] ? <span className={`ml-2 badge badge-${types[1].type.name} toUpper`}>{types[1].type.name}</span> : null}
          </div>
          <div className='text-center'>
            <Link to={{ pathname: `/battle/${number}`, state: { element } }}>
              <Button className='mt-2 mr-2'>Fight</Button>
            </Link>
            <Link to={`/details/${number}`}>
              <Button className='mt-2 ml-2'>Details</Button>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}