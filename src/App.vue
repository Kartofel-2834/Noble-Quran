<template>
  <Header :menu-opened="sidebarOpened" @menu-open="sidebarOpened = true" />

  <Player
    :opened="opened"
    :src="audioSrc"
    :paused="paused"
    :current-time-setter="timeSetter"
    :volume="volume"
    :speed="speed"
    :duration="duration"
    :repeated="repeated"
    @load="({ duration }) => updatePlayer({ duration })"
    @timeupdate="updateCurrentTime"
    @play="() => updatePlayer({ paused: false })"
    @pause="() => updatePlayer({ paused: true })"
    @next="nextAyat"
    @prev="prevAyat"
    @volume-change="(update) => updatePlayer({ volume: update })"
    @speed-change="(update) => updatePlayer({ speed: update })"
    @repeat-toggle="(repeated) => updatePlayer({ repeated })"
    @close="closePlayer"
  />

  <Sidebar :opened="sidebarOpened">
    <div class="main-sidebar">
      <p>Настройки</p>
      <Button icon="mingcute:close-fill" rounded />
    </div>
  </Sidebar>

  <router-view />
</template>

<style src="@/assets/styles/index.css"></style>

<script>
import { mapMutations, mapGetters, mapState, mapActions } from "vuex";

// Components
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";
import Button from "@/components/Button";

export default {
  components: { Header, Sidebar, Player, Button },

  data() {
    return { sidebarOpened: false };
  },

  computed: {
    ...mapState({
      opened: (state) => state.player.opened,
      ayat: (state) => state.player.ayat,
      paused: (state) => state.player.paused,
      volume: (state) => state.player.volume,
      speed: (state) => state.player.speed,
      timeSetter: (state) => state.player.timeSetter,
      duration: (state) => state.player.duration,
      repeated: (state) => state.player.repeated,
    }),

    ...mapGetters(["audioSrc"]),
  },

  methods: {
    ...mapMutations(["updatePlayer", "closePlayer"]),
    ...mapActions(["updateCurrentTime", "nextAyat", "prevAyat"]),
  },
};
</script>
