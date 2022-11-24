import SkeletonLoader from './SkeletonLoader'


const Testing= () => {

    return (
        <div>
            <SkeletonLoader
                primaryColor= 'rgb(255, 255, 255)'
                secondaryColor= '#ddd'
                defaultSizes= {{
                    box: 100,
                    circle: 100
                    }}
                content={[["box", "title + text:3"], ["text:5"]]}
            />
        </div>
    )
}

export default Testing;