import React, { Component } from 'react'
import { Table, Card } from 'react-bootstrap';
import axios from 'axios';
//import products from '../planilla/products'
class Planillas extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            planillaP: [],
        }
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
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
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
                            <th>Anticipos</th>
                            <th>Otros Descuentos</th>
                            <th>Total Descuentos</th>
                            <th>Liquido pagable</th>
                            <th>Minutos retraso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (planillaP)
                                ?
                                planillaP.map(item => (
                                    <tr key={item._id}>
                                        <td>{item.idEmpleadoPlanilla.ocupacion}</td>
                                        <td>{item.idEmpleadoPlanilla.fecha_ingreso}</td>
                                        <td>{item.idEmpleadoPlanilla.fecha_salida}</td>
                                        <td>{item.dias_pagados}</td>
                                        <td>{item.haber_basico}</td>
                                        <td>{item.total_dias_pagados}</td>
                                        <td>{item.bono_antiguedad}</td>
                                        <td>{item.horas_extras}</td>
                                        <td>{item.importe_horas_extras}</td>
                                        <td>{item.bono_produccion}</td>
                                        <td>{item.otros_bonos}</td>
                                        <td>{item.total_ganado}</td>
                                        <td>{item.aporte_nal_solidario}</td>
                                        <td>{item.rc_iva}</td>
                                        <td>{item.anticipos}</td>
                                        <td>{item.otros_descuentos}</td>
                                        <td>{item.total_descuentos}</td>
                                        <td>{item.liquido_pagable}</td>
                                        <td>{item.minutos_retraso}</td>
                                    </tr>

                                ))
                                :
                                <tr></tr>}
                    </tbody>
                </Table>
            </>
        )
    }
}
export default Planillas