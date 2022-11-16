import {useState} from "react";

const SkeletonLoader: React.FC = () => {
const [skeletonLoader, setSkeletonLoader] = useState<string[][]>([])
setSkeletonLoader([['box', 'title:5']])

// "text : 5 " 와 같은 형식일 경우 해당 콜론 뒤의 숫자 만큼 for 문이 돌아가는 걸 상정 하여
// 해당 함수에서는 뒤의 숫자를 바깥으로 빼내는것이 주요 관건임
// const textColonNumber = (element) => {
//     if(element.includes(':')){
//         const elementName = element.split(':')[0];
//         const count = element.split(':')[1];
//         const elementChildren = [];
//         for(let i = 0; i < count; i++){
//         }
//     }
// }

    return (
        <div>
            {/* skeletonLoader 안의 값으로 배열들이 있고 해당 배열 은 map 메소드를 이용해 item 으로 취급된다. 각 item 의 값 안에 'box','title', 'text' 등 이 존재할 경우에 각각의 스타일을 가진 요소들이 생성이 되는 로직 // item = ['box', 'title:5']*/}
            {skeletonLoader.map( item  => 
                item.map(element => {
                // item의 요소들 중에 "box" 가 존재할 경우
                if(element.includes("box")){
                    <div style={} />
                }
                // item의 요소들 중에 "title" 이 존재할 경우
                if(element.includes("title")){
                    <div style={} />
                }
                // tiem의 요소들 중에 "text" 가 존재할 경우 && "text : 5 " 와 같은 형식일 경우 해당 콜론 뒤의 숫자 만큼 for 문이 돌아가는 걸 상정 해야함
                if(element.includes("text")){
                    if(element.includes(':')){
                        const elementName: string = element.split(':')[0];
                        const count: number = Number(element.split(':')[1]);
                        const elementChildren: string[] = [];
                        for(let i = 0; i < count; i++){
                            elementChildren.push(elementName)
                        }
                    for(let i = 0; i < count; i++){
                        <div></div>
                    }
                }

                        }
                        return <div />
                }  )
            )
        }
        </div>
    )
}


export default SkeletonLoader;