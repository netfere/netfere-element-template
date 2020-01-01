<template>
  <transition name="fade" mode="out-in">
    <router-view id="app"></router-view>
  </transition>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>
