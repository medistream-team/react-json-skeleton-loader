import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

const SkeletonLoader: React.FC = (props) => {
  const [skeletonLoader, setSkeletonLoader] = useState<string[][]>([]);

  const buttonHandler = useCallback(() => {
    setSkeletonLoader([["box", "text:5"]])
  },[skeletonLoader])
  console.log(skeletonLoader);

  return (
    <div>
      <button onClick={buttonHandler}>버튼</button>
      {/* skeletonLoader 안의 값으로 배열들이 있고 해당 배열 은 map 메소드를 이용해 item 으로 취급된다. 각 item 의 값 안에 'box','title', 'text' 등 이 존재할 경우에 각각의 스타일을 가진 요소들이 생성이 되는 로직 // item = ['box', 'title:5']*/}
      {skeletonLoader?.map((item: string[], index) => (
        <div key={index}>
          {item?.map((element: string, index) => {
            console.log(element);
            // item의 요소들 중에 "box" 가 존재할 경우
            if (element.includes("box")) {
              return <S.Box key={index}/>;
            }
            // item의 요소들 중에 "title" 이 존재할 경우
            if (element.includes("title")) {
              return <S.Title key={index}/>;
            }
            // tiem의 요소들 중에 "text" 가 존재할 경우 && "text : 5 " 와 같은 형식일 경우 해당 콜론 뒤의 숫자 만큼 for 문이 돌아가는 걸 상정 해야함
            if (element.includes("text")) {
              if (element.includes(":")) {
                
                // const elementName: string = element.split(":")[0];
                const count: number = Number(element.split(":")[1]);
                // const elementChildren: string[] = [];
                // for (let i = 0; i < count; i++) {
                //   elementChildren.push(elementName);
                // }
                console.log(Array(count).fill(0).map((v, i) => v +i))

                return [...Array(count).keys()].map(i => <S.Text key={i}/>)
                // for (let i = 0; i < count; i++) {
                //   console.log(i);
                //   <S.Text key={index}/>;
                // }
              }
            }
            return <div key={index}/>;
          })}
        </div>
      ))}
    </div>
  );
};

const S = {
  Box: styled.div`
    width: 50px;
    height: 50px;
    background-color: black;
  `,
  Title: styled.div`
    width: 80px;
    height: 15px;
    background-color: black;
  `,
  Text: styled.div`
    width: 200px;
    height: 12px;
    background-color: black;
  `,
};

export default SkeletonLoader;
