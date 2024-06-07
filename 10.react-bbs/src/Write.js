import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


// 함수형
function Write({boardId, handleCancle, isModifyMode}){
  const[form, setForm] = useState({
    title: '', 
    content:''
  });
  

  const navigate = useNavigate();

  let write = ()=>{
    Axios.post('http://localhost:8000/insert',{ //post방식으로 넘김
      title: form.title,
      content: form.content
    })
    .then( res=> {
      alert('등록 완료');
      navigate("/");
    })
    
    .catch(function (error) {
      // 에러 핸들링
      console.log(error);
    })
  }

  let update = ()=>{
    Axios.post('http://localhost:8000/update',{ //post방식으로 넘김
      // id, title, content 세개가 넘어옴
      id:boardId,
      title: form.title,
      content: form.content
    })
    .then( res => {
      alert('수정 완료');
      navigate("/");
  
      // 초기화 - 수정 성공하면 할 일
      setForm({
        title: '', 
        content:''
      });
      handleCancle();
    })
    
    .catch(function (error) {
      // 에러 핸들링
      console.log(error);
    })
    }

  let detail = ()=>{
    Axios.get(`http://localhost:8000/detail?id=${boardId}`)
      .then(res=> {
        if(res.data.length > 0){
          setForm({
            title:res.data[0].title,
            content:res.data[0].content,
          })
        }
      })

    .catch(function (error) {
      // 에러 핸들링
      console.log(error);
    })
  }
  useEffect(()=>{
    if(isModifyMode && boardId){
      detail();
    }
  },[isModifyMode, boardId])

  let inputHandler = (e)=>{

      if(e.target === 'title'){
        setForm({...form, title:e.target.value})
      }else{
        setForm({...form, content:e.target.value})
      }
    
  }

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text"
                        name="title"
                        placeholder="제목을 입력하세요"
                        onChange={inputHandler}
                        value={form.title}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="content"
            onChange={inputHandler}
            value={form.content}
          />
        </Form.Group>
      </Form>
      <div className="d-flex gap-1">
        <Button variant="info" onClick={isModifyMode ? update : write}>작성완료</Button>

        <Link to="/"> 
          <Button variant="secondary">취소</Button>
        </Link>
        
      </div>
    </>
  )

}

export default Write;

/* class형
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

  // 수정완료를 누르면 작동
  update = ()=>{
    Axios.post('http://localhost:8000/update',{ //post방식으로 넘김
      // id, title, content 세개가 넘어옴
      id:this.props.boardId,
      title: this.state.title,
      content: this.state.content
    })
  .then( res => {
    alert('수정 완료');

    // 초기화 - 수정 성공하면 할 일
    this.setState({
      title: '',
      content:''
    });
    this.props.handleCancle();
  })
  
  .catch(function (error) {
    // 에러 핸들링
    console.log(error);
  })
  }

  // 수정모드이면서 boardId가 있을때 작동
  // 번호의 글을 알려줄래? get방식으로!
  detail = ()=>{
    Axios.get(`http://localhost:8000/detail?id=${this.props.boardId}`)
      .then(res=> {
        if(res.data.length > 0){
          this.setState({
            title:res.data[0].title,
            content:res.data[0].content,
          })
        }
      })

.catch(function (error) {
  // 에러 핸들링
  console.log(error);
})
  }

  componentDidUpdate = (prevProps)=>{
    console.log('componentDidUpdate');
    // this.props.boarId(=> 아이디가 있는지 확인)
    if(this.props.isModifyMode && this.props.boardId !== prevProps.boardId){
      this.detail();
    }
  }
  // 수정 내용 표시
  componentDidMount = ()=>{
    this.detail();
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
                          value={this.state.title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="content">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              onChange={this.inputHandler}
              value={this.state.content}
            />
          </Form.Group>
        </Form>
        <div className="d-flex gap-1">
          ajax에선 3안연산자 사용 
          <Button variant="info" onClick={this.props.isModifyMode ? this.update : this.write}>작성완료</Button>

           Link 함수로 다시 리스트 페이지로 이동 
          <Link to="/"> 
            <Button variant="secondary">취소</Button>
          </Link>
          
        </div>
      </>
    )
  }
}*/
