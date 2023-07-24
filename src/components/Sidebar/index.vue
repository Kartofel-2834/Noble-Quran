<template>
  <div class="sidebar" :class="{ sidebar_opened: opened }">
    <slot />
  </div>
</template>

<script>
export default {
  name: "SidebarComponent",

  props: {
    opened: { type: Boolean, default: false },
  },
};
</script>

<style src="@/assets/styles/components/sidebar.css"></style>
