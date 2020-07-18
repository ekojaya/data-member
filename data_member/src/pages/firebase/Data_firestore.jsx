import React, { Component } from "react";
import * as Icon from "react-feather";
import dataBase from "../../FirestoreConfig";
import bulma from "bulma";
import Header from "../../component/Header";
import ModalAdd_F from "./ModalAdd_F";
import ModalDelete_F from "./ModalDelete_F";
import { connect } from "react-redux";

class Data_firestore extends Component {
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
      datas: [],
      errors: {},

      sort: {
        column: null,
        direction: "desc",
      },
    };
  }

  handleCheck = (e) => {
    let NewData = this.state.datas;
    NewData.map((data) => {
      if (data.id.toString() === e.target.value)
        data.IsChecked = e.target.checked;
    });
    this.setState({ datas: NewData });
  };

  handleAllChecked = (event) => {
    let AllData = this.state.datas;
    AllData.map((data) => (data.IsChecked = event.target.checked));
    this.setState({ datas: AllData });
  };

  handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  };

  handleAdd = () => {
    let body = document.getElementById("modal-add-f");
    body.classList.toggle("is-active");
  };
  handleDelete = () => {
    let checkedBoxes = document.querySelectorAll("input[name=chkBox]:checked")
      .length;

    if (checkedBoxes > 0) {
      {
        let data_deletF = this.state.datas.map((data) => {
          if (data.IsChecked === true) return data.id;
        });
        console.log(data_deletF);
        this.props.DATADELETE(data_deletF);
      }

      let body = document.getElementById("modal-delete-f");
      body.classList.toggle("is-active");
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
    const sortedData = this.state.datas.sort((a, b) => {
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

  getData = () => {
    dataBase.collection("data").onSnapshot(
      (snapShot) => {
        this.setState({
          datas: snapShot.docs.map((doc) => {
            // console.log(doc.data().name);

            return {
              id: doc.id,
              name: doc.data().name,
              country: doc.data().country,
              birth: doc.data().birth,
              created_at: doc.data().created_at,
              IsChecked: false,
            };
          }),
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  componentDidMount() {
    this.getData();
  }

  getEdit = (id) => {
    let docRef = dataBase.collection("data").doc(id);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({
            name: doc.data().name,
            country: doc.data().country,
            birth: doc.data().birth,
            created_at: doc.data().created_at,
            edit: true,
            id: doc.id,
          });
          let body = document.getElementById("modal-upd-f");
          body.classList.toggle("is-active");
        } else {
          console.log("dokumen not found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  HandleUpdate = () => {
    const { id, name, country, birth, created_at } = this.state;

    dataBase
      .collection("data")
      .doc(id)
      .update({
        name,
        country,
        birth,
        created_at,
      })
      .then(() => {
        console.log("berhasil");
      })
      .catch((err) => {
        console.log(err);
      });

    let body = document.getElementById("modal-upd-f");
    body.classList.remove("is-active");

    this.setState({
      name: "",
      id: "",
      edit: false,
      IsChecked: false,
      country: "",
      birth: "",
      created_at: "",
    });
  };
  getDelete = (id) => {
    let data = this.state.datas;

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
          let body = document.getElementById("modal-del-f");
          body.classList.toggle("is-active");
        }
      });
    }
  };

  handleRemove = () => {
    let id = this.state.id;
    dataBase.collection("data").doc(id).delete();
    let body = document.getElementById("modal-del-f");
    body.classList.remove("is-active");

    // .then(() => {
    //   console.log("berhasil");
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  render() {
    console.log(this.state.datas);
    let filteredContacts = this.state.datas.filter((data1) => {
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
                  <h4 className="title">React JS + Firestore + Redux</h4>
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
                        <th style={{ width: "7%" }}>
                          <input
                            type="checkbox"
                            onChange={this.handleAllChecked}
                          />{" "}
                          ALL
                        </th>
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
                          Birth Date
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
                            <td>
                              <input
                                type="checkbox"
                                key={newdata.id}
                                onChange={this.handleCheck}
                                checked={newdata.IsChecked}
                                value={newdata.id}
                                name="chkBox"
                              />
                            </td>
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
                <div className="field is-grouped">
                  <div className="control">
                    <button
                      className="button is-link is-danger"
                      onClick={this.handleDelete}
                    >
                      <Icon.Trash size="20" /> <span> Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <ModalAdd_F />
            <ModalDelete_F />

            <div className="modal" id="modal-upd-f">
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
                        let body = document.getElementById("modal-upd-f");
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

            <div className="modal" id="modal-del-f">
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
                        let body = document.getElementById("modal-del-f");
                        body.classList.remove("is-active");
                      }}
                    />
                  </header>
                  <section className="modal-card-body">
                    Are you sure for deleted{" "}
                    <span style={{ color: "red" }}>{this.state.name}</span>?
                  </section>
                  <footer className="modal-card-foot">
                    <button
                      className="button is-link is-danger"
                      onClick={this.handleRemove}
                    >
                      Delete
                    </button>
                    <button
                      className="button is-link is-light"
                      onClick={(e) => {
                        e.preventDefault();
                        let body = document.getElementById("modal-del-f");
                        body.classList.remove("is-active");
                      }}
                    >
                      Cancel
                    </button>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const MapDispatchToProps = (dispacth) => {
  return {
    //send data for delete checked
    DATADELETE: (data_deletF) =>
      dispacth({
        type: "DATA_DELETE_F",
        payload: data_deletF,
      }),
  };
};

export default connect(null, MapDispatchToProps)(Data_firestore);
