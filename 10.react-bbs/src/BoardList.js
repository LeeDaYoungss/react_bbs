import React, { Component, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Board from './Board';
import { Link, useNavigate } from 'react-router-dom';




// 함수형

/* 수정 프로세스 정리 요약

boardList 숫자 체크 수정
hamdleModify, id 전달

App.js
모드수정
boardId 반영(변경)
👇🏻
Write.js
handleCancle 실행
👇🏻
App.js
handleCancle 실행 -> isComplete (false)
👇🏻
BoardList.js
isComplete (false) 로 넘어옴
getList() 실행
renderComplete 함수 부모 전달
👇🏻
App.js
renderComplete -> setComplete
*/

function BoardList(props){
  const [boardList, setBoardList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [boardId, setBoardId] = useState(0);
  const navigate = useNavigate();

  let getList = () => {
    Axios.get('http://localhost:8000/list')
    .then(res => {
      const data = res.data;
      setBoardList(data);
      setCheckList([]);
      setBoardId(0);
      props.renderComplete(); // 목록 출력 완료
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  useEffect(()=>{
    getList(); 
  },[]) // 최초 한번 실행, 결과가 나오면 실행

  let onCheckboxChange = (checked, id) => {
    let list = checkList;
    if (checked) {
      if (list.indexOf(id) === -1) {
        list.push(id);
      }
    } else {
      let idx = list.indexOf(id);
      list.splice(idx, 1);
    }
    setCheckList(list);
  };
  let handleModify = () => {
    let checklist = checkList;
    if (checklist.length === 0) {
      alert('최소 하나를 체크해주세요');
    } else if (checklist.length > 1) {
      alert('하나만 체크해주세요');
    } else {
      setBoardId(checklist[0]); 
      props.handleModify(checklist[0]);
      navigate("/write");
    }    
  };
  let handleDelete = () => {
    //체크 항목이 없으면 '삭제할 게시글을 선택하세요' 경고창 
    if(checkList.length === 0){
      alert('삭제할 게시글을 선택하세요');
    }
    let boardIdList = '';;
    checkList.forEach(item=>{
      boardIdList += `'${item}',`;
    });
    
    Axios.post('http://localhost:8000/delete',{
      boardIdList : boardIdList.substring(0, boardIdList.length -1)
     })
    .then( res => {     
      getList();
    })
    .catch(function (error) {     
      console.log(error);
    });
  };
  useEffect(()=>{
    if(!props.isComplete){
      getList();
    }
  },[props.isComplete])
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">선택</th>
            <th scope="col">번호</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">작성일</th>
          </tr>
        </thead>
        <tbody>
          {
            boardList.map(item => (
              <Board key={item.id} data={item} onCheckboxChange={onCheckboxChange} />
            ))
          }
        </tbody>
      </table>
      <div className="d-flex justify-content-between gap-3">
        <div className="d-flex gap-1">
        
          <Button variant="info" onClick={handleModify}>수정</Button>
        
          <Button variant="danger"  onClick={handleDelete}>삭제</Button>
        </div>
        <Link to="/write">
          <Button variant="primary">글쓰기</Button>
        </Link>          
      </div>
    </>
  );
}

export default BoardList;


/* class형
export default class BoardList extends Component {
  state = {
    boardList : [],
    checkList : [],
    boardId : 0
  };

  getList = ()=>{
    Axios.get('http://localhost:8000/list')
  .then( res=> {
    const {data} = res; //같은 문장 -> const data = res.data;
    this.setState({
      boardList:data,
      checkList: [],
      boardId:0
    })
    this.props.renderComplete(); //목록 출력 완료
  })
  .catch(function (error) {
    // 에러 핸들링
    console.log(error);
  })
  }
  componentDidMount(){
    this.getList(); //최초 한번 작동, 서버의 결과가 나오면 한번 더 실행
  }
  onCheckboxChange = (checked, id)=>{

    //기존배열에서 중복제거, 새값이면 추가 (filter method w3schools 참조)
    let list = this.state.checkList.filter(v=>{
      return v !== Number(id);
    });

    // checked가 true일 때만 list 안에 id(번호 1, 2, 3)를 밀어넣음
    if(checked){
      if(list.indexOf(id) === -1){
        list.push(id);
      }
    } else {
      // id 2, false, index 번호를 찾아서(indexOf) splice 해줌
      let idx = list.indexOf(id);
      list.splice(idx, 1);
    }
    this.setState({
      checkList:list
    });
  }

  handleModify = ()=>{
    let checklist = this.state.checkList;
    if(checklist.length === 0){
      alert('최소 하나를 체크해주세요');
    }else if(checklist.length > 1){
      alert('하나만 체크해주세요');
    }
    this.setState({
      boardId : checklist[0]
    });

    this.props.handleModify(checklist[0]);
  };

  handleDelete = ()=>{
    if(this.state.checkList.length === 0){
      alert('삭제할 게시글을 선택하세요');
    }
    let boardIdList = '';
    // let boardIdList = this.state.checkList.join();
    this.state.checkList.forEach(item=>{
      boardIdList += `'${item}',`;
    })
    console.log(boardIdList);

    Axios.post('http://localhost:8000/delete',{

      // 마지막 번호에서 쉼표를 빼주기
      boardIdList : boardIdList.substring(0, boardIdList.length -1)
    })
    .then(res => {
      this.getList();
    })
    .catch(function(error){
      console.log(error);
    })
  };

  componentDidUpdate = (prevProps, prevState)=>{
    if(this.state.checkList.length === 1 && this.state.boardId !== prevState.boardId){
      this.props.handleModify(this.state.boardId);
    }

    if(!this.props.isComplete && prevProps.isComplete !== this.props.isComplete){
      this.getList(); //false일때만 다시 불러옴 
    }
  }
  resetCheckList = () =>{
    this.setState({
      checkList:[]
    })
  }

  render() {
    console.log(this.state.boardList);
    return (
      <>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">선택</th>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">작성일</th>
            </tr>
          </thead>
          <tbody>
            {
              // map 반복문 return(<tr> 추가)
              this.state.boardList.map(item=>{
                return(
                  // Board 컴포넌트 불러오기
                  <Board key={item.id} data={item} onCheckboxChange={this.onCheckboxChange}/>
                  // onCheckboxChange -> 할일은 넘어온 값이 true/false 인지 구분해줌
                )}
              )
            }
          </tbody>
        </table>
        <div className="d-flex justify-content-between gap-3">
          <div className="d-flex gap-1">

              <Button variant="info" onClick={()=>{
                수정
                체크하지 않고 수정을 누르면 '최소 하나를 체크해주세요'
                두개 이상 체크하고 수정을 누르면 '하나만 체크해주세요'
                
                this.handleModify();
              }}>수정</Button>

            <Button variant="danger" onClick={this.handleDelete}>삭제</Button>
          </div>

          Link 함수로 write 페이지로 이동
          <Link to="/write"> 
            <Button variant="primary">글쓰기</Button>
          </Link>
          
        </div>
      </>
      
    )
  }
}
*/
