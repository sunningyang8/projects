import { NavBar, InfiniteScroll, Toast, Popup } from 'antd-mobile'
import { useHistory, useParams } from 'react-router-dom'
import classNames from 'classnames'
import styles from './style/index.module.scss'
import  Icon  from '@/components/Icon'
import { useInitialState } from "../../utils/use-initial-state";
import {
    collectArticle,
    followAuthor,
    getArticleById,
    getArticleComments,
    getArticleCommentsFirst,
    likeArticle,
    addArticleComment,
    articleCommentThumbUp,
    updateCommentCount
} from '@/store/actions'

// 导入对 HTML 格式字符串消毒的包
import DOMPurify from 'dompurify'
// 导入代码高亮的包
import highlight from 'highlight.js'
// 导入代码高亮的样式
// 可以从 node_modules 中找到 highlight.js 包中提供的 CSS 样式
import 'highlight.js/styles/github-dark.css'
import { useEffect, useRef, useState } from 'react'

// loading 骨架屏组件
import ContentLoader from 'react-content-loader'
// 导入 lodash 的节流函数
import throttle from 'lodash/throttle'
import { useDispatch } from 'react-redux'
import NoneComment from '@/components/NoneComment'
import CommentInput from './CommentInput'
import Reply from './Reply'
import CommentItem from './CommentItem'
import CommentFooter from './CommentFooter'
//导航栏高度
const NAV_BAR_HEIGTH = 45
const CommentType={
    Article:'a',
    Comment:'c'
}
const Article = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    // 获取路由参数
    const params = useParams()
    // 表示文章是否加载中的状态
    const [loading, setLoading] = useState(true)
    // 创建文章可滚动区域的ref对象
    const wrapperRef = useRef(null)
    // 创建导航栏作者信息的ref对象
    const authorRef = useRef(null)
    // 控制导航栏中作者信息的展示和隐藏
    const [isShowNavAuthor, setIsShowNavAuthor] = useState(false)
    // 创建评论信息的DOM对象的 ref
    const commentRef = useRef(null)
    // 创建用来表示当前是否展示评论信息的ref
    const isShowComment = useRef(false)
    // 创建控制文章评论弹出层展示或隐藏的状态
    const [showArticleComment, setShowArticleComment] = useState(false)
    // 控制文章评论回复弹出层的展示或隐藏的状态
    const [showReply, setShowReply] = useState({
        visible: false,
        commentItem: {}
    })
    // 获取文章详情
    const { detail, comments } = useInitialState(
        ()=>getArticleById(params.id),
        'article'
    )
    // 处理代码高亮并且显示文章详情
    useEffect(() => {
        // setLoading()
        if(Object.keys(detail).length===0)return;
        setLoading(false)
        const dgHtmlDOM = document.querySelector('.dg-html')
        const codes = dgHtmlDOM?.querySelectorAll('pre code')
        // console.log(codes)
        if (codes && codes.length > 0) {
            codes.forEach(el => {
                // 让每个 code 内容实现代码高亮
                highlight.highlightElement(el)
            })
            return
        }
        highlight.configure({
            // 忽略警告
            ignoreUnescapedHTML: true
        })

        // 直接找到所有的 pre 标签
        const pres = dgHtmlDOM?.querySelectorAll('pre')
        if (pres && pres.length > 0) {
            pres.forEach(el => {
                highlight.highlightElement(el)
            })
        }
    }, [detail])

    // 给文章详情可滚动区域绑定滚动事件
    useEffect(() => {
        const wrapper = wrapperRef.current
        if (!wrapper) return
        const author = authorRef.current
        if (!author) return
        const onScroll = throttle(() => {
            const { height, top } = author.getBoundingClientRect()
            if (top <= NAV_BAR_HEIGTH - height) {
                setIsShowNavAuthor(true)
            } else {
                setIsShowNavAuthor(false)
            }
        }, 100)

        wrapper.addEventListener('scroll', onScroll)
        return () => {
            wrapper.removeEventListener('scroll', onScroll)
        }
    }, [loading])
    useEffect(() => {
        dispatch(getArticleCommentsFirst(CommentType.Article, params.id, null))
    }, [dispatch, params.id])

    // 点击跳转到评论内容
    const onShowComment = () => {
        const wrapper = wrapperRef.current
        if (!wrapper) return
        const comment = commentRef.current
        if (!comment) return

        const commentTop = comment.getBoundingClientRect().top
        if (!isShowComment.current) {
            wrapper.scrollTo({
                top: commentTop - NAV_BAR_HEIGTH + wrapper.scrollTop,
                behavior: 'auto'
            })
            isShowComment.current = true
        } else {
            wrapper.scrollTo(0, 0)
            isShowComment.current = false
        }
    }

    // 关注 或 取消关注作者
    const onFollowAuthor = async () => {
        await dispatch(followAuthor(aut_id, is_followed))
        Toast.show({
            content: is_followed ? '已取消关注' : '已关注',
            duration: 800
        })
    }
    // 收藏或取消收藏文章
    const onCollected = async () => {
        await dispatch(collectArticle(art_id, is_collected))
        Toast.show({
            content: is_followed ? '已取消收藏' : '已收藏',
            duration: 800
        })
    }

    // 点赞文章或取消点赞
    const onLike = async () => {
        await dispatch(likeArticle(art_id, attitude))
        Toast.show({
            content: is_followed ? '已取消点赞' : '已点赞',
            duration: 800
        })
    }

    const onArticleCommentHide = () => setShowArticleComment(false)

    // 发表评论
    const onAddComment = async (value) => {
        await dispatch(addArticleComment(art_id, value))

        onArticleCommentHide()
    }

    // 对评论点赞
    const onThumbUp = (com_id, is_liking) => {
        dispatch(articleCommentThumbUp(com_id, is_liking))
    }

    // 隐藏回复弹出层
    const onReplyHide = (commentId, total) => {
        // 修改redux中的评论列表数据
        dispatch(updateCommentCount(commentId, total))
        setShowReply({
            ...showReply,
            visible: false
        })
    }

    const {
        art_id,
        aut_id,
        is_followed,
        attitude,
        is_collected,
        content,
        title,
        pubdate,
        aut_name,
        aut_photo,
        comm_count,
        like_count,
        read_count
    } = detail

    const loadMoreComments = async () => {
        // console.log('加载更多评论')
        await dispatch(getArticleComments(CommentType.Article, params.id, last_id))
    }

    const { end_id, last_id } = comments
    const hasMore = end_id !== last_id
    if (loading) {
        return (
            // 根据当前页面结构，设计好的 loading 效果
            <ContentLoader
                speed={2}
                width={375}
                height={230}
                viewBox="0 0 375 230"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="16" y="8" rx="3" ry="3" width="340" height="10" />
                <rect x="16" y="26" rx="0" ry="0" width="70" height="6" />
                <rect x="96" y="26" rx="0" ry="0" width="50" height="6" />
                <rect x="156" y="26" rx="0" ry="0" width="50" height="6" />
                <circle cx="33" cy="69" r="17" />
                <rect x="60" y="65" rx="0" ry="0" width="45" height="6" />
                <rect x="304" y="65" rx="0" ry="0" width="52" height="6" />
                <rect x="16" y="114" rx="0" ry="0" width="340" height="15" />
                <rect x="263" y="208" rx="0" ry="0" width="94" height="19" />
                <rect x="16" y="141" rx="0" ry="0" width="340" height="15" />
                <rect x="16" y="166" rx="0" ry="0" width="340" height="15" />
            </ContentLoader>
        )
    }

    // 渲染文章详情
    const renderArticle = () => {
        return (
            <div className="wrapper" ref={wrapperRef}>
                {/* 文章详情 */}
                <div className="article-wrapper">
                    <div className="header">
                        <h1 className="title">{title}</h1>

                        <div className="info">
                            <span>{pubdate}</span>
                            <span>{read_count} 阅读</span>
                            <span>{comm_count} 评论</span>
                        </div>

                        <div className="author" ref={authorRef}>
                            <img
                                src={
                                    aut_photo || 'http://geek.itheima.net/images/user_head.jpg'
                                }
                                alt=""
                            />
                            <span className="name">{aut_name}</span>
                            <span
                                onClick={onFollowAuthor}
                                className={classNames('follow', is_followed ? 'followed' : '')}
                            >
                {is_followed ? '已关注' : '关注'}
              </span>
                        </div>
                    </div>

                    <div className="content">
                        {/* 文章详情 */}
                        <div
                            className="content-html dg-html"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(content)
                            }}
                        />
                        <div className="date">发布文章时间：{pubdate}</div>
                    </div>
                </div>
                {/* 文章评论 */}
                <div className="comment" ref={commentRef}>
                    <div className="comment-header">
                        <span>全部评论（{comm_count}）</span>
                        <span>{like_count} 点赞</span>
                    </div>
                    {/* 评论列表 */}
                    {comments.results.length === 0 ? (
                        <NoneComment />
                    ) : (
                        <div className="comment-list">
                            {comments.results.map(item => (
                                <CommentItem
                                    {...item}
                                    key={item.com_id}
                                    onThumbUp={() => onThumbUp(item.com_id, item.is_liking)}
                                    onReplyShow={() =>
                                        setShowReply({
                                            visible: true,
                                            commentItem: item
                                        })
                                    }
                                />
                            ))}

                            <InfiniteScroll hasMore={hasMore} loadMore={loadMoreComments} />
                        </div>
                    )}
                </div>
            </div>
        )
    }
    // 渲染文章的评论弹出层
    const renderArticleComment = () => {
        return (
            <Popup
                bodyStyle={{
                    height: '100%'
                }}
                position="bottom"
                visible={showArticleComment}
                destroyOnClose
            >
                <CommentInput
                    onClose={onArticleCommentHide}
                    onAddComment={onAddComment}
                />
            </Popup>
        )
    }
    // 渲染评论回复的弹出层
    const renderCommentReply = () => {
        return (
            <Popup
                bodyStyle={{
                    width: '100%'
                }}
                position="right"
                visible={showReply.visible}
                destroyOnClose
            >
                <Reply
                    onClose={onReplyHide}
                    commentItem={showReply.commentItem}
                    onReplyThumbUp={onThumbUp}
                    articleId={params.id}
                />
            </Popup>
        )
    }
    return (
        <div className={styles.root}>
            <div className="root-wrapper">
                <NavBar
                    onBack={() => history.go(-1)}
                    right={
                        <span>
              <Icon type="icongengduo" />
            </span>
                    }
                >
                    {isShowNavAuthor && (
                        <div className="nav-author">
                            <img
                                src={
                                    aut_photo || 'http://geek.itheima.net/images/user_head.jpg'
                                }
                                alt=""
                            />
                            <span className="name">{aut_name}</span>
                            <span
                                onClick={onFollowAuthor}
                                className={classNames('follow', is_followed ? 'followed' : '')}
                            >
                {is_followed ? '已关注' : '关注'}
              </span>
                        </div>
                    )}
                </NavBar>
                {/* 文章详情和评论 */}
                {renderArticle()}
                {/* 底部评论栏 */}
                <CommentFooter
                    placeholder={comm_count === 0 ? '抢沙发' : '去评论'}
                    comm_count={comm_count}
                    onShowComment={onShowComment}
                    is_collected={is_collected}
                    onCollected={onCollected}
                    attitude={attitude}
                    onLike={onLike}
                    onShowArticleComment={() => setShowArticleComment(true)}
                />
            </div>
            {/* 创建文章评论的弹出层 */}
            {renderArticleComment()}

            {/* 文章评论回复的弹出层 */}
            {renderCommentReply()}
        </div>
    )
}

export default Article
