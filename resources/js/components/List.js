import { Component } from 'react';


class List extends Component {
    constructor(props) { // why we use constructor here and pass props
        super(props) 
    }
    render() {
        return (
            <div className="col-12 mt-4">
                <ul className="list-group">
                    {
                        this.props.dir.map(item => (
                            <li className="list-group-item"
                                key={item.id}>
                                <div className="row">
                                    <div className="col-3">
                                        <b>Name:</b> {item.name}
                                    </div>
                                    <div className="col-3">
                                        <b>Phone:</b> {item.phone}
                                    </div>
                                </div>
                                <span className="float-right">
                                    <button className="btn btn-primary btn-sm mr-2"
                                      onClick={(e) => this.props.view(item, e)}>View</button>
                                  
                                </span>
                                <span className="float-right">
                                    <button className="btn btn-success btn-sm mr-2"
                                        onClick={(e) => this.props.edit(item.id, e)}
                                    >Edit</button>
                                </span>
                                <span className="float-right">
                                    <button className="btn btn-danger btn-sm mr-2"
                                        onClick={(e) => this.props.delete(item.id, e)}
                                    >Delete</button>
                                </span>
                            </li>
                        ))

                    }



                </ul>


            </div>
        );
    }
}
export default List;