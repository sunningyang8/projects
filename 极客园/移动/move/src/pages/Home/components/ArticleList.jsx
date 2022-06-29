import { InfiniteScroll, PullToRefresh } from 'antd-mobile'
import ArticleItem from './ArticleItem'
import styles from './articleList.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
    getArticleListByChannelId,
    getNewestArticleList
} from '@/store/actions'
import { useHistory } from 'react-router-dom'

const ArticleList = ({ channelId }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { channelArticles } = useSelector((state) => state.home)
    // console.log(channelArticles)
    // 文章列表数据
    const currentChannelArticle = channelArticles[channelId] ?? {
        pre_timestamp: Date.now() + '',
        results: []
    }
    const { pre_timestamp, results } = currentChannelArticle
    // 加载更多数据
    const loadMore = async () => {
        await dispatch(getArticleListByChannelId(channelId, pre_timestamp))
    }
    // 下拉加载更多数据
    const onRefresh = async () => {
        await dispatch(getNewestArticleList(channelId, Date.now() + ''))
    }
    //加载更多数据的条件：
    const hasMore = pre_timestamp !== null

    return (
        <div className={styles.root}>
            <PullToRefresh onRefresh={onRefresh}>
                {/* 文章列表中的每一项 */}
                {results.map((item, index) => {
                    const {
                        art_id,
                        title,
                        aut_name,
                        comm_count,
                        pubdate,
                        cover: { type, images }
                    } = item
                    const articleData = {
                        title,
                        aut_name,
                        comm_count,
                        pubdate,
                        type,
                        images
                    }

                    return (
                        <div
                            key={index}
                            className="article-item"
                            onClick={() => history.push(`/articles/${art_id}`)}
                        >
                            <ArticleItem {...articleData} />
                        </div>
                    )
                })}
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
            </PullToRefresh>
        </div>
    )
}

export default ArticleList
