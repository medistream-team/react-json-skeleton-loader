const SkeletonLoader = () => {


    const row = {
            display: 'flex',
            width: '100%',
            height: '100%',
            alignContent: 'center'
        }


    return (
        <div>
            <div className='row' style={row}>
                
                <div className='box' style={{backgroundColor: '#ccc', width: '50px', height: '50px'}}></div>

                <div>
                <div className='title' style={{backgroundColor: '#ccc', width: '50px', height: '50px'}}></div>

                <div className='text' style={{backgroundColor: '#ccc', width: '50px', height: '50px'}}></div>
                </div>
                
            </div>
            <div>
                <div className='title'></div>
            </div>
        </div>
    )
}

export default SkeletonLoader