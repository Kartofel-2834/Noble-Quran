<template>
  <div class="dropdown" @click.stop>
    <div class="dropdown__opener" ref="opener">
      <slot name="opener"></slot>
    </div>

    <div
      class="dropdown__content"
      :class="{ dropdown__content_opened: opened, hided }"
      ref="content"
      :style="{ transform: `translateY(${offset}px)` }"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import sleep from "@/utils/sleep.js";

export default {
  name: "DropdownComponent",

  emits: ["close"],

  props: {
    opened: { type: Boolean, default: false },
    space: { type: Number, default: 20 },
    type: { type: String, default: "bottom" },
  },

  data() {
    return { hided: false, offset: 0, contentHeight: 0 };
  },

  mounted() {
    window.addEventListener("click", this.close);

    const { content, opener } = this.$refs;

    if (content) {
      this.contentHeight = content.clientHeight;
    }

    if (opener) {
      this.openerHeight = opener.clientHeight;
    }

    this.setOffset(this.opened);
    this.hided = true;
  },

  unmounted() {
    window.removeEventListener("click", this.close);
  },

  watch: {
    async opened(newOpened) {
      if (newOpened) {
        this.hided = false;
        await sleep(20);
        this.setOffset(true);
        return;
      }

      this.setOffset(false);
      await sleep(200);
      this.hided = true;
    },
  },

  methods: {
    close() {
      if (!this.opened) {
        return;
      }

      this.$emit("close");
    },

    setOffset(opened) {
      this.offset = this.space * Number(!!opened);

      if (this.type === "bottom") {
        this.offset += this.openerHeight;
      } else {
        this.offset += this.contentHeight;
        this.offset *= -1;
      }
    },
  },
};
</script>

<style src="@/assets/styles/components/dropdown.css"></style>
