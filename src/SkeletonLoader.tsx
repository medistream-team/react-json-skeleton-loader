import styled, { keyframes } from "styled-components";

interface UserPropsDataType {
  defaultSizes: DefaultSizeType,
  content: string[][],
  options: OptionsType,

}
// interface || type
interface DefaultSizeType {
  box: number,
  circle: number
}

interface OptionsType {
  primaryColor: string,
  secondaryColor: string,
  speed: number,
  radius: number,
  animation: boolean
}

// 패키지화를 직접 해보고 사수님이 해주신 부분 참조하여 (소스 참조)

const DEFAULT_OPTIONS: OptionsType = {
  animation: true,
  primaryColor: '#ccc',
  secondaryColor: '#ddd',
  speed: 2,
  radius: 5,
}

// skeleton-loader/react
const SkeletonLoader: React.FC<UserPropsDataType> = (props: UserPropsDataType): JSX.Element => {
  const { defaultSizes, content, options: op } = props;
  const options: OptionsType = {
    ...DEFAULT_OPTIONS,
    ...op,
  };

  // 에디터 사용 하는법 공부 -> 문서화를 하기 위한 에디터
  // 렉시컬 -> 리액트에서 사용하기 편한 에디터 

  // 해야할 일
  // 4. 배열이 하나일때 정상 작동
  // 5. npm 작업

  const boxContainer = (InitialValue: string) => {
    // item의 요소들 중에 "box" 가 존재할 경우
    if (InitialValue.includes("box")) {
      return <S.Box
        boxWidth={InitialValue.includes(':') ? `${InitialValue.split(':')[1].trim().split('/')[0]}px` : `${defaultSizes.box}px`}
        boxHeight={InitialValue.includes(':') ? `${InitialValue.split(':')[1].trim().split('/')[1]}px` : `${defaultSizes.box}px`}
        primaryColor={`${options.primaryColor}`}
        secondaryColor={`linear-gradient(90deg, transparent, ${options.secondaryColor}, transparent)`}
        speed={`${options.animation ? options.speed : 0}s infinite linear`}
        radius={`${options.radius}px`}
      />;
    }
    // item의 요소들 중에 "circle" 가 존재할 경우
    if (InitialValue.includes("circle")) {
      return <S.Circle
        circleWidth={InitialValue.includes(':') ? `${InitialValue.split(':')[1].trim().split('/')[0]}px` : `${defaultSizes.circle}px`}
        circleHeight={InitialValue.includes(':') ? `${InitialValue.split(':')[1].trim().split('/')[1]}px` : `${defaultSizes.circle}px`}
        primaryColor={`${options.primaryColor}`}
        secondaryColor={`linear-gradient(90deg, transparent, ${options.secondaryColor}, transparent)`}
        speed={`${options.animation ? options.speed : 0}s infinite linear`}
      />;
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

  const titleAndTextContainer = (TitleAndTextContents: string, index: number) => {
    // item의 요소들 중에 "title" 이 존재할 경우
    if (TitleAndTextContents.includes("title")) {
      return <S.Title
        key={index}
        primaryColor={`${options.primaryColor}`}
        secondaryColor={`linear-gradient(90deg, transparent, ${options.secondaryColor}, transparent)`}
        speed={`${options.animation ? options.speed : 0}s infinite linear`}
        radius={`${options.radius}px`}
      />;
    }
    // tiem의 요소들 중에 "text" 가 존재할 경우 && "text : 5 " 와 같은 형식일 경우 해당 콜론 뒤의 숫자 만큼 for 문이 돌아가는 걸 상정 해야함
    if (TitleAndTextContents.includes("text")) {
      if (TitleAndTextContents.includes(":")) {
        const count: number = Number(TitleAndTextContents.split(":")[1]);
        return [...Array(count).keys()].map((index) => (
          <S.Text
            key={index}
            primaryColor={`${options.primaryColor}`}
            secondaryColor={`linear-gradient(90deg, transparent, ${options.secondaryColor}, transparent)`}
            speed={`${options.animation ? options.speed : 0}s infinite linear`}
            radius={`${options.radius}px`}
          />
        ));
      }
    }
  }

  return (
    <div>
      {/* skeletonLoader 안의 값으로 배열들이 있고 해당 배열 은 map 메소드를 이용해 item 으로 취급된다. 각 item 의 값 안에 'box','title', 'text' 등 이 존재할 경우에 각각의 스타일을 가진 요소들이 생성이 되는 로직 // item = ['box', 'title:5']*/}
      {content && content.map((item: string[], index: number) => (
        <S.Total key={index}>
          {item.map((element: string, index) => (
            <S.Container
              className={(element.includes('box') || element.includes('circle') || element.includes('blank')) ? 'own' : 'two'}
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
  readonly secondaryColor?: string;
  readonly speed?: string;
  readonly radius?: string;
  readonly animation?: boolean;
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
      align-content: center;
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
    border-radius: ${({ radius }) => radius};
    /* border-radius: 3px; */
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
        background: ${({ secondaryColor }) => secondaryColor};
        animation: ${loading} ${({ speed }) => speed}
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
        background: ${({ secondaryColor }) => secondaryColor};
        animation: ${loading} ${({ speed }) => speed}
  }
  `,
  // skeleton title 의 스타일 컴포넌트
  Title: styled.div<StyledType>`
  height: 20px;
  border-radius: ${({ radius }) => radius || '5px'};
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
        background: ${({ secondaryColor }) => secondaryColor};
        animation: ${loading} ${({ speed }) => speed}
    }
  `,
  // skeleton text 의 스타일 컴포넌트
  Text: styled.div<StyledType>`
  height: 10px;
  border-radius: ${({ radius }) => radius || '5px'};
  background-color: ${({ primaryColor }) => primaryColor};
  width: 100%;
  margin-bottom: 5px;
  overflow: hidden;
  position: relative;
    &:last-child{
      height: 10px;
      border-radius: ${({ radius }) => radius || '5px'};
      background-color: ${({ primaryColor }) => primaryColor};
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
        background: ${({ secondaryColor }) => secondaryColor};
        animation: ${loading} ${({ speed }) => speed}
    }
  `,
};

export default SkeletonLoader;