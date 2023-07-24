<template>
  <div class="range">
    <input
      :value="currentValue"
      :step="step"
      :min="min"
      :max="max"
      class="range__input"
      type="range"
      @blur="blur"
      @input="input"
      @change="change"
      @mousedown="focus"
    />
    <div
      class="range__achieved"
      :class="{ 'no-transition': active }"
      :style="{ width: `${currentValue / percent}%` }"
    >
      <div
        class="range__achieved__ball"
        :class="{ range__achieved__ball_active: active }"
      ></div>
    </div>
  </div>
</template>

<style src="@/assets/styles/components/range.css"></style>

<script>
export default {
  name: "RangeComponent",

  emits: ["focus", "blur", "change", "remote"],

  props: {
    step: { type: Number, default: 1 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    value: { type: Number, required: true },
  },

  data() {
    return {
      active: false,
      currentValue: 0,
      percent: 0,
    };
  },

  mounted() {
    this.setPercent(this.min, this.max);
    this.currentValue = this.value;

    window.addEventListener("mouseup", this.blur);
  },

  unmounted() {
    window.removeEventListener("mouseup", this.blur);
  },

  watch: {
    value(newValue) {
      this.currentValue = newValue;
    },

    max(newMax) {
      this.setPercent(this.min, newMax);
    },

    min(newMin) {
      this.setPercent(newMin, this.max);
    },
  },

  methods: {
    setPercent(min, max) {
      this.percent = (max - min) / 100;
    },

    focus(event) {
      this.active = true;
      this.$emit("focus", event);
    },

    blur(event) {
      if (!this.active) {
        return;
      }

      this.active = false;
      this.$emit("blur", event);
    },

    async input(event) {
      this.currentValue = Number(event.target.value);
      this.$emit("remote", this.currentValue);
    },

    change() {
      this.$emit("change", this.currentValue);
    },
  },
};
</script>
