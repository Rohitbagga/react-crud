import { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import List from './List';
import View from './View';
class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dir: [],
            item: {
                name: "",
                phone: "",

            },
            isEditing: false,
            temp_id: null

        }
        this.handleChange = this.handleChange.bind(this);
        this.add = this.add.bind(this);
        this.fetchall = this.fetchall.bind(this); //why need to bind
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.update = this.update.bind(this);
    }
    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        let item = this.state.item;
        item[name] = value; // doubt
        this.setState({ item: item });

        console.log(this.state.item);
    }
    add(e) {
        e.preventDefault();

        axios.post('api/directory', this.state.item).then(response => {
            this.setState({
                item: {
                    name: "",
                    phone: ""
                },
                isEditing: false,
                temp_id: null
            })
            this.fetchall();
        });
    }
    componentDidMount() {
        this.fetchall();
    }
    fetchall() {

        axios.get('api/directory').then(response => {
            this.setState({
                dir: response.data

            })
            console.log(this.state.dir);

        });
    }
    delete(id) {
        axios.delete('api/directory/' + id).then(responce => { this.fetchall() });

    }
    edit(id) {
        let item = this.state.dir.filter(item => item.id === id)[0]
        if (item) {
            this.setState({
                isEditing: true,
                item: item,
                temp_id: item.id
            });
        }
    }
    update(e) {
        e.preventDefault();

        axios.put('api/directory/' + this.state.temp_id, this.state.item).then(response => {
          console.log(response);
            this.setState({
                item: {
                    name: "",
                    phone: ""
                },
                isEditing: false,
                temp_id: null
            })
            // this.fetchall();
        })
    }
    view(item) {
        alert(`
        name= ${item.name}\n
        phone=${item.phone}`)
    }
    render() {
        return (
            <div className="container">
                <h1>React-Laravel-Crud</h1>
                <div className="row mt-4">
                    <div className="col-5">
                        <form method="POST" onSubmit={this.state.isEditing ? this.update : this.add} >
                            <div className="mb-2">
                                <input type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter Name"
                                    value={this.state.item.name}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="mb-2">
                                <input type="text"
                                    name="phone"
                                    className="form-control"
                                    placeholder="Enter Phone"
                                    value={this.state.item.phone}
                                    onChange={this.handleChange} />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-success"

                            >{this.state.isEditing ? 'Update' : 'Insert'}</button>
                        </form>
                    </div>


                    <List dir={this.state.dir}
                        delete={this.delete}
                        edit={this.edit}
                        view={this.view}
                    ></List>
                    <View></View>
                </div>

            </div>

        );
    }
}
export default Directory;
if (document.getElementById('app')) {
    ReactDOM.render(<Directory />, document.getElementById('app'));
}