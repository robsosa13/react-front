import React, { Component } from 'react'
import { Table,  Modal, Container,ModalBody,ModalFooter, Button, Form, Row, Col } from 'react-bootstrap';
//import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Modal1 from './Modal1'
class EmpleadoPlanilla extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            empleadoP: [], 
            show: false,
            showModalEliminar:false ,
            form: {
                idusuario :"",
                ocupacion:"",
                fecha_ingreso:"",
                fecha_salida:"",
                tipoModal:""
            }
        }
    }
    cargarDatos() {
        fetch('http://localhost:4201/api/empleado-planilla',
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                return response.json()
            })
            .then((res) => {
                this.setState({
                    empleadoP: res.empleadoP
                })
            })
            .catch(function (error) {
                console.log('Hubo un problema con la petición:' + error.message);
            });
    }
    componentDidMount() {
        this.cargarDatos();
    }
    handleModal() {
        this.setState({ show: !this.state.show })
    }

    handleModalEliminar() {
        this.setState({ show: !this.state.showModalEliminar })
    }
    //segundoPlano
    handleChange = async e => {
        e.persist();
        await this.setState({
            form:{
            ...this.state.form,
            [e.target.name]:e.target.value
            }
        })
        console.log(this.state.form)
    }
    peticionPost=async()=>{
        await axios.post('http://localhost:4201/api/empleado-planilla/registrar',this.state.form).then(response=>{
            this.handleModal();
            this.cargarDatos();
        }).catch(error=>   {
            console.log(error.message)
        })
        
    }
    seleccionarEmpleado=(empleado)=>{
        console.log('test',empleado)
        this.setState({
            tipoModal:'actualizar',
            form:{
                idusuario:empleado.idusuario,
                ocupacion:empleado.ocupacion,
                fecha_ingreso:empleado.fecha_ingreso,
                fecha_salida:empleado.fecha_salida  
            }
            
        })
        console.log('test',this.state.form)
    }
    peticionPut=()=>{
        axios.put('')
    }
    peticionDelete=()=>{
            axios.delete('http://localhost:4201/api/empleado-planilla'+this.state.form._id).then(response=>{
                this.setState({modalEliminar:false});
                this.cargarDatos();
            })
    }
    render() {
        const { empleadoP } = this.state;
        const {form}=this.state

        return (
            <>
                <Container>
                    <h2>Lista de Empleados</h2>
                    <br />
                    <button className="btn btn-success" onClick={() => { this.setState({form:null,tipoModal:'insertar'}); this.handleModal() }} >Agregar Empleado </button>
                    <br /> 
                    <br />
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>idusuario</th>
                                <th>ocupacion</th>
                                <th>Fecha Ingreso Empresa</th>
                                <th>Fecha Salida Empresa</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (empleadoP)
                                    ?
                                    empleadoP.map(item => (

                                        <tr key={item._id}>
                                            <td>{item.idusuario}</td>
                                            <td>{item.ocupacion}</td>
                                            <td>{item.fecha_ingreso}</td>
                                            <td>{item.fecha_salida}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={()=>this.seleccionarEmpleado(item)} > <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>   </button>
                                                {"   "}
                                                <Modal1/>
                                                {/* <button className="btn btn-danger" onClick={()=>{this.handleModalEliminar()}}> <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>   </button> */}
                                                
                                                {/* <button className="btn btn-success" onClick={() => { this.setState({form:null,tipoModal:'insertar'}); this.handleModal() }} >Agregar Empleado </button> */}
                  

                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr></tr>}
                        </tbody>
                    </Table>
                    <Modal show={this.state.show} onHide={() => this.handleModal()} >
                        <Modal.Header closeButton> Agregar Empleado
                            {/* <Modal.Title>Modal heading</Modal.Title> */}
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Id Usuario</Form.Label>
                                            <input type="text" placeholder="Id Usuario" name="idusuario" onChange={this.handleChange}value  = {form ?form.idusuario:''} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formBasictext">
                                            <Form.Label>Ocupación</Form.Label>
                                            <input type="text" placeholder="Ocupacion"name="ocupacion" onChange={this.handleChange}value  = {form? form.ocupacion:''}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formBasictext">
                                            <Form.Label>Fecha Inicio </Form.Label>
                                            <input type="date"name="fecha_ingreso" onChange={this.handleChange}value  = { form ?form.fecha_ingreso:'' }/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formBasictext">
                                            <Form.Label>Fecha Fin </Form.Label>
                                            <input type="date" name="fecha_salida"onChange={this.handleChange}value  = {form ?form.fecha_salida:''}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-danger"  onClick={() => { this.handleModal() }}>
                                Cancelar
                          </button>
                          {this.state.tipoModal=='insertar'?
                            <button className="btn btn-succes"  onClick={()=>this.peticionPost()} >
                                Insertar
                           </button>:
                           <button className="btn btn-primary"  >
                                Actualizar
                             </button>
                           }
                        </Modal.Footer>
                    </Modal>
             
                    {/* <Modal  show={this.state.showModalEliminar}  onHide={() => this.handleModal()} >
                        <Modal.Header closeButton> Agregar Empleado
                        </Modal.Header>
                        <Modal.Body>

                            Are you sure ?
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-succes"   >
                                Si
                           </button>
                           <button className="btn btn-primary"  >
                                No
                             </button>
                        </Modal.Footer>
                    </Modal> */}
                </Container>
            </>
        )
    }
}
export default EmpleadoPlanilla