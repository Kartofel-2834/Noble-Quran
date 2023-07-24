import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state: {
    player: {
      opened: false,

      surah: NaN,
      ayat: NaN,
      word: NaN,
      //reciter: "Abu Bakr al-Shatri",
      reciter: "Muhammad al-Luhaidan",
      paused: true,
      repeated: false,
      volume: 0.5,
      speed: 1,
      timeSetter: 0,
      currentTime: 0,
      duration: 0,

      withWords: false,
      withAyats: false,
      timeline: [],
    },
  },

  getters,
  mutations,
  actions,
};
