import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useState } from 'react';
import { useRef } from 'react';

// const dummy = [{
//   author: "chlals",
//   content: "asldfj",
//   emotion: 3,
//   created_date: new Date().getTime(),
//   id: 1,
// }, {
//   author: "chlals",
//   content: "asldfj",
//   emotion: 3,
//   created_date: new Date().getTime(),
//   id: 2,
// }
// ]



function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const onCreate = (author, emotion, content) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    }
    dataId.current++;
    setData([newItem, ...data]);

  };

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`)
    const newDiaryList = data.filter((el) => el.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((el) => el.id === targetId ? { ...el, content: newContent } : el)
    )
  };

  return (
    <div className="App">
      <header className="App-header">
        <DiaryEditor onCreate={onCreate} />
        <DiaryList onEdit={onEdit} onRemove={onRemove} diary_List={data} />
      </header>
    </div>
  );
}

export default App;
