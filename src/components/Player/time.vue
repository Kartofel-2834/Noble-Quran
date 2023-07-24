<template>
  <div class="player__content__time">
    {{ secondsCountToNormalFormat(seconds) }}
  </div>
</template>

<script>
export default {
  name: "PlayerTimeComponent",

  props: {
    seconds: { type: Number, default: 0 },
  },

  methods: {
    secondsCountToNormalFormat(secondsCount) {
      let seconds = Math.floor(secondsCount);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);

      seconds -= minutes * 60;
      minutes -= hours * 60;

      let result = hours ? `${hours}:` : "";
      result += (hours && minutes < 10 ? "0" : "") + minutes + ":";
      result += (seconds < 10 ? "0" : "") + seconds;

      return result;
    },
  },
};
</script>
