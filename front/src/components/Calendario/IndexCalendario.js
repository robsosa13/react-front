// import React from 'react'
// import {Table} from 'react-bootstrap'
// class EssayForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             calendario:[],
//             value: 'Please write an essay about your favorite DOM element.'
//         };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     // handleChange(event) {
//     //     this.setState({ value: event.target.value });
//     // }

//     handleSubmit(event) {
//         // alert('An essay was submitted: ' + this.state.value);
//         this.state.calendario.push({
//             dia: dia,
//             tipoHorario: tipoHorario,
//             fecha: fecha,
//             //precio_venta : this.activo.precio_venta
//           });
//         event.preventDefault();
//     }

//     render() {
//         const { calendario } = this.state;
//         const {form}=this.state
//         return (
//             <>
//                 <form onSubmit={this.handleSubmit}>
//                 <input type="text" name="dia"/>
//                 <input type="text"name="tipoHorario"/>
//                 <input type="text"name="fecha"/>
//                     <input type="submit" value="Submit" />
//                 </form>
//                 <Table striped bordered hover>
//                         <thead>
//                             <tr>
//                                 <th>Dia</th>
//                                 <th>Tipo horario</th>
//                                 <th>Fecha </th>
                                
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {/* <tr>
//                                 <td>1</td>
//                                 <td>Mark</td>
//                                 <td>Otto</td>
//                                 <td>@mdo</td>
//                             </tr>
//                             <tr>
//                                 <td>2</td>
//                                 <td>Jacob</td>
//                                 <td>Thornton</td>
//                                 <td>@fat</td>
//                             </tr> */}
//                              {(calendario)?
//                                 calendario.map(item => (
//                                     <tr >
//                                         <td>{item.dia}</td>
//                                         <td>{item.tipoHorario}</td>
//                                         <td>{item.fecha}</td>
                       
                                
//                                     </tr>
//                                 ))
//                                 :
//                                 <tr></tr>}
                   
//                         </tbody>
//                     </Table>

//             </>
//         );
//     }
// }
// export default EssayForm