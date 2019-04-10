import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    }
  }

  onSearch = () => {
    this.props.onSearch(this.state.keyword);
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value
    });
  }

  render() {
    var { keyword } = this.state;
    return (
      <div className="col-md-6">
        <div className="input-group">
          <input
            name="keyword"
            type="text"
            className="form-control"
            placeholder="Nhập từ khóa..."
            value = { keyword }
            onChange = { this.onChange }
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary btn-outline-secondary text-white"
              type="button" onClick = { () => this.onSearch() }
            >
              <i className="fas fa-search"> Search</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSearch: (keyword) => {
      dispatch(actions.searchTask(keyword));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
