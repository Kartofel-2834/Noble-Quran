<template>
  <Dropdown :opened="opened" type="top" @close="close">
    <template #opener>
      <Button
        class="player__content__buttons-inner__button player__content__buttons-inner__button_settings"
        :class="{
          'player__content__buttons-inner__button_settings_active': opened,
        }"
        icon="mingcute:settings-1-fill"
        :faded="opened"
        rounded
        @click="toggle"
      />
    </template>

    <template #content>
      <div class="player__content__options">
        <Button
          class="player__content__options__button"
          icon="mingcute:close-fill"
          @click="closePlayer"
        >
          Закрыть плеер
        </Button>

        <div class="player__content__option-inner">
          <Icon
            class="player__content__option-inner__icon"
            icon="ion:volume-low"
          />
          <Range
            :value="volume"
            :max="1"
            :step="0.05"
            @remote="(v) => setOption('volume', v)"
          />
        </div>
        <div class="player__content__option-inner">
          <Icon
            class="player__content__option-inner__icon"
            icon="material-symbols:speed-rounded"
          />
          <Range
            :value="speed"
            :max="2"
            :step="0.25"
            @remote="(v) => setOption('speed', v)"
          />
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<script>
import Button from "../Button/index.vue";
import Range from "../Range/index.vue";
import Dropdown from "../Dropdown/index.vue";
import { Icon } from "@iconify/vue";

export default {
  name: "PlayerSettingsComponent",

  emits: ["volumeChange", "speedChange", "closePlayer"],

  props: {
    volume: { type: Number, default: 0.5 },
    speed: { type: Number, default: 1 },
  },

  components: {
    Button,
    Range,
    Dropdown,
    Icon,
  },

  data() {
    return {
      opened: false,
    };
  },

  methods: {
    closePlayer() {
      this.close();
      this.$emit("closePlayer");
    },

    close() {
      this.opened = false;
    },

    toggle() {
      this.opened = !this.opened;
    },

    setOption(option, newValue) {
      this.$emit(`${option}Change`, newValue);
    },
  },
};
</script>
