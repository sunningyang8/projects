import classnames from 'classnames';

// 组件 props 的类型
 

const Icon = ({ type, className, onClick }) => {
  return (
    <svg
      className={classnames('icon', className)}
      aria-hidden="true"
      onClick={onClick}
    >
      <use xlinkHref={`#${type}`}></use>
    </svg>
  );
};

export default Icon;