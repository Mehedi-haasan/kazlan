import { useToImage } from '@hcorta/react-to-image'

export default function ImageGenarate() {
    const options = {
        width: 500,
        backgroundColor: '#ffffff' // Set background color to white
    };
    const { ref, isLoading, getSvg, getPng } = useToImage(options)

    return (
        <div ref={ref} className='bg-white'>
            <h1>My title</h1>
            <button onClick={getPng}>Download Png</button>
            {isLoading && 'loading...'}
        </div>
    )
}