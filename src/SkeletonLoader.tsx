import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

interface userPropsDataType {
  primaryColor: string,
  secondaryColor: string,
  defaultSizes: DefaultSizeType,
  content: string[][]
}

interface DefaultSizeType {
  box: number,
  circle: number
}

// skeleton-loader/react
const SkeletonLoader: React.FC<userPropsDataType> = (props: userPropsDataType): JSX.Element => {

  const { defaultSizes, content } = props;

  const [skeletonLoader, setSkeletonLoader] = useState<string[][]>([]);

  useEffect(() => {
    // bh: useEffect, state를 사용하지 않고 props을 사용하면 안되는지?
    const isNestedArray = ((_content: string[][] | string[]) => {
      return Array.isArray(_content) ? _content.some(Array.isArray) : false;
    })(content)

    setSkeletonLoader(isNestedArray ? content : [content]);
  }, [])

  console.log(defaultSizes)
  console.log(content)

  // 에디터 사용 하는법 공부 -> 문서화를 하기 위한 에디터
  // 렉시컬 -> 리액트에서 사용하기 편한 에디터 

  // 해야할 리스트
  // 1. 현재 Box 스타일드 컴포넌트에서 props 로 전달하여 <S.Box /> 안에 boxWidth, boxHeight 의 속성에 값을 해당 라이브러리를 사용하는 사용자가 
  //    값을 defaultSizes 에 box 와 circle 에 value를 추가 했을때 해당 넓이와 높이가 변하게 되는걸 설정 하여야 한다. 
  // 2. 값을 defaultSizes 말고 content 의 value 로 [["box:200/100"]] 과 같은 형식의 값이 올때 디폴트 사이즈에서 해당 사이즈로 넓이와 높이가 변경이 되어야 함
  // 3. 위의 상정하여야할 상황들은 circle 에도 해당되는 사항임을 명시
  // 현재 우선 되어야 할것
  // 위의 리스트에서 조건값을 생각하여 해당 조건식을 어디에 두어야 할지 결정하고, 디폴드 값의 명시를 어떤식으로 할지 결정할 것
  // 해당 리스트를 작성 

  const boxContainer = (InitialValue: string) => {
    // item의 요소들 중에 "box" 가 존재할 경우
    if (InitialValue.includes("box")) {
      return <S.Box boxWidth={`${defaultSizes.box}px`} boxHeight={`${defaultSizes.box}px`} primaryColor='#ccc' />;
    }
    // item의 요소들 중에 "circle" 가 존재할 경우
    if (InitialValue.includes("circle")) {
      return <S.Circle circleWidth='100px' circleHeight='100px' primaryColor='#ccc' />;
    }
    // item의 요소들 중에 "brink" 가 존재할 경우
    if (InitialValue.includes("blank")) {
      return <S.Blank />;
    }
    // title + text:x 와같은 형식이 존재할 경우 + 를 제외하고 title 과 text 요소가 생성됨 => text 같은경우에는 뒤으 Number와같은 수의 요소가 생성됨
    return InitialValue
      .split("+")
      .map((Contents) => Contents.trim())
      .map((TitleAndTextContents, index) => (titleAndTextContainer(TitleAndTextContents, index)));
  }

  // bh: 별도의 컴포넌트로 빼도 되지 않나?
  const titleAndTextContainer = (TitleAndTextContents: string, index: number) => {
    // item의 요소들 중에 "title" 이 존재할 경우
    if (TitleAndTextContents.includes("title")) {
      return <S.Title key={index} primaryColor='#ccc' />;
    }
    // tiem의 요소들 중에 "text" 가 존재할 경우 && "text : 5 " 와 같은 형식일 경우 해당 콜론 뒤의 숫자 만큼 for 문이 돌아가는 걸 상정 해야함
    if (TitleAndTextContents.includes("text")) {
      if (TitleAndTextContents.includes(":")) {
        const count: number = Number(TitleAndTextContents.split(":")[1]);
        return [...Array(count).keys()].map((index) => (
          <S.Text key={index} primaryColor='#ccc' />
        ));
      }
    }
  }

  return (
    <div>
      {/* <button onClick={buttonHandler}>버튼</button> */}
      {/* skeletonLoader 안의 값으로 배열들이 있고 해당 배열 은 map 메소드를 이용해 item 으로 취급된다. 각 item 의 값 안에 'box','title', 'text' 등 이 존재할 경우에 각각의 스타일을 가진 요소들이 생성이 되는 로직 // item = ['box', 'title:5']*/}
      {skeletonLoader?.map((item: string[], index: number) => (
        <S.Total key={index}>
          {item?.map((element: string, index) => (
            <S.Container
              className={(element === 'box' || element === 'circle' || element === 'blank') ? 'own' : 'two'}
              key={index}
            >
              {boxContainer(element)}
            </S.Container>
          ))}
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

// 스타일 컴포넌트 들여쓰기 확인하여 커밋

interface StyledType {
  readonly boxWidth?: string;
  readonly boxHeight?: string;
  readonly circleWidth?: string;
  readonly circleHeight?: string;
  readonly primaryColor?: string;
}

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
  Blank: styled.div`
    width: 100px;
    height: 100px;
  `,
  // skeleton box 의 스타일 컴포넌트
  Box: styled.div <StyledType>`
  /* box의 크기가 props 로 전달 되면서 사용자가 변경된 값에 따라 변경이 되어야함 */
    width:${({ boxWidth }) => boxWidth};
    height:${({ boxHeight }) => boxHeight};
    border-radius: 3px;
    background-color: ${({ primaryColor }) => primaryColor};
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
  Circle: styled.div<StyledType>`
    width: ${({ circleWidth }) => circleWidth};
    height: ${({ circleHeight }) => circleHeight};
    border-radius: 50%;
    background-color: ${({ primaryColor }) => primaryColor};
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
  Title: styled.div<StyledType>`
  height: 20px;
    border-radius: 3px;
    background-color: ${({ primaryColor }) => primaryColor};
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
  Text: styled.div<StyledType>`
  height: 10px;
  border-radius: 3px;
  background-color: ${({ primaryColor }) => primaryColor};
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