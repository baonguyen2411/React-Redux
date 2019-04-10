import React, { Component } from "react";

import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskItem extends Component {

  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id)
  }

  onDelete = () => {
    this.props.onDelete(this.props.task.id)
  }

  onUpdateTask = () => {
    // this.props.onUpdateTask(this.props.task);
    this.props.onOpenForm();
    this.props.onEditTask(this.props.task);
  }

  render() {
    var { task, index } = this.props;
    return (
      <tr className="text-center">
        <td>{ index + 1 }</td>
        <td>{ task.name }</td>
        <td>
          <label className={ task.status === true ? 'btn btn-outline-success' : 'btn btn-outline-warning' } onClick= { this.onUpdateStatus }>
            { task.status === true ? 'Kích Hoạt' : 'Ẩn' }
          </label>
        </td>
        <td>
          <div className="text-center">
            <button type="button" className="btn btn-warning mr-2" onClick= { this.onUpdateTask }>
              <span className="text-white">
                <i className="fas fa-pencil-alt"> Sửa</i>
              </span>
            </button>
            <button type="button" className="btn btn-danger" onClick= { this.onDelete }>
              <span className="text-white">
                <i className="fas fa-trash-alt"> Xóa</i>
              </span>
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdateStatus: (id) => {
      dispatch(actions.updateStatus(id));
    },
    onDelete: (id) => {
      dispatch(actions.deleteTask(id));
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    },
    onEditTask: (task) => {
      dispatch(actions.editTask(task));
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
