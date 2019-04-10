import React, { Component } from "react";
import TaskItem from "./TaskItem";
import * as actions from "../actions/index";

import { connect } from 'react-redux';

class TaskList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1 // all: -1, active: 1, deactive: 0
    }
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    // this.props.onFilter(name === 'filterName' ? value : this.state.filterName, 
    //                     name === 'filterStatus' ? value: this.state.filterStatus);
    var filter = { 
      name: name === 'filterName' ? value : this.state.filterName,
      status: name === 'filterStatus' ? value: this.state.filterStatus
    }
    this.props.onFilterTable(filter);
    this.setState({
      [name]: value
    });
  }

  render() {
    let { tasks, filterTable, keyword } = this.props;
    let { sortName, sortValue } = this.props.sort

    if (filterTable.name) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
      })
    }
    
    tasks = tasks.filter((task) => {
      if (filterTable.status === -1) {
        return tasks;
      } else {
        return task.status === (filterTable.status === 1 ? true : false);
      }
    });

    tasks = tasks.filter((task) => {
      return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });

    if (sortName === 'sortName') {
      tasks.sort((a, b) => {
        var nameA = a.name.toUpperCase(); // bỏ qua hoa thường
        var nameB = b.name.toUpperCase(); // bỏ qua hoa thường
        if (sortValue === -1) {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        } else {
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
        }
      
        // name trùng nhau
        return 0;
      });
    }

    if (sortName === 'status') {
      if (sortValue === -1) {
        tasks = tasks.filter(task => {
          return task.status === true;
        });
      } else if (sortValue === 1) {
        tasks = tasks.filter(task => {
          return task.status === false;
        });
      }
    }

    var { filterName, filterStatus } = this.state;
    var elementTasks = tasks.map((task, index) => {
      return <TaskItem 
                      key={ task.id } index={ index } 
                      task= { task } 
                      />
    })
    return (
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered">
            <thead>
              <tr className="text-center">
                <th>STT</th>
                <th>Tên</th>
                <th>Trạng Thái</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td />
                <td>
                  <input type="text" className="form-control" name="filterName"
                  value= { filterName } onChange={ this.onChange }/>
                </td>
                <td>
                  <select className="form-control" 
                          name="filterStatus" 
                          value= { filterStatus }
                          onChange= { this.onChange }>
                    <option value={ -1 }>Tất cả</option>
                    <option value={ 0 }>Ẩn</option>
                    <option value={ 1 }>Kích Hoạt</option>
                  </select>
                </td>
                <td />
              </tr>
              { elementTasks }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    filterTable: state.filterTable,
    keyword: state.search,
    sort: state.sort
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterTable: (filter) => {
      dispatch(actions.filterTask(filter));
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps) (TaskList);
