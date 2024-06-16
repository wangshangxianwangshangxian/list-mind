import { keccak256 } from "js-sha3";
import { defineStore } from "pinia";

const MainData = defineStore('MainData', {
  state () {
    return {
      reszing: 1
    }
  },

  actions: {
    resize() {
      this.reszing = Date.now()
    }
  }
})

export default MainData