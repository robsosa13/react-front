import React, { Component } from 'react'
import { Table, Card, Container ,Form,Modal,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
class Planillas extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            planillaP: [],
            boletaE:[],
            show: false,
      
            form: {
                id:"",
                dias_pagados: "",
                horas_extras: "",
                bono_produccion: "",
                otros_bonos: "",
                rc_iva: "",
                anticipos: "",
                otros_descuentos: "",
            }
        }
    }
    handleModal() {
      //  console.log('test')
        this.setState({ show: !this.state.show })
    }
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
    seleccionar=(planillaEmpleado)=>{

        this.setState({
            form :{ 
                id:planillaEmpleado._id,
                dias_pagados:planillaEmpleado.dias_pagados,
                horas_extras:planillaEmpleado.horas_extras,
                bono_produccion:planillaEmpleado.bono_produccion,
                otros_bonos:planillaEmpleado.otros_bonos,
                rc_iva:planillaEmpleado.rc_iva,
                anticipos:planillaEmpleado.anticipos,
                otros_descuentos:planillaEmpleado.otros_descuentos,
            }
        })
   
    }
    test(){
        alert('test')
    }
    cargarEmpleado(){
        fetch('http://localhost:4201/api/planillas',
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
                planillaP: res.planillas
            })
        })
        .catch(function (error) {
            console.log('Hubo un problema con la petición:' + error.message);
        });
        
    }
    printBoletaEmpleado(){

        const unit = "pt";
        const size = "A2";
        const orientation = "landscape"; 
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);
        const title = "Boleta de pago ";
        const headers = [[ "NIT Empresa","Apellido Paterno","Apellido Materno","Nombre","CI","Exp","Cargo"
        ,"Sueldo Básico","Dias Trabajados","F-Ingreso","Mes boleta","Salario Ganado","Bono de Antiguedad","Horas extras"
        ,"Otros Ing","AFP","Aporte Nal.","RC IVA","Anticipos otros desc","Total Ingresos","Total Egresos","Liquido Pagable"]];
        const data = this.state.boletaE.map(elt => [
            elt.idPlanillaMayor.nit,
            elt.idEmpleadoPlanilla.apellidoP,
            elt.idEmpleadoPlanilla.apellidoM,
            elt.idEmpleadoPlanilla.nombres,
            elt.idEmpleadoPlanilla.CI,
            elt.idEmpleadoPlanilla.exp,
            elt.idEmpleadoPlanilla.ocupacion,
            elt.haber_basico,
            elt.dias_pagados,
            elt.idEmpleadoPlanilla.fecha_ingreso,
            elt.idPlanillaMayor.periodo_planilla,
            elt.haber_basico,
            elt.bono_antiguedad,
            elt.importe_horas_extras,
            elt.otros_bonos,
            elt.monto_afp,
            elt.aporte_nal_solidario,
            elt.rc_iva,
            elt.otros_descuentos,'','',
            elt.liquido_pagable,
           ]);
        let content = {
            startY: 200,
            head: headers,
            body: data
        };
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Planilla.pdf")

    }
    printBoleta = (item) => {
        console.log(item)
        fetch('http://localhost:4201/api/planilla/'+item,
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
            console.log('PLANILLA !!!', res)
            this.setState({
                boletaE: res.planillas
            })
            console.log('Test')
            this.printBoletaEmpleado()
           
        })
        .catch(function (error) {
            console.log('Hubo un problema con la petición:' + error.message);
        });

        //this.setState({ isEdit: true, id: item.id });
      };
    exportPDF = () => {

        const unit = "pt";
        const size = "A2"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);
        const title = "Planilla de sueldos";
        const headers = [[ "Nombres","Apellido Paterno","Apellido Materno","CI","exp","Fecha de Nacimiento","Sexo","Ocupacion", "Fecha Ingreso", "Días pagados", "Haber Básico", "Total días pagados",
            "Bono de Antiguedad", "Horas extras", "Importe Horas Extras", "Bono Produccion", "Otros Bonos", "Total Ganado", "AFP",
            "Aporte Nacional Solidario", "RC IVA", "Anticipos", "Otros Descuentos", "Total Descuentos", "Liquido pagble"]];
        const data = this.state.planillaP.map(elt => [
            elt.idEmpleadoPlanilla.nombres,
            elt.idEmpleadoPlanilla.apellidoP,
            elt.idEmpleadoPlanilla.apellidoM,
            elt.idEmpleadoPlanilla.CI,
            elt.idEmpleadoPlanilla.exp,
            elt.idEmpleadoPlanilla.fecha_nacimiento,
            elt.idEmpleadoPlanilla.sexo,
            elt.idEmpleadoPlanilla.ocupacion,
            moment(elt.idEmpleadoPlanilla.fecha_ingreso).format("L"),
            elt.dias_pagados,
            elt.idEmpleadoPlanilla.haber_basico.toFixed(2),
            elt.total_dias_pagados.toFixed(2),
            elt.bono_antiguedad.toFixed(2),
            elt.horas_extras,
            elt.importe_horas_extras,
            elt.bono_produccion,
            elt.otros_bonos,
            elt.total_ganado.toFixed(2),
            elt.monto_afp.toFixed(2),
            elt.aporte_nal_solidario.toFixed(2),
            elt.rc_iva,
            elt.anticipos,
            elt.otros_descuentos,
            elt.total_descuentos.toFixed(2),
            elt.liquido_pagable.toFixed(2)]);
        let content = {
            startY: 200,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Planilla.pdf")
    }
    editPlanilla=async()=>{
        console.log('test !!')
        await axios.post('http://localhost:4201/api/planilla-edit', this.state.form).then(response => {
            console.log('test !!')
            this.handleModal();
            this.cargarDatos();
        }).catch(error => {
            console.log(error.message)
        })
    }
  
    cargarDatos() {
        fetch('http://localhost:4201/api/planillas',
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
                    planillaP: res.planillas
                })
            })
            .catch(function (error) {
                console.log('Hubo un problema con la petición:' + error.message);
            });

    }
    componentDidMount() {
        this.cargarDatos();
        // fetch('http://localhost:4201/api/planilla-mayor')
        //   .then(res => res.json())
        //   .then(
        //     (result) => {
        //       this.setState({

        //         planillaP: result.planillaP
        //       });
        //     },
        //     (error) => {

        //     }
        //   )
    }
    render() {
        const { planillaP } = this.state;
        const { form } = this.state
        console.log('testing', planillaP)
        return (
            <>
                <h1>Planilla de sueldos</h1>
                {/* <h5>Planilla detalle</h5> */}
                <Card>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Text>
                         Detalle Planilla
                         </Card.Text>
                    </Card.Body>
                </Card>
                <br />
                <br />
                <br />
                <br />
                <Table className="table-responsive" striped bordered hover >
                    <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Apellido Paterno</th>
                            <th>Apellido Materno</th>
                            <th>CI</th>
                            <th>Exp</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Sexo</th>
                            <th>Ocupacion</th>
                            <th>Fecha de Ingreso</th>
                            <th>Fecha de Salida</th>
                            <th>Dias Pagados</th>
                            <th>Haber Basico</th>
                            <th>Total Dias pagados</th>
                            <th>Bono Antiguedad</th>
                            <th>Horas Extras</th>
                            <th>Importe Horas extras</th>
                            <th>Bono Producción</th>
                            <th>Otros Bonos</th>
                            <th>Total Ganado</th>
                            <th>Aporte NAcional Solidario</th>
                            <th>RC IVA</th>
                            <th>AFP</th>
                            <th>Anticipos</th>
                            <th>Otros Descuentos</th>
                            <th>Total Descuentos</th>
                            <th>Liquido pagable</th>
                            <th>Minutos retraso</th>
                            <th>Editar</th>
                            <th> Boleta de pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(planillaP) ?
                            planillaP.map(item => (
                                <tr key={item._id}>
                                    <td>{item.idEmpleadoPlanilla.nombres}</td>
                                    <td>{item.idEmpleadoPlanilla.apellidoP}</td>
                                    <td>{item.idEmpleadoPlanilla.apellidoM}</td>
                                    <td>{item.idEmpleadoPlanilla.CI}</td>
                                    <td>{item.idEmpleadoPlanilla.exp}</td>
                                    <td>{moment(item.idEmpleadoPlanilla.fecha_nacimiento).format("L")}</td>
                                    <td>{item.idEmpleadoPlanilla.sexo}</td>
                                    <td>{item.idEmpleadoPlanilla.ocupacion}</td>
                                    <td>{moment(item.idEmpleadoPlanilla.fecha_ingreso).format("L")}</td>
                                    <td>{item.idEmpleadoPlanilla.fecha_salida}</td>
                                    <td>{item.dias_pagados}</td>
                                    <td>{item.haber_basico}</td>
                                    <td>{item.total_dias_pagados.toFixed(2)}</td>
                                    <td>{item.bono_antiguedad.toFixed(3)}</td>
                                    <td>{item.horas_extras}</td>
                                    <td>{item.importe_horas_extras.toFixed(2)}</td>
                                    <td>{item.bono_produccion}</td>
                                    <td>{item.otros_bonos}</td>
                                    <td>{item.total_ganado.toFixed(3)}</td>
                                    <td>{item.aporte_nal_solidario.toFixed(2)}</td>
                                    <td>{item.rc_iva}</td>
                                    <td>{item.monto_afp.toFixed(3)}</td>
                                    <td>{item.anticipos}</td>
                                    <td>{item.otros_descuentos.toFixed(2)}</td>
                                    <td>{item.total_descuentos.toFixed(2)}</td>
                                    <td>{item.liquido_pagable.toFixed(2)}</td>
                                    <td>{item.minutos_retraso}</td>
                                    <button className="btn btn-primary" onClick={() => {this.seleccionar(item);this.handleModal() }} > <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>   </button>
                                    <td>  <button className="btn btn-success"
                                    onClick={(e) => this.printBoleta(item._id, e)}>
                                    Boleta</button>
                                    </td>
                                </tr>
                            ))
                            :
                            <tr></tr>}
                    </tbody>
                </Table>
                <Modal show={this.state.show} onHide={() => this.handleModal()} >
                    <Modal.Header closeButton> Editar Planilla
                            {/* <Modal.Title>Modal heading</Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Horas Extras</Form.Label>
                                        <input type="text" placeholder="horas_extras" name="horas_extras" onChange={this.handleChange} value={form ? form.horas_extras: ''} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formBasictext">
                                        <Form.Label>Bono Producción</Form.Label>
                                        <input type="text" placeholder="bono_produccion" name="bono_produccion" onChange={this.handleChange} value={form ? form.bono_produccion: ''} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Otros Bonos</Form.Label>
                                        <input type="text" placeholder="otros_bonos" name="otros_bonos" onChange={this.handleChange} value={form ? form.otros_bonos: ''} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Anticipos</Form.Label>
                                        <input type="text" placeholder="anticipos" name="anticipos" onChange={this.handleChange} value={form ? form.anticipos: ''} />
                                    </Form.Group>
                                </Col>
                                {/* <Col>
                                    <Form.Group controlId="formBasictext">
                                        <Form.Label> RC iva</Form.Label><br></br>
                                        <input type="text" placeholder="rc_iva" name="rc_iva" onChange={this.handleChange} value={form ? form.rc_iva: ''} />
                                    </Form.Group>
                                </Col> */}
                            </Row>
                            <Row>
                                {/* <Col>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Anticipos</Form.Label>
                                        <input type="text" placeholder="anticipos" name="anticipos" onChange={this.handleChange} value={form ? form.anticipos: ''} />
                                    </Form.Group>
                                </Col> */}
                              
                                <Col>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Otros descuentos</Form.Label>
                                        <input type="number" placeholder="otros_descuentos" name="otros_descuentos" onChange={this.handleChange} value={form ? form.otros_descuentos: ''} />
                                    </Form.Group>
                                </Col>
                                <Col></Col>
                            </Row>
                         

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-danger" onClick={() => { this.handleModal() }}>
                            Cancelar
                          </button>

                            <button className="btn btn-success" onClick={() => this.editPlanilla()} >
                                Editar
                           </button>
                    </Modal.Footer>
                </Modal>
                <br /> <br />
                <button className="btn btn-primary" onClick={() => this.exportPDF()}>Imprimir Planilla</button>
                <ExcelFile element={<button className="btn btn-success">Exportar Excel</button>}>
                <ExcelSheet data={this.state.planillaP} name="planillaP">
                    <ExcelColumn label="Dias Pagados" value="dias_pagados"/>
                    <ExcelColumn label=" Haber Básico" value="haber_basico"/>
                    <ExcelColumn label="Total Dias Pagados" value="total_dias_pagados"/>
                    <ExcelColumn label="Bono Antiguedad" value="bono_antiguedad"/>
                    <ExcelColumn label="Horas Extras" value="horas_extras"/>
                    <ExcelColumn label="Importe horas extras" value="importe_horas_extras"/>
                    <ExcelColumn label="Bono Produccion" value="bono_produccion"/>
                    <ExcelColumn label="Otros Bonos" value="otros_bonos"/>
                    <ExcelColumn label="Total Ganado" value="total_ganado"/>
                    <ExcelColumn label="Bono AFP" value="monto_afp"/>
                    <ExcelColumn label=" Aporte Nal. Solidario" value="aporte_nal_solidario"/>
                    <ExcelColumn label="RC IVA" value="rc_iva"/>
                    <ExcelColumn label="Anticipos" value="anticipos"/>
                    <ExcelColumn label="Otros descuentos" value="otros_descuentos"/>
                    <ExcelColumn label="Total Descuentps" value="total_descuentos"/>
                    <ExcelColumn label="Líquido pagable" value="liquido_pagable"/>
                    <ExcelColumn label="Minutos de retraso" value="minutos_retraso"/>
                </ExcelSheet>
            </ExcelFile>
            </>
        )
    }
}
export default Planillas