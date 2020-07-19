import React, { Component } from "react";
import { connect } from "react-redux";
import bulma from "bulma";
import { createAction } from "@reduxjs/toolkit";
class ModalAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      required: true,
      name: "",
      country: "",
      birth: "",

      errors: {},
      isLoading: false,
    };
  }
  //validation
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
  // submit data
  onSubmit = () => {
    var rightNow = new Date()
      .toLocaleString("en-us", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2");
    const formdata = {
      id: new Date().getTime(),

      name: this.state.name,
      country: this.state.country,
      birth: this.state.birth,

      created_at: rightNow,
      IsChecked: false,
    };
    //validation
    if (this.handleValidation()) {
      this.props.AddData(formdata);

      let body = document.getElementById("modal-add");
      body.classList.remove("is-active");
    }

    this.setState({ name: "", country: "", birth: "" });
  };
  //handle input
  handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value, isNew: true });
  };

  render() {
    return (
      <div className="modal" id="modal-add">
        <div>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Add a New Member</p>
              <button
                className="delete"
                aria-label="close"
                onClick={(e) => {
                  e.preventDefault();
                  let body = document.getElementById("modal-add");
                  body.classList.remove("is-active");
                }}
              />
            </header>
            <section className="modal-card-body">
              <form onSubmit={this.onSubmit}>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      className="input"
                      placeholder="Name"
                      defaultValue={""}
                      name="name"
                      value={this.state.name}
                      onChange={this.handleInput}
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
                      placeholder="Country"
                      defaultValue={""}
                      name="country"
                      value={this.state.country}
                      onChange={this.handleInput}
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
                      value={this.state.birth}
                      type="date"
                      name="birth"
                      onChange={this.handleInput}
                    />
                    <span style={{ color: "red" }}>
                      {this.state.errors["birth"]}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    className="button is-link is-primary"
                    // onClick={this.onSubmit}
                  >
                    add
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    );
  }
}
const MapDispatchToProps = (dispacth) => {
  const ADD_DATA = createAction("ADD_DATA");
  return {
    AddData: (formdata) =>
      dispacth({
        type: ADD_DATA,
        payload: formdata,
      }),
  };
};

const MapStateToProps = (state) => {
  return {
    data: state.data,
  };
};
export default connect(MapStateToProps, MapDispatchToProps)(ModalAdd);
