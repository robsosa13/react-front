import { Button, Modal, } from 'react-bootstrap'
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
export default function Moda1() {
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    return (
        <>
            <Button onClick={() => setSmShow(true)}> <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></Button>{' '}
            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Eliminar
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>Estas seguro ?</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={() => { this.handleModal() }}>
                        Si
                          </button>

                    <button className="btn btn-succes" onClick={() => this.peticionPost()} >
                        No
                           </button>

                </Modal.Footer>
            </Modal>

        </>
    );
}