import defaultImg from "@/assets/images/200.png";

// 1. 获取到指定所在的元素对象
// 2. mounted 当指定所在的元素渲染完成后做其他事情
// 3. 监听元素是否进入可视区
// 4. 如果元素进入可视区 为图片设置 src 属性 停止监听
// 5. 如果图片加载失败 显示默认图片

const lazy = {
  mounted(el, binding) {
    // el 指定所在的元素
    // binding.value 获取指令的值
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 停止监听
        observer.unobserve(el);
        // 加载图片
        el.src = binding.value;
        // 监听图片加载失败的情况
        el.onerror = function () {
          el.src = defaultImg;
        };
      }
    });
    observer.observe(el);
  },
};

export default lazy;
