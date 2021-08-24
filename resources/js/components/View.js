import { Component } from 'react';

class View extends Component {
    constructor(props) { // why we use constructor here and pass props
        super(props)
    }
    render() {
        return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    {/* <ul>
                    <li>
                    
                    </li>
                    </ul> */}
                    <input className="form-control"></input>
                </div>

            </div>
        </div>

        );

    }
}
export default View;