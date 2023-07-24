<template>
  <div class="ayat" ref="ayat" :class="{ ayat_active: isCurrent }">
    <div class="ayat__controls">
      <div class="ayat__controls__position">{{ surahNum }}:{{ num }}</div>
      <Button
        class="ayat__controls__item"
        icon="ic:round-play-arrow"
        faded
        @click="$emit('play', num)"
      />
    </div>

    <div class="ayat__content">
      <div v-if="wordLighting" class="ayat__content__text">
        <span
          v-for="(word, index) in content"
          :key="index"
          class="ayat__content__text__word"
          :class="{
            ayat__content__text__word_active:
              isCurrent && currentWord === index,
          }"
        >
          {{ word }}
        </span>
      </div>

      <div v-else class="ayat__content__text">
        <span
          v-for="(word, index) in content"
          v-once
          :key="index"
          class="ayat__content__text__word"
        >
          {{ word }}
        </span>
      </div>

      <div class="ayat__content__translation">
        {{ translation }}
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../Button/index.vue";

export default {
  name: "AyatComponent",

  emits: ["play"],

  props: {
    surahNum: { type: Number, default: NaN },
    num: { type: Number, default: NaN },
    content: { type: Array, default: () => [] },
    translation: { type: String, default: "" },
    surahPlaying: { type: Boolean, default: false },
    currentAyat: { type: Number, default: NaN },
    currentWord: { type: Number, default: NaN },
    wordLighting: { type: Boolean, default: true },
    selfLighting: { type: Boolean, default: true },
  },

  components: { Button },

  mounted() {
    this.isCurrent = this.surahPlaying && this.num === this.currentAyat;
  },

  data() {
    return { isCurrent: false };
  },

  watch: {
    surahPlaying(surahIsPlayingNow) {
      this.isCurrent =
        this.selfLighting && surahIsPlayingNow && this.num === this.currentAyat;
    },

    currentAyat(newCurrentAyat) {
      this.isCurrent =
        this.selfLighting && this.surahPlaying && this.num === newCurrentAyat;

      if (this.isCurrent && this.$refs.ayat) {
        this.$refs.ayat.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    },
  },
};
</script>

<style src="@/assets/styles/components/ayat.css"></style>
