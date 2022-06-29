import { useHistory, useLocation } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import ArticleItem from '@/components/ArticleItem'
import styles from './styles/serchResult.module.scss'
import { useInitialState } from '@/utils/use-initial-state'
import { getSuggestionResult } from '@/store/actions'

const Result = () => {
    const history = useHistory()
    const location = useLocation()
    //获取查询路由参数
    const params = new URLSearchParams(location.search)
    //获取查询参数
    const query = params.get('query') ?? ''
    const { suggestionResult } = useInitialState(
        () => getSuggestionResult(query),
        'search'
    )
    const { results } = suggestionResult
    // 渲染搜索结果
    const renderArticleList = () => {
        return results.map((item, index) => {
            const {
                title,
                pubdate,
                comm_count,
                aut_name,
                art_id,
                cover: { type, images }
            } = item

            const articleData = {
                title,
                pubdate,
                comm_count,
                aut_name,
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
        })
    }
    return (
        <div className={styles.root}>
            <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>
            <div className="article-list">{renderArticleList()}</div>
        </div>
    )
}

export default Result
