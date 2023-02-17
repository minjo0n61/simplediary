import { useContext } from 'react';
import { DiaryStateContext } from './App';
import DiaryItem from './DiaryItem';


const DiaryList = () => {

    const diary_List = useContext(DiaryStateContext);
    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diary_List.length}개의 일기가 있습니다.</h4>
            <div>
                {diary_List.map((el) => (
                    <DiaryItem key={el.id} {...el} />
                ))}
            </div>
        </div>
    )
}

DiaryList.defaultProps = {
    diary_List: []
}

export default DiaryList;