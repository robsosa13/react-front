import React, { Component } from 'react'
import { Container, Table, Jumbotron, Button } from 'react-bootstrap';

//import products from '../planilla/products'
class MarcaHora extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
        }
    }
    render() {

        return (
            <>
                <div className="container">
        <form 
            onSubmit={onSubmit}
        >
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="title" 
                    name="title"
                    onChange={onChange}
                    value={form.title}
                />
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="description" 
                    name="description"
                    onChange={onChange}
                    value={form.description}
                />
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="img" 
                    name="img"
                    onChange={onChange}
                    value={form.img}
                />
            </div>
            <div className="form-row">
                <div className="col">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="leftColor" 
                        name="leftColor"
                        onChange={onChange}
                        value={form.leftColor}
                    />
                </div>
                <div className="col">
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="rightColor" 
                        name="rightColor"
                        onChange={onChange}
                        value={form.rightColor}
                    />    
                </div>
            </div>
            
            <button 
                type="submit" 
                className="btn btn-primary float-right"
            >
                Submit
            </button>
        </form>
    </div>
            </>
        )
    }
}
export default MarcaHora