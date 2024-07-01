import { LANGUAGE } from "@/stores/constant"
import config from "./language_config.json"

export default {
  install(app) {
    const lang = localStorage.getItem('lang')
    if (!lang)
      localStorage.setItem('lang', LANGUAGE.CHINESE)

    app.config.globalProperties.$lang = (key) => {
      const curr_lang = localStorage.getItem('lang') || LANGUAGE.CHINESE

      if (curr_lang === LANGUAGE.CHINESE) {
        return key
      }

      try {
        const value = config[key][curr_lang]
        return value || key
      } 
      catch (e) {
        return key
      }
    }
  }
}