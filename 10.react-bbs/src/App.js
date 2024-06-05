import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BoardList from './BoardList';
import Write from './Write';
import React, { useState } from 'react';

function App() {
  const[isModifyMode, setMode]=useState(false);
  const[boardId, setBoardId] = useState(0);
  const[isComplete, setComplete] = useState(true);

  const handleModify = (id)=>{
    setMode(true); // 아이디가 넘어오면 수정모드로 바꿈
    setBoardId(id);
  }
  const handleCancle = ()=>{
    setComplete(false);
    setMode(false);
    setBoardId(0); // 아이디도 초기값으로 바꿔줌
    clearCheckbox();
  }
  const renderComplete = ()=>{
    setComplete(true);
  }
  const clearCheckbox = ()=>{
    let checkboxs = document.querySelectorAll('.table input');
    checkboxs.forEach(item=>{
      item.checked = false;
    });
  }


  return (
    <div className="container">
      <BoardList isComplete={isComplete} handleModify={handleModify} renderComplete={renderComplete}/>
      <Write 
        clearCheckbox={clearCheckbox}
        handleCancle={handleCancle}
        isModifyMode={isModifyMode}
        boardId = {boardId}/>
    </div>
  );
}

export default App;
