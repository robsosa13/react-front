import React, { Component } from 'react'
import { Container, Table } from 'react-bootstrap';

//import products from '../planilla/products'
class PlanillasMaster extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            planillaMas: [],
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
    render() {
        const { planillaMas } = this.state;
        console.log('testing', planillaMas)
        return (
            <>
            <Container>
            <h2>Planillas</h2>
                    <br />
                    <button className="btn btn-success" >Agregar Empleado </button>
                    <br />
                    <br />
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th >Caja</th>
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
                                        {/* <th className="text-center" >{item.caja}</th>
                                <th className="text-center" >{item.caja}</th>
                                <th className="text-center" >{item.caja}</th>
                                <th className="text-center" >{item.caja}</th> */}

                                        {/* <td className="text-center">{item.nombre}</td>
                                <td className="text-center">{item.stock}</td>
                                <td className="text-center">{item.precio}</td> */}
                                    </tr>

                                ))
                                :
                                <tr></tr>}
                        {/* <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr> */}

                    </tbody>
                </Table>
                </Container>
            </>
        )
    }
}
export default PlanillasMaster