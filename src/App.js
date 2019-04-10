import React, { Component } from 'react';
import './App.css';
import TaskForm from './component/TaskForm';
import Control from './component/Control';
import TaskList from './component/TaskList';
import {connect} from 'react-redux';
import * as actions from './actions/index';

class App extends Component {

  onToggleForm = () => {
    let { itemEditing } = this.props
    if (itemEditing && itemEditing.id !== '') {
      this.props.onOpenForm();
    } else {
      this.props.onToggleForm();
    }

    this.props.onClearTask({
      id: '',
      name: '',
      status: false
    });
  }

  render() {
    return (
      <div className="container">
        <div className="text-center mt-5">
          <h1>Quản Lý Công Việc</h1>
        </div>
        <hr></hr>
        <div className="row">
          <div className="col-md-4">
            <TaskForm/>
          </div>
          <div className={ this.props.isDisplayForm ? 'col-md-8' : 'col-md-12' }>
            <div className="row mb-3">
              <div className="col-md-12">
                <button className="btn btn-primary" type="submit" onClick={ this.onToggleForm }>
                  <span className="text-white">
                    <i className="fas fa-plus"> Thêm Công Việc</i>
                  </span>
                </button>
              </div>
            </div>
            <Control/>
            <TaskList onDelete= { this.onDelete } 
                      onUpdateTask= { this.onUpdateTask }
                      onFilter= { this.onFilter }/>
          </div>
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
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    onClearTask: (task) => {
      dispatch(actions.editTask(task));
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
