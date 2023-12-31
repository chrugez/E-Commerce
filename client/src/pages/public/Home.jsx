import { Banner, Sidebar, BestSeller, DealDaily, FeatureProduct } from '../../components'


const Home = () => {



    return (
        <div className='flex flex-col w-main'>
            <div className='w-main flex'>
                <div className='flex flex-col gap-5 w-[25%] flex-auto'>
                    <Sidebar />
                    <DealDaily />
                </div>
                <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
                    <Banner />
                    <BestSeller />
                </div>
            </div>
            <div className='my-8'>
                <FeatureProduct />
            </div>
            <div className='w-full h-[500px]'></div>
        </div>
    )
}

export default Home