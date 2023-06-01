<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

interface WordData {
  [key: string]: string
}

const words = ref<string[]>([])
const definitions = ref<WordData>({})
const translations = ref<WordData>({})
const transcriptions = ref<WordData>({})

const startRandom = ref(localStorage.getItem('startRandom') == 'true')
const autoplay = ref(localStorage.getItem('autoplay') == 'true')

const currentWord = ref(0)
const audio = ref<HTMLAudioElement>()
const showList = ref(false)
const showSettings = ref(false)
const search = ref('')
// const history = ref<number[]>(JSON.parse(localStorage.getItem('autoplay') || '') || [])

const filtered = computed(() => {
  if (!search.value) return words.value
  return words.value.filter(word => word.indexOf(search.value) != -1)
})

// const leftWords = computed(() => {
//   return Object.keys(words).filter(el => history.value.indexOf(parseInt(el)) != -1)
// })

document.addEventListener('keydown', (e) => {
  if (e.code == 'Digit4' && e.shiftKey) {
    showList.value = !showList.value
    return
  }
  if (e.key == ' ') {
    audio.value?.play()
    return
  }
  if (e.key == 'ArrowUp') {
    nextWord(0, true)
  }
  if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return
  nextWord(e.key == 'ArrowRight' ? 1 : -1)
})

function nextWord(i: number, random?: boolean) {
  // if (!random || (currentWord.value + i < 0 || currentWord.value + i >= words.value.length)) return
  // if (!history.value.includes(currentWord.value)) {
  //   history.value.push(currentWord.value)
  //   localStorage.setItem('wordHistory', JSON.stringify(history.value))
  // }
  if (random) {
    currentWord.value = Math.floor(Math.random() * words.value.length)
  }
  else {
    if (currentWord.value + i < 0 || currentWord.value + i >= words.value.length) return
    currentWord.value += i
  }
  localStorage.setItem('lastWord', JSON.stringify(currentWord.value))
}

watch(startRandom, () => {
  localStorage.setItem('startRandom', JSON.stringify(startRandom.value))
})

watch(autoplay, () => {
  localStorage.setItem('autoplay', JSON.stringify(autoplay.value))
})

const loading = ref(true)
const loadState = ref(0)

onMounted(async () => {
  words.value.push(...await (await fetch('https://projects.yoro.dev/eseniya/data/words.json')).json())
  loadState.value = 25
  definitions.value = { ...await (await fetch('https://projects.yoro.dev/eseniya/data/words-defs.json')).json() }
  loadState.value = 50
  translations.value = { ...await (await fetch('https://projects.yoro.dev/eseniya/data/words-translations.json')).json() }
  loadState.value = 75
  transcriptions.value = { ...await (await fetch('https://projects.yoro.dev/eseniya/data/words-transcriptions.json')).json() }
  loadState.value = 100

  currentWord.value = startRandom.value ? Math.floor(Math.random() * words.value.length) : parseInt(localStorage.getItem('lastWord') || '0')

  await new Promise(r => setTimeout(r, 500))
  loading.value = false
})

const autoscroll = ref(false)
async function onEnded() {
  if (!autoscroll.value) return
  await new Promise(r => setTimeout(r, 200))
  nextWord(1, startRandom.value)
}
</script>

<template>
  <main>
    <button class="close-button" @click="showSettings = true">
      <font-awesome-icon :icon="['fas', 'gear']" />
    </button>
    <div class="settings" v-show="showSettings">
      <button class="close-button" @click="showSettings = false">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </button>
      <label><input type="checkbox" v-model="startRandom"> Start from a random word</label>
      <label><input type="checkbox" v-model="autoplay"> Autoplay audio</label>
    </div>
    <div class="settings" v-show="loading">
      Loading files {{ loadState }}%
    </div>
    <header>
      <h2>
        <RouterLink to="/">Project Eseniya</RouterLink>
      </h2>
    </header>
    <div class="content" v-if="words.length && !loading">
      <!-- <meter min="0" :max="words.length" :value="history.length"></meter> -->
      <div class="card-wrapper">
        <img class="word-card" :src="`https://projects.yoro.dev/eseniya/images/${words[currentWord]}.webp`" alt="">
      </div>
      <div class="buttons">
        <button @click="nextWord(-1)" :disabled="currentWord == 0">Previous</button>
        <button @click="nextWord(0, true)" :disabled="currentWord == words.length - 1">Random</button>
        <button @click="nextWord(1)" :disabled="currentWord == words.length - 1">Next</button>
      </div>
      <div class="word">{{ words[currentWord] }}</div>
      <div class="transcription">
        {{ transcriptions[words[currentWord]] }}
      </div>
      <div class="translation">{{ translations[words[currentWord]].split('—')[1] }}</div>
      <!-- {{ defs[words[currentWord]] }} -->
      <div class="defs" :innerHTML="definitions[words[currentWord]].replace(/\n/g, '<br/>')">
      </div>

      <audio @ended="onEnded()" controls :autoplay="autoplay" :src="`https://projects.yoro.dev/eseniya/audios/${words[currentWord]}.mp3`" ref="audio">
      </audio>
      <label><input type="checkbox" v-model="autoscroll"> Autoscroll</label>
    </div>
    <footer><a href="https://github.com/ginpachi987/eseniya" target="_blank">v0.0.3</a></footer>
  </main>
  <div class="word-list-wrapper" v-if="showList && words.length && !loading">
    <input type="text" v-model="search" autocomplete="false">
    <div class="word-list">

      <div class="word-inlist" v-for="word in filtered" :class="{ 'current-word': currentWord == words.indexOf(word) }" @click="currentWord = words.indexOf(word)">
        {{ word }}
      </div>
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
  width: 400px;
  max-width: 100%;
  position: relative;
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

footer,
header {
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

.close-button {
  position: absolute;
  top: 10px;
  right: 0;
  font-size: 18px;
  background: none;
  color: white;
  border: none;
  outline: none;
  width: 30px;
  text-align: center;
}

.word-list-wrapper {
  position: relative;
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  input {
    width: 100%;
  }
}

.word-list {
  overflow-y: auto;
  flex: 1;
}

.word-inlist {
  cursor: pointer;
}

.defs {
  width: 100%;
}

.settings {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 64px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #212121;
  z-index: 6;
}

.transcription {
  margin-top: -16px;
}

.current-word {
  background-color: rgba(255, 255, 0, 0.3);
}

meter {
  width: 100%;
}
</style>