import { BASE_API_URL } from "@/utils/apiClient";

export default {
  audioSrc(state) {
    const { surah, reciter } = state.player;

    if (!surah || !reciter) {
      return "";
    }

    return `${BASE_API_URL}/surah/${surah}/audio/${reciter}`;
  },
};
