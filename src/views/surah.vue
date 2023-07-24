<template>
  <main ref="main">
    <Ayat
      v-for="ayat in ayatsVisible"
      :key="ayat.num"
      :surah-num="id"
      :num="ayat.num"
      :translation="ayat.translation_kuliev"
      :content="ayat.words"
      :surah-playing="playerOpened"
      :current-ayat="currentAyat"
      :current-word="currentWord - 1"
      :word-lighting="timelineWithWords"
      :self-lighting="timelineWithAyats"
      @play="playAyat"
    />

    <Skeleton v-if="ayatsVisible.length < ayats.length" />
  </main>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Ayat from "@/components/Ayat";
import Skeleton from "@/components/Skeleton";

import apiClient from "@/utils/apiClient";

export default {
  name: "SurahPage",

  components: {
    Ayat,
    Skeleton,
  },

  data() {
    return {
      id: NaN,
      ayatsVisible: [],
      ayats: [],
    };
  },

  async mounted() {
    let { id } = this.$route.params;

    id = Number(id);

    if (isNaN(id) || id < 1 || id > 114) {
      return;
    }

    window.addEventListener("scroll", this.loadAyatsOnScroll);

    this.id = id;
    await this.getSurah();
  },

  unmounted() {
    window.removeEventListener("scroll", this.loadAyatsOnScroll);
  },

  computed: {
    ...mapState({
      timelineWithWords: (state) => state.player.withWords,
      timelineWithAyats: (state) => state.player.withAyats,
      playerOpened: (state) => state.player.opened,
      currentAyat: (state) => state.player.ayat,
      currentWord: (state) => state.player.word,
    }),
  },

  watch: {
    currentAyat(newAyatNumber) {
      const difference = newAyatNumber - this.ayatsVisible.length;

      if (difference < -5) {
        return;
      } else if (difference < 0) {
        this.ayatsVisible = this.ayats.slice(0, this.ayatsVisible.length + 5);
      } else {
        this.ayatsVisible = this.ayats.slice(0, newAyatNumber + 5);
      }
    },
  },

  methods: {
    async getSurah() {
      const surah = await apiClient.getSurah(this.id);

      if (!surah) {
        return;
      }

      this.ayats = surah.ayats;
      this.ayatsVisible = this.ayats.slice(0, 10);

      this.updateSurah(this.id);
    },

    playAyat(newAyat) {
      this.openPlayer();
      this.updateAyat(newAyat);
    },

    loadAyatsOnScroll() {
      const { main } = this.$refs;
      const display = document.documentElement.clientHeight;

      const all = main.clientHeight || 0;
      const visible = window.pageYOffset + display;

      if (
        visible < all - 100 ||
        this.ayatsVisible.length >= this.ayats.length
      ) {
        return;
      }

      this.ayatsVisible = this.ayats.slice(0, this.ayatsVisible.length + 5);
    },

    ...mapActions(["updateSurah"]),
    ...mapMutations(["updateAyat", "openPlayer"]),
  },
};
</script>

<style src="@/assets/styles/pages/surah.css"></style>
