import { useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { addSyntheticLeadingComment } from 'typescript';

const SkeletonLoader: React.FC = (props) => {
  const [skeletonLoader, setSkeletonLoader] = useState<string[][]>([]);

  const buttonHandler = useCallback(() => {
    setSkeletonLoader([
      ["box", "title + text:4"],
      ["text:5"]
    ]);
  }, [skeletonLoader]);

  const boxContainer = (InitialValue: string) => {
    // item의 요소들 중에 "box" 가 존재할 경우
    if (InitialValue.includes("box")) {
      return <S.Box />;
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
          {item?.map((element: string, index) => (<S.Container className={element === 'box' ? 'own' : 'two'} key={index}>{boxContainer(element)}</S.Container>))}
        </S.Total>
      ))}
    </div>
  );
};

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
    &.own{
      flex-grow: 0;
      margin: 0 10px;
      max-width: 700px;
      margin-bottom: -10px;
    }
    &.two{
      padding: 20px 0px;
      flex-grow: 1;
      margin: 0 10px;
      max-width: 700px;
      margin-bottom: -10px;
    }
  `,
  // skeleton box 의 스타일 컴포넌트
  Box: styled.div`
      width: 100px;
    height: 100px;
    border-radius: 3px;
    background-color: rgb(204, 204, 204);
  `,
  // skeleton title 의 스타일 컴포넌트
  Title: styled.div`
  height: 20px;
    border-radius: 3px;
    background-color: rgb(204, 204, 204);
    width: 30%;
    min-width: 100px;
    margin-bottom: 10px;
  `,
  // skeleton text 의 스타일 컴포넌트
  Text: styled.div`
  height: 10px;
    border-radius: 3px;
    background-color: rgb(204, 204, 204);
    width: 100%;
    margin-bottom: 5px;
    &:last-child{
      height: 10px;
    border-radius: 5px;
    background-color: rgb(204, 204, 204);
    width: 70%;
    }
  `,
};

export default SkeletonLoader;