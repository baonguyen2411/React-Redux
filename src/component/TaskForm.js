import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";

class TaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      status: false
    }
  }

  componentWillMount() {
    var task = this.props.itemEditing
    if (this.props.itemEditing && this.props.itemEditing.id !== '') {
      this.setState({
        id: task.id,
        name: task.name,
        status: task.status
      });
    } else {
      this.onClear();
    }
  }

  componentWillReceiveProps(nextProps) {
    var task = nextProps.itemEditing
    if (nextProps && nextProps.itemEditing && nextProps.itemEditing.id !== '') {
      this.setState({
        id: task.id,
        name: task.name,
        status: task.status
      });
    } else {
      this.setState({
        id: '',
        name: '',
        status: false
      });
    }
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value
    if (name === 'status') {
      value = target.value === 'true' ? true : false;
    }
    this.setState({
      [name]: value
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSaveTask(this.state);
    this.onClear();
    this.onCloseForm();
  }

  onClear = () => {
    console.log();
    this.setState({
      id: '',
      name: '',
      status: false
    })
  }

  render() {
    if (!this.props.isDisplayForm) { return null}
    return (
      <div className="card border-info mb-3">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">{ this.state.id === '' ? 'Thêm Công Việc' : 'Sửa Công Việc' }</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={ this.onCloseForm }>
              <span aria-hidden="true" className="text-white">&times;</span>
            </button>
          </div>
        <div className="card-body text-info">
          <form onSubmit={ this.onSubmit }>
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={ this.state.name }
                onChange={ this.onChange }
                placeholder="Nhập tên..."
              />
            </div>
            <div className="form-group">
              <label>Trạng Thái :</label>
              <select className="form-control" name="status" value={ this.state.status } onChange={ this.onChange }>
                <option value={ false }>Ẩn</option>
                <option value={ true }>Kích Hoạt</option>
              </select>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-warning mr-2">
                <span className="text-white">
                  <i className="fas fa-plus"> Lưu Lại</i>
                </span>
              </button>
              <button type="reset" className="btn btn-danger" onClick={ this.onClear }>
                <span className="text-white">
                  <i className="fas fa-times"> Hủy Bỏ</i>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSaveTask: (task) => {
      dispatch(actions.saveTask(task));
    },
    onCloseForm: () => {
      dispatch(actions.closeForm());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
