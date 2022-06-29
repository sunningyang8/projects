import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import classnames from 'classnames'
import Icon  from '@/components/Icon'
import styles from './style/commentItem.module.scss'
dayjs.extend(relativeTime)
const CommentItem = ({
                         type = 'normal',
                         aut_photo,
                         aut_name,
                         content,
                         pubdate,
                         is_liking,
                         like_count,
                         reply_count,
                         onThumbUp,
                         onReplyShow,
                         is_followed
                     }) => {
    // 回复按钮
    const replyJSX =
        type === 'normal' ? (
            <span className="replay" onClick={onReplyShow}>
        {reply_count !== 0 && reply_count} 回复
        <Icon type="iconbtn_right" />
      </span>
        ) : null

    return (
        <div className={styles.root}>
            <div className="avatar">
                <img
                    src={aut_photo || 'http://geek.itheima.net/images/user_head.jpg'}
                    alt=""
                />
            </div>
            <div className="comment-info">
                <div className="comment-info-header">
                    <span className="name">{aut_name}</span>
                    {/* 文章评论、评论的回复 */}
                    {(type === 'normal' || type === 'reply') && (
                        <span className="thumbs-up" onClick={onThumbUp}>
              {like_count}
                            <Icon type={is_liking ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            </span>
                    )}
                    {/* 要回复的评论 */}
                    {type === 'origin' && (
                        <span
                            className={classnames('follow', is_followed ? 'followed' : '')}
                        >
              {is_followed ? '已关注' : '关注'}
            </span>
                    )}
                </div>
                <div className="comment-content">{content}</div>
                <div className="comment-footer">
                    {replyJSX}
                    {/* 非评论的回复 */}
                    {type !== 'reply' && (
                        <span className="comment-time">{dayjs().from(pubdate)}</span>
                    )}
                    {/* 文章的评论 */}
                    {type === 'origin' && (
                        <span className="thumbs-up" onClick={onThumbUp}>
              {like_count}
                            <Icon type={is_liking ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CommentItem
