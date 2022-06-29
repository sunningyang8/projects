import  Icon from '@/components/Icon'
import styles from './style/commentFooter.module.scss'


const CommentFooter = ({
                           placeholder = '抢沙发',
                           type = 'normal',
                           comm_count,
                           onShowComment,
                           is_collected,
                           onCollected,
                           attitude,
                           onLike,
                           onShowArticleComment
                       }) => {
    return (
        <div className={styles.root}>
            <div className="input-btn" onClick={onShowArticleComment}>
                <Icon type="iconbianji" />
                <span>{placeholder}</span>
            </div>

            {type === 'normal' && (
                <>
                    <div className="action-item" onClick={onShowComment}>
                        <Icon type="iconbtn_comment" />
                        <p>评论</p>
                        {comm_count !== 0 && <span className="bage">{comm_count}</span>}
                    </div>
                    <div className="action-item" onClick={onLike}>
                        <Icon
                            type={attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'}
                        />
                        <p>点赞</p>
                    </div>
                    <div className="action-item" onClick={onCollected}>
                        <Icon
                            type={is_collected ? 'iconbtn_collect_sel' : 'iconbtn_collect'}
                        />
                        <p>收藏</p>
                    </div>
                </>
            )}

            {type === 'reply' && (
                <div className="action-item" onClick={onLike}>
                    <Icon type={attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
                    <p>点赞</p>
                </div>
            )}

            <div className="action-item">
                <Icon type="iconbtn_share" />
                <p>分享</p>
            </div>
        </div>
    )
}

export default CommentFooter
