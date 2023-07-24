<template>
  <div class="player" :class="{ player_opened: opened }" ref="player">
    <Range
      :value="currentTime"
      :max="duration"
      @focus="onRemoteStart"
      @remote="onRemote"
      @change="onRemoteEnd"
    />

    <div class="player__content">
      <Time :seconds="currentTime" />

      <div class="player__content__buttons-inner">
        <Button
          class="player__content__buttons-inner__button player__content__buttons-inner__button_repeat"
          :class="{
            'player__content__buttons-inner__button_repeat_active': repeated,
          }"
          icon="bi:arrow-repeat"
          :faded="repeated"
          rounded
          left-icon
          @click="$emit('repeatToggle', !repeated)"
        />

        <Button
          class="player__content__buttons-inner__button"
          icon="pepicons-pop:previous-track"
          rounded
          @click="$emit('prev')"
        />
        <Button
          class="player__content__buttons-inner__button player__content__buttons-inner__button_play"
          :icon="paused ? 'ic:round-play-arrow' : 'wpf:pause'"
          rounded
          @click="playToggle"
        />
        <Button
          class="player__content__buttons-inner__button"
          icon="pepicons-pop:next-track"
          rounded
          @click="$emit('next')"
        />

        <Settings
          :volume="volume"
          :speed="speed"
          @volume-change="onVolumeChange"
          @speed-change="onSpeedChange"
          @close-player="onClose"
        />
      </div>

      <Time :seconds="duration" />
    </div>
  </div>
</template>

<style src="@/assets/styles/components/player.css"></style>

<script>
import Button from "../Button/index.vue";
import Range from "../Range/index.vue";

import Time from "./time.vue";
import Settings from "./settings.vue";

export default {
  name: "PlayerComponent",

  emits: [
    "play",
    "pause",
    "load",
    "remote",
    "timeupdate",
    "next",
    "prev",
    "volumeChange",
    "speedChange",
    "repeatToggle",
    "close",
  ],

  props: {
    opened: { type: Boolean, default: false },
    src: { type: String, required: true },
    repeated: { type: Boolean, default: false },
    paused: { type: Boolean, required: true },
    speed: { type: Number, default: 1 },
    volume: { type: Number, default: 0.5 },
    currentTimeSetter: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
  },

  components: {
    Range,
    Button,
    Time,
    Settings,
  },

  data() {
    return {
      audio: null,
      remoting: false,
      currentTime: 0,
    };
  },

  mounted() {
    this.updateAudio(this.src);
    window.addEventListener("keyup", this.onKeyup);
  },

  unmounted() {
    window.removeEventListener("keyup", this.onKeyup);
  },

  watch: {
    src(newSrc) {
      this.updateAudio(newSrc);
    },

    paused(newPaused) {
      if (newPaused) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
    },

    currentTimeSetter(newCurrentTime) {
      this.audio.currentTime = newCurrentTime;
      this.currentTime = newCurrentTime;
    },

    volume(newVolume) {
      if (!this.audio || typeof newVolume !== "number") {
        return;
      }

      this.audio.volume = newVolume;
    },

    speed(newSpeed) {
      if (!this.audio || typeof newSpeed !== "number") {
        return;
      }

      this.audio.playbackRate = newSpeed;
    },
  },

  methods: {
    updateAudio(src) {
      if (typeof src !== "string") {
        return;
      }

      this.audio = new Audio(src);

      this.audio.ondurationchange = () => {
        this.$emit("load", this.audio);
      };

      this.audio.ontimeupdate = this.onTimeupadte;
      this.audio.volume = this.volume;
      this.audio.playbackRate = this.speed;
    },

    playToggle() {
      if (this.paused) {
        this.$emit("play");
      } else {
        this.$emit("pause");
      }
    },

    onVolumeChange(newVolume) {
      this.$emit("volumeChange", newVolume);
    },

    onSpeedChange(newSpeed) {
      this.$emit("speedChange", newSpeed);
    },

    onClose() {
      this.$emit("close");
    },

    onTimeupadte() {
      if (this.remoting) {
        return;
      }

      this.currentTime = this.audio.currentTime;
      this.$emit("timeupdate", this.audio.currentTime);
    },

    onRemoteStart() {
      this.remoting = true;
      this.audio.pause();
    },

    onRemote(newCurrentTime) {
      this.currentTime = newCurrentTime;
    },

    onRemoteEnd() {
      this.remoting = false;
      this.audio.currentTime = this.currentTime;

      if (!this.paused) {
        this.audio.play();
      }
    },

    onKeyup(event) {
      switch (event.key) {
        case "Enter":
          if (!this.opened) return;
          this.playToggle();
          break;

        case "ArrowRight":
          this.$emit("next");
          break;

        case "ArrowLeft":
          this.$emit("prev");
          break;
      }
    },
  },
};
</script>
