<template>
  <AppTopNav />
  <AppHeader />
  <AppHeaderSticky />
  <slot />
  <AppFooter />
</template>

<script>
import AppTopNav from "@/components/AppTopNav";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import { useStore } from "vuex";
import AppHeaderSticky from "@/components/AppHeaderSticky";
export default {
  name: "AppLayout",
  components: { AppHeaderSticky, AppFooter, AppHeader, AppTopNav },
  setup() {
    const store = useStore();
    store.dispatch("category/getCategories");
  },
};
</script>

<style scoped></style>
