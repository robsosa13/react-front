import React, { Component } from 'react'
import { Table, Modal, Container, ModalBody, ModalFooter, Button, Form, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route, Link } from "react-router-dom";


//import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Modal1 from './Modal1'
//import products from '../planilla/products'
class PlanillasMaster extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            planillaMas: [],
            show: false,
            showModalEliminar: false,
            form: {
                caja: "",
                razon_social: "",
                logo: "",
                titulo: "",
                nit: "",
                salario_minimo: "",
                periodo_planilla: "",
                año_planilla: "",
                afp: "",
                ciudad: "",
                sucursal: "",
                direccion: "",
                ufv_inicial: "",
                telefono: "",
                ufv_final: ""
            }
        }
    }
    cargarDatos() {
        fetch('http://localhost:4201/api/planilla-mayor',
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
                console.log('result', res)
                this.setState({
                    planillaMas: res.planillas
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
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log(this.state.form)
    }
    peticionPost = async () => {
        await axios.post('http://localhost:4201/api/planilla-mayor/nueva-planilla', this.state.form).then(response => {
            this.handleModal();
            this.cargarDatos();
        }).catch(error => {
            console.log(error.message)
        })
    }
    
    //  test (){
    //     for (let x = firstDayIndex; x > 0; x--) {
    //         days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    //       }
    // }

    seleccionarEmpleado = (empleado) => {
        console.log('test', empleado)
        this.setState({
            tipoModal: 'actualizar',
            form: {
                caja: empleado.caja,
                razon_social: empleado.razon_social,
                logo: empleado.logo,
                titulo: empleado.titulo,
                nit: empleado.nit,
                salario_minimo: empleado.salario_minimo,
                periodo_planilla: empleado.periodo_planilla,
                año_planilla: empleado.año_planilla,
                afp: empleado.afp,
                ciudad: empleado.ciudad,
                sucursal: empleado.sucursal,
                direccion: empleado.direccion,

                ufv_inicial: empleado.ufv_inicial,
                telefono: empleado.telefono,
                ufv_final: empleado.ufv_final
            }
        })
        console.log('test', this.state.form)
    }
    render() {
        const { planillaMas } = this.state;
        console.log('testing', planillaMas)

        const { form } = this.state
        return (
            <>
                <Container>
                    <h2>Planillas</h2>
                    <br />
                    <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.handleModal() }} >Crear planilla </button>
                    <br />
                    <br />
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th className="text-center" >Caja</th>
                                <th>Razon Social</th>
                                <th>Logo</th>
                                <th>Nit</th>
                                <th>Salario Mínimo</th>
                                <th>Periodo PLanilla</th>
                                <th>Ano Planilla</th>
                                <th>AFP</th>
                                <th>Ciudad</th>
                                <th>Sucursal</th>
                                <th>Direccion</th>
                                <th>UFV Inicial</th>
                                <th>Teléfono</th>
                                <th>UFV Final</th>
                                <th>Opciones </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                            (item.empresa.logo)
										?
											<Image source = {{ uri: url_media +'logos/' + item.empresa.logo }} style={styles.imageView2} />
										:
											<Image source = {{ uri: url_media +'perfiles/default_perfil2.jpg' }} style={styles.imageView2} />
						} */}
                            {
                                (planillaMas)
                                    ?
                                    planillaMas.map(item => (
                                        <tr key={item._id}>
                                            <td>{item.caja}</td>
                                            <td>{item.razon_social}</td>
                                            <td>{item.logo}</td>
                                            <td>{item.nit}</td>
                                            <td>{item.salario_minimo}</td>
                                            <td>{item.periodo_planilla}</td>
                                            <td>{item.año_planilla}</td>
                                            <td>{item.afp}</td>
                                            <td>{item.ciudad}</td>
                                            <td>{item.sucursal}</td>
                                            <td>{item.direccion}</td>
                                            <td>{item.ufv_inicial}</td>
                                            <td>{item.telefono}</td>
                                            <td>{item.ufv_final}</td>
                                            {/* <td><Link to="/planillas" className="btn btn-primary">Planilla</Link></td> */}
                                            <td> 
                                                <button>
                                                    
                                                </button>
                                                  <Link to={`/planillas/${item._id}`} >  test</Link>
                                                  
                                                  
                                                  </td>
                                          
                                            {/* <td>  <Button variant="outline-primary">Planilla</Button>{' '}</td> */}
                                        </tr>
                                    ))
                                    :
                                    <tr></tr>}
                        </tbody>
                    </Table>
                    <Modal show={this.state.show} onHide={() => this.handleModal()} size="lg" >
                        <Modal.Header closeButton> Crear Planilla
                            {/* <Modal.Title>Modal heading</Modal.Title> */}
                        </Modal.Header>
                        <Modal.Body>
                                <Form>
                                    <Row>
                                        <Col xs={4} md={4}>
                                            <Form.Group controlId="formBasictext">
                                                <Form.Label>Caja</Form.Label><br></br>
                                                <input type="text" placeholder="Caja" name="caja" onChange={this.handleChange} value={form ? form.caja : ''} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={4} md={4}>
                                            <Form.Group controlId="formBasictext">
                                                <Form.Label>Razon </Form.Label><br></br>
                                                <input type="text" placeholder="Razon  " name="razon_social" onChange={this.handleChange} value={form ? form.razon_social : ''} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={4} md={4}>
                                            <Form.Group controlId="formBasictext">
                                                <Form.Label>Logo</Form.Label>
                                                <br></br>   
                                                <input type="text" placeholder="Logo" name="logo" onChange={this.handleChange} value={form ? form.logo : ''} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    {/* AQUI */}
                                    <Row>
                                        <Col xs={4} md={4}>
                                            <Form.Group controlId="formBasictext">
                                                <Form.Label> Título</Form.Label>
                                                <br></br>
                                                <input type="text" placeholder="Título" name="titulo" onChange={this.handleChange} value={form ? form.titulo : ''} />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={4} md={4}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>NIT</Form.Label>
                                                <br></br>
                                                <input type="text" placeholder="NIT" name="nit" onChange={this.handleChange} value={form ? form.nit : ''} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={4} md={4}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Salario </Form.Label>
                                                <input type="text" placeholder="Salario mínimo" name="salario_minimo" onChange={this.handleChange} value={form ? form.salario_minimo : ''} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Periodo </Form.Label>
                                                <input type="text" placeholder="Periodo Planilla" name="periodo_planilla" onChange={this.handleChange} value={form ? form.periodo_planilla : ''} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={4} md={4}>
                                            <Form.Group controlId="formBasictext">
                                                <Form.Label>Año Planilla</Form.Label>
                                                <input type="text" placeholder="Año Planilla" name="año_planilla" onChange={this.handleChange} value={form ? form.año_planilla : ''} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={4} md={4}>
                                            <Form.Group controlId="formBasictext">
                                                <Form.Label>AFP </Form.Label>
                                                <br></br>
                                                <input type="text" name="afp" onChange={this.handleChange} value={form ? form.afp : ''} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>

                                    </Row>
   
                                    <Row>

                                        <Col xs={4} md={4}>
                                            <Form.Group controlId="formBasictext">
                                                <Form.Label>Ciudad </Form.Label><br></br>
                                                <input type="text" name="ciudad" onChange={this.handleChange} value={form ? form.ciudad : ''} />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={4} md={4}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Sucursal</Form.Label>
                                                <input type="text" placeholder="Sucursal" name="sucursal" onChange={this.handleChange} value={form ? form.sucursal : ''} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={4} md={4}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Dirección</Form.Label>
                                                <input type="text" placeholder="Dirección" name="direccion" onChange={this.handleChange} value={form ? form.direccion : ''} />
                                            </Form.Group>

                                        </Col>
                                    </Row>
                   
                                    <Row>
                                        <Col xs={4} md={4}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>UFV Inicial</Form.Label>
                                                <input type="text" placeholder="UFV Inicial" name="ufv_inicial" onChange={this.handleChange} value={form ? form.ufv_inicial : ''} />
                                            </Form.Group>

                                        </Col>
                                        <Col xs={4} md={4}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Teléfono</Form.Label>
                                                <input type="text" placeholder="Telefono" name="telefono" onChange={this.handleChange} value={form ? form.telefono : ''} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={4} md={4}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>UFV Final</Form.Label>
                                                <input type="text" placeholder="UFV Final" name="ufv_final" onChange={this.handleChange} value={form ? form.ufv_final : ''} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
             
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-danger" onClick={() => { this.handleModal() }}>
                                Cancelar
                          </button>
                            {this.state.tipoModal == 'insertar' ?
                                <button className="btn btn-succes" onClick={() => this.peticionPost()} >
                                    Insertar
                           </button> :
                                <button className="btn btn-primary"  >
                                    Actualizar
                             </button>
                            }
                        </Modal.Footer>
                    </Modal></Container>
            </>
        )
    }
}
export default PlanillasMaster