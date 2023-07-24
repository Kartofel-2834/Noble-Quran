<template>
  <header :class="{ header_hided: hided }">
    <div class="header__inner">
      <Button
        class="header__inner__menu-button"
        :class="{ 'header__inner__menu-button_active': menuOpened }"
        rounded
        @click="$emit('menuOpen')"
      >
        <div class="header__inner__menu-button__inner">
          <div class="header__inner__menu-button__inner__line"></div>
          <div class="header__inner__menu-button__inner__line"></div>
          <div class="header__inner__menu-button__inner__line"></div>
        </div>
      </Button>

      <h1 class="header__inner__title">Священный Коран</h1>
    </div>
    <div class="header__progress"></div>
  </header>
</template>

<script>
import Button from "../Button";

import sleep from "@/utils/sleep";

export default {
  name: "HeaderComponent",

  emits: ["menuOpen"],

  props: {
    menuOpened: { type: Boolean, default: false },
  },

  components: { Button },

  data() {
    return {
      hided: false,
      moving: false,
      lastScroll: 0,
    };
  },

  mounted() {
    window.addEventListener("scroll", this.toggleHeader);
  },

  unmounted() {
    window.removeEventListener("scroll", this.toggleHeader);
  },

  methods: {
    async toggleHeader() {
      if (this.moving) {
        return;
      }

      this.hided = this.lastScroll < window.pageYOffset;
      this.lastScroll = window.pageYOffset;

      await sleep(300);
      this.moving = false;
    },
  },
};
</script>

<style src="@/assets/styles/components/header.css"></style>
