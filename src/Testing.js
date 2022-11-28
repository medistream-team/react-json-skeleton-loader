import SkeletonLoader from './SkeletonLoader'


const Testing = () => {

    return (
        <div>
            <SkeletonLoader
                defaultSizes={{
                    box: 100,
                    circle: 100
                }}
                options={{
                    speed: 0.5,
                    radius: 30,
                    primaryColor: '#ffb0b0',
                    secondaryColor: '#4c8bf5',
                    // animation: false
                }}
                content={[["box", "title + text:5"], ["text:5"]]}
            />
        </div>
    )
}

export default Testing;