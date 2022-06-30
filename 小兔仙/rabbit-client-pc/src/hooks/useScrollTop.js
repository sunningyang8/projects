import { onMounted, onUnmounted, ref } from "vue";

export default function useScrollTop() {
  const scrollTop = ref(0);
  const scrollTopHandler = () => {
    scrollTop.value = document.documentElement.scrollTop;
  };
  onMounted(() => {
    window.addEventListener("scroll", scrollTopHandler);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", scrollTopHandler);
  });
  return scrollTop;
}
