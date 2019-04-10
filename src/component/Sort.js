import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";

class Sort extends Component {

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
  }

  onClick = (sortName, sortValue) => {
    this.props.onSort({sortName, sortValue});
  }

  render() {
    let { sortName, sortValue } = this.props.sort

    return (
      <div className="col-md-6">
        <div className="btn-group">
          <button type="button" className="btn btn-primary">
            Sắp Xếp
          </button>
          <button
            type="button"
            className="btn btn-primary dropdown-toggle dropdown-toggle-split"
            id="dropdownMenuReference"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            data-reference="parent"
          >
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenuReference"
          >
            <li className="dropdown-item" href="/" onClick={() =>  this.onClick('sortName', -1)}>
              <p role="button">
                <span className="fas fa-sort-alpha-down"> Tên A-Z 
                <i className={ sortName === 'sortName' && sortValue === -1 ? 'fas fa-check': ''}></i>
                </span>
              </p>
            </li>
            <li className="dropdown-item" href="/" onClick={() =>  this.onClick('sortName', 1)}>
              <p role="button">
                <span className="fas fa-sort-alpha-up"> Tên Z-A
                <i className={ sortName === 'sortName' && sortValue === 1 ? 'fas fa-check': ''}></i>
                </span>
              </p>
            </li>
            <div className="dropdown-divider" />
            <li className="dropdown-item" href="/" onClick={() =>  this.onClick('status', -1)}>
              <p role="button">
                <span>Trạng Thái Kích Hoạt
                <i className={ sortName === 'status' && sortValue === -1 ? 'fas fa-check': ''}></i>
                </span>
              </p>
            </li>
            <li className="dropdown-item" href="/" onClick={() =>  this.onClick('status', 1)}>
              <p role="button">
                <span>Trạng Thái Ẩn
                <i className={ sortName === 'status' && sortValue === 1 ? 'fas fa-check': ''}></i>
                </span>
              </p>
            </li>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sort: state.sort
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSort: (sort) => {
      dispatch(actions.sortTask(sort));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);

