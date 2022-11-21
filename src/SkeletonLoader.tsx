import { useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";

const SkeletonLoader: React.FC = (props) => {
  const [skeletonLoader, setSkeletonLoader] = useState<string[][]>([]);

  const buttonHandler = useCallback(() => {
    setSkeletonLoader([
      ["brink", "box", "title + text:5"],
      ["text:2"],
    ]);
  }, []);

  // 에디터 사용 하는법 공부 -> 문서화를 하기 위한 에디터
  // 렉시컬 -> 리액트에서 사용하기 편한 에디터 

  // 해야할 리스트
  // 1. box, circle 의 경우 콜론(:) 뒤에 오는 Number 대로 해당 넓이가 증가 감소하고 슬래시(/) 뒤에오는 Number 만큼 해당 높이가 증가 감소 하여아하는 로직
  // 1-1. 먼저 box뒤에 : 과 / 가 올경우를 상정하여 앞 뒤로 오는 Number 부분 짜르기
  // 1-2. : 뒤에 오는 Number 가 아닌 / 앞 뒤로 오는 Nubmer 로 식을 짜면 될것 같음
  // 1-3. Number 를 바깥으로 빼서 해당 값을 저장하여 사용
  // 2. Vue 라이브러리에서 확인하고 사용자가 해당 라이브러리 컴포넌트에 사용되는 속성이 무엇인지 파악하고, 파악한 속성을 props 로 전달 되는 형식의 로직
  // 3. 'brink' 부분을 뷰와는 다르게 'box' 와같은 형식으로 작성 하였는데 해당 부분을 이러한 식으로 짜도 되는지 리뷰 받기

  const boxContainer = (InitialValue: string) => {
    // item의 요소들 중에 "box" 가 존재할 경우
    if (InitialValue.includes("box")) {
      return <S.Box />;
    }
    // item의 요소들 중에 "circle" 가 존재할 경우
    if (InitialValue.includes("circle")) {
      return <S.Circle />;
    }
    // item의 요소들 중에 "brink" 가 존재할 경우
    if (InitialValue.includes("brink")) {
      return <S.Brink />;
    }
    // title + text:x 와같은 형식이 존재할 경우 + 를 제외하고 title 과 text 요소가 생성됨 => text 같은경우에는 뒤으 Number와같은 수의 요소가 생성됨
    return InitialValue
      .split("+")
      .map((Contents) => Contents.trim())
      .map((TitleAndTextContents, index) => (titleAndTextContainer(TitleAndTextContents, index)));
  }

  const titleAndTextContainer = (TitleAndTextContents: string, index: number) => {
    // item의 요소들 중에 "title" 이 존재할 경우
    if (TitleAndTextContents.includes("title")) {
      return <S.Title key={index} />;
    }
    // tiem의 요소들 중에 "text" 가 존재할 경우 && "text : 5 " 와 같은 형식일 경우 해당 콜론 뒤의 숫자 만큼 for 문이 돌아가는 걸 상정 해야함
    if (TitleAndTextContents.includes("text")) {
      if (TitleAndTextContents.includes(":")) {
        const count: number = Number(TitleAndTextContents.split(":")[1]);
        return [...Array(count).keys()].map((index) => (
          <S.Text key={index} />
        ));
      }
    }
  }

  return (
    <div>
      <button onClick={buttonHandler}>버튼</button>
      {/* skeletonLoader 안의 값으로 배열들이 있고 해당 배열 은 map 메소드를 이용해 item 으로 취급된다. 각 item 의 값 안에 'box','title', 'text' 등 이 존재할 경우에 각각의 스타일을 가진 요소들이 생성이 되는 로직 // item = ['box', 'title:5']*/}
      {skeletonLoader?.map((item: string[], index) => (
        <S.Total key={index}>
          {item?.map((element: string, index) => (<S.Container className={(element === 'box' || element === 'circle' || element === 'brink') ? 'own' : 'two'} key={index}>{boxContainer(element)}</S.Container>))}
        </S.Total>
      ))}
    </div>
  );
};


const loading = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

// ${(props) => props.color  형식으로  props 전달

const S = {
  //skeleton 전체를 감싸는 스타일 컴포넌트
  Total: styled.div`
  display: flex;
  max-width: 700px;
    margin: 0 auto;
  `,
  //skeleton text 와 title 을 감싸는 스타일 컴포넌트
  Container: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    max-width: 700px;
    margin: 0 -10px;
    /* animaition css 작업 */      
    &.own{
      flex-grow: 0;
      margin: 0 10px;
      max-width: 700px;
      margin-bottom: -5px;
    }
    &.two{
      padding: 20px 0px;
      flex-grow: 1;
      margin: 0 10px;
      max-width: 700px;
      margin-bottom: -5px;
    }
  `,
  // skeleton brink 의 스타일 컴포넌트
  Brink: styled.div`
    width: 100px;
    height: 100px;
  `,
  // skeleton box 의 스타일 컴포넌트
  Box: styled.div`
  /* box의 크기가 props 로 전달 되면서 사용자가 변경된 값에 따라 변경이 되어야함 */
    width: 100px;
    height: 100px;
    border-radius: 3px;
    background-color: rgb(204, 204, 204);
    overflow: hidden;
  position: relative;
    &::after{
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background: linear-gradient(90deg, transparent, #E9E9E9, transparent);
        animation: ${loading} 2s infinite linear;
      }
  `,
  // skeleton circle 의 스타일 컴포넌트
  Circle: styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: rgb(204, 204, 204);
    overflow: hidden;
  position: relative;
  &::after{
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background: linear-gradient(90deg, transparent, #E9E9E9, transparent);
        animation: ${loading} 2s infinite linear;
  }
  `,
  // skeleton title 의 스타일 컴포넌트
  Title: styled.div`
  height: 20px;
    border-radius: 3px;
    background-color: rgb(204, 204, 204);
    width: 30%;
    min-width: 100px;
    margin-bottom: 10px;
    overflow: hidden;
  position: relative;
    &::after{
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background: linear-gradient(90deg, transparent, #E9E9E9, transparent);
        animation: ${loading} 2s infinite linear;
    }
  `,
  // skeleton text 의 스타일 컴포넌트
  Text: styled.div`
  height: 10px;
  border-radius: 3px;
  background-color: rgb(204, 204, 204);
  width: 100%;
  margin-bottom: 5px;
  overflow: hidden;
  position: relative;
    &:last-child{
      height: 10px;
    border-radius: 5px;
    background-color: rgb(204, 204, 204);
    width: 70%;
    }
    &::after{
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background: linear-gradient(90deg, transparent, #E9E9E9, transparent);
        animation: ${loading} 2s infinite linear;
    }
  `,
};

export default SkeletonLoader;