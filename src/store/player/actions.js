import apiClient from "@/utils/apiClient";

// Quick search for surah or ayat timeline

function timelineSearch(time, timeline) {
  if (!Array.isArray(timeline)) {
    return null;
  }

  let index = Math.floor(timeline.length / 2);
  let top = timeline.length;
  let bottom = 0;
  let iterations = 0;

  while (index >= 0 && bottom < top && iterations < 20) {
    iterations++;

    if (
      timeline[index].time_start <= time &&
      timeline[index].time_end >= time
    ) {
      return timeline[index];
    }

    if (timeline[index].time_start > time) {
      top = index;
    } else if (timeline[index].time_end < time) {
      bottom = index;
    }

    index = bottom + Math.floor((top - bottom) / 2);
  }

  return null;
}

// Actions

export default {
  async updateSurah({ commit, dispatch }, surah) {
    await commit("updatePlayer", { surah, ayat: 1, word: 1 });
    await dispatch("getSurahTimeline", surah);
  },

  async getSurahTimeline({ commit, state }, surahNumber) {
    let { surah, reciter } = state.player;
    surah = isNaN(surahNumber) ? surah : surahNumber;

    if (isNaN(surah)) {
      return;
    }

    let timeline = await apiClient.getTimeline(surah, reciter);
    timeline = Array.isArray(timeline) ? timeline : [];

    const withAyats = Boolean(timeline?.length && timeline[0]?.ayat);
    const withWords = Boolean(
      withAyats &&
        Array.isArray(timeline[0]?.words) &&
        timeline[0]?.words?.length
    );

    commit("updatePlayer", {
      timeline,
      withAyats,
      withWords,
    });

    console.log({
      timeline,
      withAyats,
      withWords,
    });
  },

  searchAyat({ state, commit }, currentTime) {
    const { timeline, ayat, repeated } = state.player;

    const currentAyat = timeline[ayat - 1] || null;

    if (
      currentAyat &&
      currentTime < currentAyat.time_end &&
      currentTime > currentAyat.time_start
    ) {
      return ayat;
    } else if (repeated && Math.abs(currentAyat.time_end - currentTime) <= 1) {
      commit("updateAyat", currentAyat.ayat);
      return null;
    }

    const ayatTimeline = timelineSearch(currentTime, timeline);
    const update = ayatTimeline?.ayat || 1;

    commit("updatePlayer", { ayat: update });

    return ayatTimeline?.ayat || 1;
  },

  async searchWord({ state, commit, dispatch }, currentTime) {
    const { timeline, withWords, withAyats, word } = state.player;

    if (!timeline?.length || !withAyats) {
      return;
    }

    const ayat = await dispatch("searchAyat", currentTime);

    if (!withWords || ayat === null) {
      return;
    }

    const currentAyat = timeline[ayat - 1] || null;
    const currentWord = currentAyat?.words[word - 1] || null;

    if (
      currentWord &&
      currentTime < currentWord.time_end &&
      currentTime > currentWord.time_start
    ) {
      return;
    }

    const wordTimeline = timelineSearch(currentTime, currentAyat.words);
    commit("updatePlayer", { word: wordTimeline?.num || 1 });
  },

  updateCurrentTime({ commit, dispatch }, currentTime) {
    console.log(currentTime);
    commit("updatePlayer", { currentTime });
    dispatch("searchWord", currentTime);
  },

  nextAyat({ state, commit }) {
    commit("updateAyat", state.player.ayat + 1);
  },

  prevAyat({ state, commit }) {
    const { timeline, ayat, currentTime } = state.player;
    const delay = currentTime - timeline[ayat - 1].time_start;

    commit("updateAyat", state.player.ayat - Number(delay < 3));
  },
};
