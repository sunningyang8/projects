import { Popup, NavBar } from 'antd-mobile'

import CommentItem from './CommentItem'
import CommentFooter from './CommentFooter'
import CommentInput from './CommentInput'
import NoneComment from '@/components/NoneComment'

import styles from './style/reply.module.scss'
import { useEffect, useState } from 'react'
import { http } from '@/utils'

const Reply = ({ onClose, commentItem, onReplyThumbUp, articleId }) => {
    //当前组件状态
    const [comment, setComment] = useState(commentItem)
    // 控制回复文本框弹出层的展示和隐藏
    const [showPopup, setShowPopup] = useState(false)
    // 评论的回复列表数据
    const [reply, setReply] = useState({
        results: [],
        last_id: null,
        end_id: null,
        total_count: 0
    })
    useEffect(() => {
        const loadData = async () => {
            const res = await http.get('/comments', {
                params: {
                    type: 'c',
                    source: comment.com_id
                }
            })
            setReply(res.data.data)
        }
        loadData()
    }, [comment.com_id])
    // 对评论进行点赞
    const onThumbUp = async () => {
        if (comment.is_liking) {
            //取消点赞
            await http.delete(`/comment/likings/${comment.com_id}`)
        } else {
            //点赞
            await http.post('/comment/likings', {
                target: comment.com_id
            })
        }
        setComment({
            ...comment,
            is_liking: !comment.is_liking,
            like_count: comment.is_liking
                ? comment.like_count - 1
                : comment.like_count + 1
        })
        onReplyThumbUp(comment.com_id, comment.is_liking)
    }

    const onReplyPopupHide = () => setShowPopup(false)
    // 对评论进行回复
    const onAddComment = async (value) => {
        const res = await http.post('/comments', {
            target: comment.com_id,

            content: value,
            art_id: articleId
        })
        // 将最新发表的评论数据，添加到回复列表中即可
        setReply({
            ...reply,
            total_count: reply.total_count + 1,
            results: [res.data.data.new_obj, ...reply.results]
        })

        onReplyPopupHide()
    }

    // 关闭对回复弹出层，将当前评论的总数量传递给父组件
    const onBackToArticle = () => {
        onClose(comment.com_id, reply.total_count)
    }

    return (
        <div className={styles.root}>
            <div className="reply-wrapper">
                <NavBar className="transparent-navbar" onBack={onBackToArticle}>
                    {reply.results.length} 条回复
                </NavBar>
                {/* 要回复的评论 */}
                <div className="origin-comment">
                    <CommentItem type="origin" {...comment} onThumbUp={onThumbUp} />
                </div>

                <div className="reply-list">
                    <div className="reply-header">全部回复</div>
                    {reply.results.length > 0 ? (
                        reply.results.map(item => (
                            <CommentItem key={item.com_id} type="reply" {...item} />
                        ))
                    ) : (
                        <NoneComment />
                    )}
                </div>

                <CommentFooter
                    placeholder="去评论"
                    type="reply"
                    onShowArticleComment={() => setShowPopup(true)}
                />
            </div>
            <Popup className="reply-popup" position="bottom" visible={showPopup}>
                <CommentInput
                    name={comment.aut_name}
                    onAddComment={onAddComment}
                    onClose={onReplyPopupHide}
                />
            </Popup>
        </div>
    )
}

export default Reply
