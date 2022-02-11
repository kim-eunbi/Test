// ES6 + 디스트럭처링 문법 적용 전 -> 후 
// props -> ({ img })
// props.img -> {img}
// 리액트에서는 class 를  className으로 작성
const MainCard = ({ img, onHeartClick }) => {
    return (
        <div className="main-card">
            <img src={img} alt="고양이" width="400" />
            <button onClick={onHeartClick}>🤍</button>
        </div>
    );
};

export default MainCard;