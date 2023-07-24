import axios from "axios";

const BASE_API_URL = "http://localhost:9000";

export { BASE_API_URL };

const apiClient = {
  api: axios.create({
    baseURL: BASE_API_URL,
    timeout: 5000,
  }),

  async getTimeline(surah, reciter) {
    try {
      const { data: timeline } = await this.api.get(
        `/surah/${surah}/timeline/${reciter}`
      );

      if (!Array.isArray(timeline)) {
        return null;
      }

      return timeline;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  async getSurah(surah) {
    try {
      const { data: surahData } = await this.api.get(`/surah/${surah}`);

      if (!Array.isArray(surahData?.ayats)) {
        return null;
      }

      return surahData;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

export default apiClient;
