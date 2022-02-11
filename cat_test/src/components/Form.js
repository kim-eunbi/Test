import React from 'react';


//{}중괄호 안쓰고 ()를 써주면 return 없이 처리 가능
const Form = ({ updateMainCat }) => {
    const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
    const [value, setValue] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");



    // 인풋체인지를 폼안에서 할때마다 이벤트가 발생하고 대문자로 입력된다
    function handleInputChange(e) {
        const userValue = e.target.value;
        setErrorMessage('');
        if (includesHangul(userValue)) {
            setErrorMessage("한글은 입력할 수 없습니다.");
        }
        setValue(userValue.toUpperCase());
    }

    function handleFormSubmit(e) {
        setErrorMessage('');
        e.preventDefault();
        if (value === '') {
            setErrorMessage('입력하지않고 뭐하는데')
            return;
        }
        updateMainCat(value);
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                type="text"
                name="name"
                value={value} // 벨류 상태변경
                placeholder="영어 대사를 입력해주세요"
                onChange={handleInputChange} // 이벤트설정
            />
            <button type="submit">생성</button>
            <p style={{ color: "red" }}>{errorMessage}</p>
        </form>
    );
}

export default Form;