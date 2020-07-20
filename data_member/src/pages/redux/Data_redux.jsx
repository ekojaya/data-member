import React, { Component } from "react";
import * as Icon from "react-feather";
import bulma from "bulma";
import Header from "../../component/Header";
import { connect } from "react-redux";
import ModalAdd from "./ModalAdd";
import ModalDelete from "./ModalDelete";
import { createAction } from "@reduxjs/toolkit";
import { REMOVE_DATA, UPDATE_DATA } from "../../store/SliceData";
class Data_redux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      country: "",
      birth: "",
      search: "",
      id: "",
      created_at: "",
      IsChecked: "",
      errors: {},
      sort: {
        column: null,
        direction: "desc",
      },
    };
  }

  handleCheck = (e) => {
    let NewData = this.props.data;
    NewData.map((data) => {
      if (data.id.toString() === e.target.value)
        data.IsChecked = e.target.checked;
    });
    this.setState({ data: NewData });
  };

  handleAllChecked = (event) => {
    let AllData = this.props.data;
    AllData.map((data) => (data.IsChecked = event.target.checked));
    this.setState({ data: AllData });
  };

  handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  };

  handleAdd = () => {
    let body = document.getElementById("modal-add");
    body.classList.toggle("is-active");
  };
  getEdit = (id) => {
    let data = this.props.data;

    {
      data.map((data1) => {
        if (data1.id === id) {
          this.setState({
            id: data1.id,
            created_at: data1.created_at,

            name: data1.name,
            country: data1.country,
            birth: data1.birth,
            IsChecked: false,
          });
          let body = document.getElementById("modal-upd");
          body.classList.toggle("is-active");
        }
      });
    }
  };
  getDelete = (id) => {
    let data = this.props.data;

    {
      data.map((data1) => {
        if (data1.id === id) {
          this.setState({
            id: data1.id,
            created_at: data1.created_at,
            name: data1.name,
            country: data1.country,
            birth: data1.birth,
            IsChecked: false,
          });
          let body = document.getElementById("modal-del");
          body.classList.toggle("is-active");
        }
      });
    }
  };
  handleValidation() {
    let name = this.state.name;
    let country = this.state.country;
    let birth = this.state.birth;
    let errors = {};
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }
    if (!country) {
      formIsValid = false;
      errors["country"] = "Cannot be empty";
    }
    if (!birth) {
      formIsValid = false;
      errors["birth"] = "Cannot be empty";
    }
    this.setState({ errors: errors });
    return formIsValid;
  }
  HandleUpdate = () => {
    const formdata = {
      id: this.state.id,
      name: this.state.name,
      country: this.state.country,
      birth: this.state.birth,
      created_at: this.state.created_at,
      IsChecked: false,
    };
    if (this.handleValidation()) {
      this.props.UPDATEDATA(formdata);

      let body = document.getElementById("modal-upd");
      body.classList.remove("is-active");
    }
  };
  handleRemove = () => {
    let id = this.state.id;
    this.props.REMOVEDATA(id);
    let body = document.getElementById("modal-del");
    body.classList.remove("is-active");
  };
  handleSearch = (e) => {
    this.setState({
      search: e.target.value.substr(0, 12),
    });
  };
  onSort = (column) => (e) => {
    const direction = this.state.sort.column
      ? this.state.sort.direction === "asc"
        ? "desc"
        : "asc"
      : "desc";
    const sortedData = this.props.data.sort((a, b) => {
      if (column === "name") {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      } else if (column === "country") {
        const countryA = a.country.toUpperCase();
        const countryB = b.country.toUpperCase();
        if (countryA < countryB) {
          return -1;
        }
        if (countryA > countryB) {
          return 1;
        }

        return 0;
      } else if (column === "birth") {
        const birthA = a.birth.toString();
        const birthB = b.birth.toString();
        if (birthA < birthB) {
          return -1;
        }
        if (birthA > birthB) {
          return 1;
        }

        return 0;
      } else {
        return a.id - b.id;
      }
    });

    if (direction === "desc") {
      sortedData.reverse();
    }

    this.setState({
      data: sortedData,
      sort: {
        column,
        direction,
      },
    });
  };

  setArrow = (column) => {
    let className = "sort-direction";

    if (this.state.sort.column === column) {
      className += this.state.sort.direction === "asc" ? " asc" : " desc";
    }

    console.log(className);

    return className;
  };

  render() {
    console.log(this.props.data);
    let filteredContacts = this.props.data.filter((data1) => {
      return (
        data1.id.toString().includes(this.state.search.toString()) ||
        data1.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
        data1.country.toLowerCase().includes(this.state.search.toLowerCase()) ||
        data1.birth.toString().includes(this.state.search.toString())
      );
    });

    return (
      <div>
        <Header />
        <section className="section">
          <div className="container">
            <div className="card">
              <header className="card-header navbar is-primary">
                <div className="card-header-title">
                  <h4 className="title">React JS + Redux ToolKit </h4>
                </div>
              </header>

              <div className="card-content " style={{ marginBottom: "-40px" }}>
                <div className="columns is-mobile">
                  <div className="column">
                    <button
                      style={{
                        float: "right",
                        marginRight: "10px",
                        marginBottom: "10px",
                      }}
                      className="button is-link is-info"
                      onClick={this.handleAdd}
                    >
                      <Icon.Plus size="20" /> <span> Add</span>
                    </button>
                    <input
                      className="input"
                      style={{
                        width: "200px",
                        float: "right",
                        marginRight: "10px",
                        marginBottom: "10px",
                      }}
                      id="search"
                      placeholder="search"
                      name="search"
                      // value={this.state.search}
                      onChange={this.handleSearch}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="card-content ">
                <div className="table-container">
                  <table
                    className="table is-bordered"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th onClick={this.onSort("id")}>
                          # ID
                          <span className={this.setArrow("id")}>{"  "}</span>
                        </th>
                        <th onClick={this.onSort("name")}>
                          Name <span style={{ color: "blue" }}>click</span>
                          <span className={this.setArrow("name")}>{"  "}</span>
                        </th>
                        <th onClick={this.onSort("country")}>
                          Country
                          <span className={this.setArrow("country")}>
                            {"  "}
                          </span>
                        </th>
                        <th onClick={this.onSort("birth")}>
                          birth
                          <span className={this.setArrow("birth")}>{"  "}</span>
                        </th>
                        <th>Created At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts.map((newdata, index) => {
                        return (
                          <tr key={index}>
                            <td>{newdata.id}</td>
                            <td>{newdata.name}</td>
                            <td>{newdata.country}</td>
                            <td>{newdata.birth}</td>
                            <td>{newdata.created_at}</td>

                            <td>
                              <button
                                className="button is-primary"
                                onClick={() => {
                                  this.getEdit(newdata.id);
                                }}
                              >
                                Edit
                              </button>{" "}
                              <button
                                className="button is-danger"
                                onClick={() => {
                                  this.getDelete(newdata.id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>{" "}
                </div>
                {/* <div className="has-text-centered content"> */}
              </div>
            </div>

            <ModalAdd />
            <ModalDelete />
            <div className="modal" id="modal-del">
              <div>
                <div className="modal-background" />
                <div className="modal-card">
                  <header className="modal-card-head">
                    <p className="modal-card-title">Delete a Data Member</p>
                    <button
                      className="delete"
                      aria-label="close"
                      onClick={(e) => {
                        e.preventDefault();
                        let body = document.getElementById("modal-del");
                        body.classList.remove("is-active");
                      }}
                    />
                  </header>
                  <section className="modal-card-body">
                    Are you sure for deleted{" "}
                    <span style={{ color: "red" }}>{this.state.name}</span>?
                  </section>
                  <footer className="modal-card-foot">
                    <form onSubmit={this.handleRemove}>
                      <button
                        className="button is-link is-danger"
                        // onClick={this.handleRemove}
                      >
                        Delete
                      </button>
                      <button
                        className="button is-link is-light"
                        onClick={(e) => {
                          e.preventDefault();
                          let body = document.getElementById("modal-del");
                          body.classList.remove("is-active");
                        }}
                      >
                        Cancel
                      </button>
                    </form>
                  </footer>
                </div>
              </div>
            </div>

            <div className="modal" id="modal-upd">
              <div>
                <div className="modal-background" />
                <div className="modal-card">
                  <header className="modal-card-head">
                    <p className="modal-card-title">Update a Data Member</p>
                    <button
                      className="delete"
                      aria-label="close"
                      onClick={(e) => {
                        e.preventDefault();
                        let body = document.getElementById("modal-upd");
                        body.classList.remove("is-active");
                      }}
                    />
                  </header>
                  <section className="modal-card-body">
                    {/* <form onSubmit={this.HandleUpdate}> */}
                    <div className="field">
                      <label className="label">Name</label>
                      <div className="control">
                        <input
                          className="input"
                          id="name"
                          placeholder="Name"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleInput}
                          required
                        />
                        <span style={{ color: "red" }}>
                          {this.state.errors["name"]}
                        </span>
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Country</label>
                      <div className="control">
                        <input
                          className="input"
                          id="country"
                          placeholder="Country"
                          name="country"
                          value={this.state.country}
                          onChange={this.handleInput}
                          required
                        />
                        <span style={{ color: "red" }}>
                          {this.state.errors["country"]}
                        </span>
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Birth</label>
                      <div className="control">
                        <input
                          className="input"
                          // id="DateText"
                          id="birth"
                          type="date"
                          value={this.state.birth}
                          name="birth"
                          onChange={this.handleInput}
                          required
                        />
                        <span style={{ color: "red" }}>
                          {this.state.errors["birth"]}
                        </span>
                      </div>
                    </div>
                    <button
                      className="button is-link is-primary"
                      onClick={this.HandleUpdate}
                    >
                      Update
                    </button>
                    {/* </form> */}
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const MapStateToProps = (state) => {
  return {
    data: state.data.data,
  };
};
const MApDispatchToProps = (dispatch) => {
  // const UPDATE_DATA = createAction("UPDATE_DATA");
  // const REMOVE_DATA = createAction("REMOVE_DATA");
  return {
    UPDATEDATA: (formdata) =>
      dispatch({
        type: UPDATE_DATA,
        payload: formdata,
      }),
    REMOVEDATA: (id) =>
      dispatch({
        type: REMOVE_DATA,
        payload: id,
      }),
  };
};

export default connect(MapStateToProps, MApDispatchToProps)(Data_redux);
