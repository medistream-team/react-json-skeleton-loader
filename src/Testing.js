import SkeletonLoader from './SkeletonLoader'


const Testing = () => {

    return (
        <div>
            {/* JsonSkeletonLoader 으로 컴포넌트 이름 변경*/}
            <SkeletonLoader
                defaultSizes={{
                    box: 100,
                    circle: 100
                }}
                speed='2'
                radius='30'
                primaryColor='#ffb0b0'
                secondaryColor='#4c8bf5'
                animation={false}
                // 모든 속성을 바깥으로 빼는 형식으로 수정
                // options={{
                //     speed: 2,
                //     radius: 30,
                //     primaryColor: '#ffb0b0',
                //     secondaryColor: '#4c8bf5',
                //     // animation: false
                // }}
                // content={[["box", "title + text:5"], ["text:5"]]}
                content={["box", "title + text:2"]}
            />
        </div>
    )
}

export default Testing;