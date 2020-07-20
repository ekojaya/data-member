import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../FirestoreConfig";
import { actions } from "../../store/SliceFireStore";
class ModalDelete_F extends Component {
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
      isLoading: false,
    };
  }

  // getData = () => {
  //   dataBase.collection("data").onSnapshot(
  //     (snapShot) => {
  //       this.setState({
  //         datas: snapShot.docs.map((doc) => {
  //           // console.log(doc.data().name);

  //           return {
  //             id: doc.id,
  //             name: doc.data().name,
  //             country: doc.data().country,
  //             birth: doc.data().birth,
  //             created_at: doc.data().created_at,
  //             IsChecked: false,
  //           };
  //         }),
  //       });
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // };

  componentWillMount() {
    console.log("component will mount");
  }
  componentWillReceiveProps({ datas }) {
    this.setState({
      datas,
    });
  }

  componentDidMount() {
    // this.getData();
    this.props.GET_DATA();
  }

  handleRemove = () => {
    this.setState({ isLoading: true });
    let datas = this.state.datas;
    console.log(datas);
    let datadelete = this.props.data;
    {
      datas.map((data) => {
        {
          for (var i = 0; i < datadelete.length; i++) {
            if (data.id === datadelete[i]) {
              dataBase.collection("data").doc(data.id).delete();
            }
          }
        }
      });
    }
    let body = document.getElementById("modal-delete-f");
    body.classList.remove("is-active");
  };
  render() {
    console.log(this.state.datas);
    return (
      <div className="modal" id="modal-delete-f">
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
                  let body = document.getElementById("modal-delete-f");
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
                  let body = document.getElementById("modal-delete-f");
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
export default connect(MapStateToProps, MapDispatchToProps)(ModalDelete_F);

// export default connect(MapStateToProps)(ModalDelete_F);
