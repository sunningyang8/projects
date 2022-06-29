import { Input, NavBar, TextArea } from 'antd-mobile'
import { useEffect, useState } from 'react'
import styles from './styles/editInput.module.scss'
const EditInput = ({ onClose, value, onUpdateProfile, type }) => {
    const [inputValue, setInputValue] = useState(value)
    // 验证组件有没有卸载
    useEffect(() => {
        return () => {
            console.log('组件卸载了')
        }
    }, [])
    //是否修改昵称
    const isEditName = type === 'name'
    return (
        <div className={styles.root}>
            <NavBar
                className="navbar"
                right={
                    <span
                        className="commit-btn"
                        onClick={() => {
                            if (type === '') return
                            onUpdateProfile(type, inputValue)
                        }}
                    >
            提交
          </span>
                }
                onBack={onClose}
            >
                编辑{isEditName ? '昵称' : '简介'}
            </NavBar>

            <div className="edit-input-content">
                <h3>{isEditName ? '昵称' : '简介'}</h3>

                {isEditName ? (
                    <div className="input-wrap">
                        <Input
                            value={inputValue}
                            onChange={value => setInputValue(value)}
                            placeholder="请输入"
                        />
                    </div>
                ) : (
                    <TextArea
                        className="textarea"
                        placeholder="请输入内容"
                        value={inputValue}
                        onChange={value => setInputValue(value)}
                        rows={4}
                        maxLength={100}
                        showCount
                    />
                )}
            </div>
        </div>
    )
}

export default EditInput
