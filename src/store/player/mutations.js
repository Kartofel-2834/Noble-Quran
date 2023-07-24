export default {
  updatePlayer(state, payload) {
    state.player = {
      ...state.player,
      ...payload,
    };
  },

  updateAyat(state, update) {
    const { timeline } = state.player;

    if (
      typeof update !== "number" ||
      !timeline?.length ||
      update < 1 ||
      update > timeline.length
    ) {
      return;
    }

    state.player.ayat = update;
    state.player.currentTime = timeline[update - 1].time_start;
    state.player.timeSetter = state.player.currentTime + Math.random() / 4;
  },

  closePlayer(state) {
    state.player.paused = true;
    state.player.opened = false;
  },

  openPlayer(state) {
    state.player.paused = false;
    state.player.opened = true;
  },
};
