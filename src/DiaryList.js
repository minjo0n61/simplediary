import DiaryItem from './DiaryItem';


const DiaryList = ({ onEdit, onRemove, diary_List }) => {
    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diary_List.length}개의 일기가 있습니다.</h4>
            <div>
                {diary_List.map((el) => (
                    <DiaryItem key={el.id} {...el} onEdit={onEdit} onRemove={onRemove} />
                ))}
            </div>
        </div>
    )
}

DiaryList.defaultProps = {
    diary_List: []
}

export default DiaryList;