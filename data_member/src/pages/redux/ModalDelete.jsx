import React, { Component } from "react";
import { connect } from "react-redux";
import { createAction } from "@reduxjs/toolkit";
class ModalDelete extends Component {
  handleRemove = () => {
    let data = this.props.data;

    data.map((data1) => {
      if (data1.IsChecked === true) {
        let dataID = data1.id;
        console.log(dataID);
        this.props.REMOVEDATA(dataID);
      }
    });
    let body = document.getElementById("modal-delete");
    body.classList.remove("is-active");
  };
  render() {
    return (
      <div className="modal" id="modal-delete">
        <div>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Delete Data Member</p>
              <button
                className="delete"
                aria-label="close"
                onClick={(e) => {
                  e.preventDefault();
                  let body = document.getElementById("modal-delete");
                  body.classList.remove("is-active");
                }}
              />
            </header>
            <section className="modal-card-body">
              Are you sure for deleted this ?
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
                  let body = document.getElementById("modal-delete");
                  body.classList.remove("is-active");
                }}
              >
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
const MapStateToProps = (state) => {
  return {
    data: state.data,
  };
};
const MapDispatchToProps = (dispatch) => {
  const REMOVE_DATA = createAction("REMOVE_DATA");
  return {
    REMOVEDATA: (dataID) =>
      dispatch({
        type: REMOVE_DATA,
        payload: dataID,
      }),
  };
};

export default connect(MapStateToProps, MapDispatchToProps)(ModalDelete);
