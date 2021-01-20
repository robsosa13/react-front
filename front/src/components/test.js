import React, { Component } from 'react'
import { Table, Card } from 'react-bootstrap';
import axios from 'axios';
import jsPDF from "jspdf";
import "jspdf-autotable";

//import products from '../planilla/products'
class Planillas extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            planillaP: [],
        }
    }
  
    cargarDatos() {
        fetch('http://localhost:4201/api/empresa-calendario/600899bbec174a336873c45e',
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
                    planillaP: res.data.detalles
                })
            })
            .catch(function (error) {
                console.log('Hubo un problema con la petición:' + error.message);
            });

    }
    componentDidMount() {
        this.cargarDatos();
    }
    render() {
        const { planillaP } = this.state;
        // console.log('testing', planillaP)
        return (
            <>
                <h3>Lista de Horarios mensuales</h3>
                <br />       <br />       <br />
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Dia</th>
                            <th>Horario mañana</th>
                            <th>Horario mañana</th>
                            <th>Horario tarde</th>
                            <th>Horario tarde</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (planillaP)
                                ?
                                planillaP.map(item => (
                                    <tr key={item._id}>
                                     <td>{item.dia}</td>
                                        <td>{item.idTipoHorario.horario1H}:{item.idTipoHorario.horario1M}</td> 
                                    
                                        <td>{item.idTipoHorario.horario2H}:{item.idTipoHorario.horario2M}</td> 
                                 
                                        <td>{item.idTipoHorario.horario3H}:{item.idTipoHorario.horario3M}</td> 
                                    
                                        <td>{item.idTipoHorario.horario4H}:{item.idTipoHorario.horario4M}</td> 
                                                                        
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