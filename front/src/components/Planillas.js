import React, { Component } from 'react'
import { Table, Card } from 'react-bootstrap';
import axios from 'axios';
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

//import products from '../planilla/products'
class Planillas extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            planillaP: [],
        }
    }
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
            elt.idEmpleadoPlanilla.haber_basico.toFixed(3),
            elt.total_dias_pagados.toFixed(3),
            elt.bono_antiguedad.toFixed(3),
            elt.horas_extras,
            elt.importe_horas_extras,
            elt.bono_produccion,
            elt.otros_bonos,
            elt.total_ganado.toFixed(3),
            elt.monto_afp.toFixed(3),
            elt.aporte_nal_solidario.toFixed(3),
            elt.rc_iva,
            elt.anticipos,
            elt.otros_descuentos,
            elt.total_descuentos.toFixed(3),
            elt.liquido_pagable.toFixed(3)]);
        let content = {
            startY: 200,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Planilla.pdf")
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
        console.log('testing', planillaP)
        return (
            <>
                <h1>Planilla de sueldos</h1>
                <h5>Planilla detalle</h5>
                <Card>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk
                            of the card's content.
                         </Card.Text>
                    </Card.Body>
                </Card>
                <br />
                <br />
                <br />
                <br />
                <Table striped bordered hover >
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
                                    <td>{item.total_dias_pagados.toFixed(3)}</td>
                                    <td>{item.bono_antiguedad.toFixed(3)}</td>
                                    <td>{item.horas_extras}</td>
                                    <td>{item.importe_horas_extras.toFixed(3)}</td>
                                    <td>{item.bono_produccion}</td>
                                    <td>{item.otros_bonos}</td>
                                    <td>{item.total_ganado.toFixed(3)}</td>
                                    <td>{item.aporte_nal_solidario.toFixed(3)}</td>
                                    <td>{item.rc_iva}</td>
                                    <td>{item.monto_afp.toFixed(3)}</td>
                                    <td>{item.anticipos}</td>
                                    <td>{item.otros_descuentos.toFixed(3)}</td>
                                    <td>{item.total_descuentos.toFixed(3)}</td>
                                    <td>{item.liquido_pagable.toFixed(3)}</td>
                                    <td>{item.minutos_retraso}</td>
                                    <td>  <button className="btn btn-success" >Boleta</button></td>

                                </tr>

                            ))
                            :
                            <tr></tr>}
                    </tbody>
                </Table>
                <br /> <br />
                <button className="btn btn-success" onClick={() => this.exportPDF()}>Imprimir Planilla</button>
            </>
        )
    }
}
export default Planillas