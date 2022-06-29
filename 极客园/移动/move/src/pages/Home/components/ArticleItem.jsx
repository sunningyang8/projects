import classnames from 'classnames'
import { Image } from 'antd-mobile'
import Icon from '@/components/Icon'
import styles from './ArticleItem.module.scss'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
const ArticleItem = ({
    type,
    title,
    aut_name,
    comm_count,
    pubdate,
    images
}) => {
    return (
        <div className={styles.root}>
            <div
                className={classnames(
                    'article-content',
                    type === 3 && 't3',
                    type === 0 && 'none-mt'
                )}
            >
                <h3>{title}</h3>
                {type !== 0 && (
                    <div className="article-imgs">
                        {images?.map((item, index) => (
                            <div key={index} className="article-img-wrapper">
                                <Image
                                    lazy
                                    src={item}
                                    style={{
                                        '--width': '110px',
                                        '--height': '75px'
                                    }}
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={classnames('article-info', type === 0 && 'none-mt')}>
                <span>{aut_name}</span>
                <span>{comm_count} 评论</span>
                {/* <span>2 天前</span> */}
                <span>{dayjs().to(dayjs(pubdate))}</span>
                <span className="close">
                    <Icon type="iconbtn_essay_close" />
                </span>
            </div>
        </div>
    )
}

export default ArticleItem
