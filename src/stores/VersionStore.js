import { defineStore } from "pinia"

const VersionStore = defineStore('VersionStore', {
  state () {
    return {
      version: '0.8.0',
      footsteps: [
        {
          date: '2024.06',
          desc: ''
        },
        {
          date: '2024.05',
          desc: `一直想开发一款思维导图工具，因为我的想法很多时候都是树形的，甚至做草稿时，都会现在导图上开个「块」，然后思维就像树一样慢慢伸展开来所以思维导图就成了我最常用的工具，市面上的同类产品，xMind是最好用的，但是直到我付费之后才发现它竟然还不支持云同步。` +
                `<br />` +
                'MindMaster也强大，样式丰富，素材很多，但UI很糟糕，始终没有达到我想要的风格。' + 
                '<br />' +
                '于是List Mind的想法就诞生了。它没有登录系统，也不需要，一份思维导图对应一个私钥，拥有私钥就拥有对这份导图的所有权。与私钥对应的是公钥，它是通过分享给其他人看的。' +
                '<br />' +
                '易于分享，公私钥的机制，让知识和想法变得很开放，人人都能查阅。'
        }
      ]
    }
  },

  actions: {
    async check() {
      const old_version = localStorage.getItem('version')
      if (this.version !== old_version) {
        await this.update()
        localStorage.setItem('version', this.version)
      }
    },

    // 新版本调用方法
    async update() {
      // for (let i = 0; i < localStorage.length; i++) {
      //   const key = localStorage.key(i)
      //   if (!key.startsWith('mind_'))
      //     continue
      //   const mind = JSON.parse(localStorage.getItem(key))
      //   localStorage.removeItem(key)
      //   mind.title = Math.floor(Math.random() * 100)
      //   localStorage.setItem(`mind_${mind.address}`, JSON.stringify(mind))
      // }
    }
  }
})

export default VersionStore