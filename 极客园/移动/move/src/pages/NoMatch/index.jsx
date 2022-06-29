import { Image } from 'antd-mobile'
import './index.scss'
const NoMatch=()=>{
    const demoSrc ="https://img.zcool.cn/community/01673b59910cffa80121560347e0dd.jpg?x-oss-process=image/auto-orient,1"
    return(

            <Image src={demoSrc} />

    )
}
export default NoMatch
