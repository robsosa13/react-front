import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import axios from 'axios';
//import products from '../planilla/products'
class Test extends Component {
    constructor(...props)
    {
        super(...props);
		this.state = {
		postres : [],
		}
	}
    cargarDatos()
	{
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
                console.log('result',res)
                            this.setState({
                                postres:res.planillas
                            })
            })
            .catch(function(error) {
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
              
        //         postres: result.postres
        //       });
        //     },
        //     (error) => {
             
        //     }
        //   )
      }
    render() {
       const { postres } = this.state;
       console.log('testing',postres)
        return (
            <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
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
                        (postres)
                                 ?
                        postres.map(item => (

                            <tr key={item._id}>
                                <td>{item.idPlanillaMayor.logo}</td>
                                <td>{item.total_ganado}</td>
                            
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
                           <tr></tr> }
                        {/* <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr> */}

                    </tbody>
                </Table>

            </>
        )
    }
}
export default Test