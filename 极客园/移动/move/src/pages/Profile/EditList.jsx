import styles from './styles/editList.module.scss'
// 准备性别和头像的列表数据
const genderList = [
    { text: '男', value: '0' },
    { text: '女', value: '1' }
]
const photoList = [
    { text: '拍照', value: 'picture' },
    { text: '本地选择', value: 'local' }
]
const EditList = ({ onClose, type, onUpdateProfile }) => {
    const onItemClick = (value) => {
        if (type === '') return
        onUpdateProfile(type, value)
    }
    const list = type === 'gender' ? genderList : photoList
    return (
        <div className={styles.root}>
            {list.map(item => (
                <div
                    className="list-item"
                    key={item.text}
                    onClick={() => onItemClick(item.value)}
                >
                    {item.text}
                </div>
            ))}
            <div className="list-item" onClick={onClose}>
                取消
            </div>
        </div>
    )
}

export default EditList
