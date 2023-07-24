<template>
  <button
    :disabled="disabled"
    :class="{
      button_rounded: rounded,
      button_faded: faded,
      button_reversed: leftIcon,
    }"
    :style="{
      '--colorTheme': `var(--${type})`,
      '--colorThemeFaded': `var(--${type}Faded)`,
    }"
  >
    <span :class="{ 'button-content': !!icon.length && !!$slots.default }">
      <slot></slot>
    </span>
    <Icon
      v-if="!!icon.length || loading"
      :icon="loading ? 'line-md:loading-twotone-loop' : icon"
    />
  </button>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  name: "ButtonComponent",

  props: {
    type: { type: String, default: "primary" },
    icon: { type: String, default: "" },
    leftIcon: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    faded: { type: Boolean, default: false },
  },

  components: { Icon },
};
</script>

<style src="@/assets/styles/components/button.css"></style>
