import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useRef } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data, created_date
      }
      return [newItem, ...state];
    }
    case 'REMOVE': {
      return state.filter((el) => el.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId
          ? {
            ...it,
            content: action.newContent
          }
          : it
      );
    }
    default:
      return state;
  }
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();


function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getDate = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments").then((res) => res.json());

    const initData = res.slice(0, 80).map(el => {
      return {
        author: el.email,
        content: el.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      }
    })
    dispatch({ type: "INIT", data: initData });
  }

  useEffect(() => {
    getDate();
  }, [])

  const onCreate = useCallback((author, emotion, content) => {
    dispatch({ type: 'CREATE', data: { author, content, emotion, id: dataId.current } });
    dataId.current++;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: 'REMOVE', targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit }
  }, []);


  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter(el => el.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio }
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <header className="App-header">
            <DiaryEditor />
            <div>?????? ?????? : {data.length}</div>
            <div>?????? ?????? ?????? ?????? : {goodCount}</div>
            <div>?????? ?????? ?????? ?????? : {badCount}</div>
            <div>?????? ?????? ?????? ?????? : {goodRatio}</div>
            <DiaryList />
          </header>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
