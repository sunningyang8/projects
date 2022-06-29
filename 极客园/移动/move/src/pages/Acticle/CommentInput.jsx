import { useEffect, useRef, useState } from 'react'
import { NavBar, TextArea } from 'antd-mobile'
import styles from './style/commentInput.module.scss'
const CommentInput = ({ name, onClose, onAddComment }) => {
    const [value, setValue] = useState('')
    const textAreaRef = useRef(null)
    useEffect(() => {
        textAreaRef.current?.focus()
    }, [])
    const onChange = (value) => {
        setValue(value)
    }
    const onAdd = () => {
        onAddComment(value)
        setValue('')
    }
    return (
        <div className={styles.root}>
            <NavBar
                onBack={onClose}
                right={
                    <span className="publish" onClick={onAdd}>
            发表
          </span>
                }
            >
                {name ? '回复评论' : '评论文章'}
            </NavBar>

            <div className="input-area">
                {name && <div className="at">@{name}:</div>}
                <TextArea
                    ref={textAreaRef}
                    placeholder="说点什么~"
                    rows={10}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default CommentInput
