import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';

export default class Write extends Component {
  state = {
    title: '', //수정모드일 때 제목이 나오기 때문에 변수를 만들어줌
    content:'' //수정모드일 때 내용이 나오기 때문에 변수를 만들어줌
  }

  write = ()=>{
    Axios.post('http://localhost:8000/insert',{ //post방식으로 넘김
      title: this.state.title,
      content: this.state.content
    }) 
  .then( res=> {
    alert('등록 완료');
  })
  
  .catch(function (error) {
    // 에러 핸들링
    console.log(error);
  })
  }

  update = ()=>{
    Axios.post('http://localhost:8000/update',{ //post방식으로 넘김
      title: this.state.title,
      content: this.state.content
    }) 
  .then( res=> {
    alert('등록 완료');
  })
  
  .catch(function (error) {
    // 에러 핸들링
    console.log(error);
  })
  }

  inputHandler = (e)=>{
    this.setState(
      {[e.target.name]:e.target.value}
    )
  }
  render() {
    console.log(this.state)
    return (
      <>
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text"
                          name="title"
                          placeholder="제목을 입력하세요"
                          onChange={this.inputHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="content">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              onChange={this.inputHandler}
            />
          </Form.Group>
        </Form>
        <div className="d-flex gap-1">
          {/* ajax에선 3안연산자 사용 */}
          <Button variant="info" onClick={this.props.isModifyMode ? this.update : this.write}>작성완료</Button>
          <Button variant="secondary">취소</Button>
        </div>
      </>
    )
  }
}
