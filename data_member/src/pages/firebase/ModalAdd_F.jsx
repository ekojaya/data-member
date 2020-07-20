import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../FirestoreConfig";
import { actions } from "../../store/SliceFireStore";
import bulma from "bulma";
class ModalAdd_F extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      country: "",
      birth: "",
      errors: {},
      isLoading: false,
    };
  }
  componentWillMount() {
    console.log("component will mount");
  }
  componentWillReceiveProps({ datas }) {
    this.setState({
      datas,
    });
  }
  handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value, isNew: true });
  };
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
    this.setState({ isLoading: !this.state.isLoading });
    var created_at = new Date()
      .toLocaleString("en-us", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2");

    //validation
    if (this.handleValidation()) {
      const { name, country, birth } = this.state;
      dataBase.collection("data").add({
        name,
        country,
        birth,
        created_at,
      });
      // .then(() => {
      //   console.log("berhasil");
      // })
      // .catch(() => {
      //   console.log("gagal");
      // });

      let body = document.getElementById("modal-add-f");
      body.classList.remove("is-active");
    }

    this.setState({ name: "", country: "", birth: "" });
    this.props.GET_DATA();
  };

  render() {
    return (
      <div className="modal" id="modal-add-f">
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
                  let body = document.getElementById("modal-add-f");
                  body.classList.remove("is-active");
                }}
              />
            </header>
            <section className="modal-card-body">
              {/* <form onSubmit={this.onSubmit}> */}
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
                  onClick={this.onSubmit}
                >
                  add
                </button>
              </div>
              {/* </form> */}
            </section>
          </div>
        </div>
      </div>
    );
  }
}
const MapStateToProps = (state) => {
  return {
    data: state.data.dataDelete,
    datas: state.datas.datas,
  };
};
const MapDispatchToProps = (dispatch) => {
  return {
    GET_DATA: () => dispatch(actions.getData()),
    // ADD_DATA: ({ name, country, birth }) =>
    //   dispatch(actions.addData({ name, country, birth })),
  };
};
export default connect(MapStateToProps, MapDispatchToProps)(ModalAdd_F);
