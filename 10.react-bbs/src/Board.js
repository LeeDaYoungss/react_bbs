import React, { Component } from 'react'

export default class Board extends Component {
  render() {
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
        <td>{this.props.data.title}</td>
        <td>{this.props.data.user_id}</td>
        <td>{this.props.data.update_date}</td>
      </tr>
      </>
    )
  }
}
