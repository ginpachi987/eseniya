<script setup lang="ts">
import { ref } from 'vue'
import words from '@/data/words.json'
import defs from '@/data/words-defs.json'
import translations from '@/data/words-translations.json'

const deffs: {[key: string]: string} = {...defs}
const trans: {[key: string]: string} = {...translations}

const currentWord = ref(0)
const audio = ref<HTMLAudioElement>()
const showList = ref(true)

document.addEventListener('keydown', (e) => {
  if (e.code == 'Digit4' && e.shiftKey) {
    showList.value = !showList.value
    return
  }
  if (e.key == ' ') {
    audio.value?.play()
    return
  }
  if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return
  nextWord(e.key == 'ArrowRight' ? 1 : -1)
})

function nextWord(i: number, random?: boolean) {
  if (random) {
    currentWord.value = Math.floor(Math.random()*words.length)
    return
  }
  if (currentWord.value + i < 0 || currentWord.value + i >= words.length) return
  currentWord.value += i
}
</script>

<template>
  <main>
    <header>
      <h2>Project Eseniya</h2>
    </header>
    <div class="content">
      <div class="card-wrapper">
        <img class="word-card" :src="`https://projects.yoro.dev/eseniya/images/${words[currentWord]}.webp`" alt="">
      </div>
      <div class="buttons">
        <button @click="nextWord(-1)" :disabled="currentWord == 0">Previous</button>
        <button @click="nextWord(0, true)" :disabled="currentWord == words.length - 1">Random</button>
        <button @click="nextWord(1)" :disabled="currentWord == words.length - 1">Next</button>
      </div>
      <div class="word">{{ words[currentWord] }}</div>
      <div class="translation">{{ trans[words[currentWord]].split('—')[1] }}</div>
      <!-- {{ defs[words[currentWord]] }} -->
      <div class="defs" :innerHTML="deffs[words[currentWord]].replace(/\n/g, '<br/>')">
      </div>

      <audio controls autoplay :src="`https://projects.yoro.dev/eseniya/audios/${words[currentWord]}.mp3`" ref="audio">
      </audio>
      
    </div>
    <footer><a href="https://github.com/ginpachi987/wow-df-talent-calculator" target="_blank">v0.0.1</a></footer>
  </main>
  <div class="word-list" v-if="showList">
    <div class="word-inlist" v-for="(word, i) of words" @click="currentWord = i">
      {{ word }}
    </div>
  </div>
</template>

<style scoped lang="scss">
h2 {
  margin: 8px 0;
}

main {
  display: flex;
  flex-direction: column;
  width: 500px;
  max-width: 100%;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  position: relative;
}

.word {
  font-size: 40px;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
}

.translation {
  text-align: center;
}

.card-wrapper {
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 800px) {
    width: 300px;
    margin: 0 auto;
  }
}

.word-card {
  height: 500px;
}

footer, header {
  text-align: center;
}

footer {
  margin: 8px;
}

header {
  text-transform: uppercase;
}

.buttons {
  display: flex;
  width: 400px;
  margin-top: -20px;
  // position: absolute;
  // top: 490px;

  button {
    flex: 1;
  }
}

.word-list {
  width: 300px;
  overflow-y: auto;
}

.word-inlist {
  cursor: pointer;
}

.defs {
  width: 100%;
}
</style>