import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Board extends Component {
  render() {
    let date = this.props.data.update_date !== '0000-00-00' ? this.props.data.date.update_date : this.props.data.date;
    return (
      <>
      <tr>
        <th scope="row">
          <input 
            type="checkbox" 
            onChange={(e)=>{
              this.props.onCheckboxChange(
                e.target.checked,
                e.target.value
                )}
              }
            value={this.props.data.id}/>
        </th>
        <td>{this.props.data.id}</td>
        <td>
          <Link to={`/view?id=${this.props.data.id}`}>
            {this.props.data.title}
          </Link>
        </td>
        <td>{this.props.data.user_id}</td>
        <td>{date}</td>
      </tr>
      </>
    )
  }
}
