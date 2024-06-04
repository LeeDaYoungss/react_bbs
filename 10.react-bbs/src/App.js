import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BoardList from './BoardList';
import Write from './Write';
import { useState } from 'react';

function App() {
  const[isModifyMode, setMode]=useState(false);

  const handleModify = ()=>{

  }
  return (
    <div className="container">
      <BoardList handleModify={this.handleModify}/>
      <Write isModifyMode={isModifyMode}/>
    </div>
  );
}

export default App;
