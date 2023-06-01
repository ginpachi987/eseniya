<script setup lang="ts">
const letters: { sign: string, word: string, reading: string, meaning: string, class: 'mid' | 'high' | 'low', obsolete?: boolean }[] = [
  { sign: 'ก', word: 'ก ไก่', reading: 'ko kai', meaning: 'chicken', class: 'mid' },
  { sign: 'ข', word: 'ข ไข่', reading: 'kho khai', meaning: 'egg', class: 'high' },
  { sign: 'ฃ', word: 'ฃ ขวด', reading: 'kho khuat', meaning: 'bottle', class: 'high', obsolete: true },
  { sign: 'ค', word: 'ค ควาย', reading: 'kho khwai', meaning: 'buffalo', class: 'low' },
  { sign: 'ฅ', word: 'ฅ คน', reading: 'kho khon', meaning: 'person', class: 'low', obsolete: true },
  { sign: 'ฆ', word: 'ฆ ระฆัง', reading: 'kho ra-khang', meaning: 'bell', class: 'low' },
  { sign: 'ง', word: 'ง งู', reading: 'ngo ngu', meaning: 'snake', class: 'low' },
  { sign: 'จ', word: 'จ จาน', reading: 'cho chan', meaning: 'plate', class: 'mid' },
  { sign: 'ฉ', word: 'ฉ ฉิ่ง', reading: 'cho ching', meaning: 'cymbals', class: 'high' },
  { sign: 'ช', word: 'ช ช้าง', reading: 'cho chang', meaning: 'elephant', class: 'low' },
  { sign: 'ซ', word: 'ซ โซ่', reading: 'so so', meaning: 'chain', class: 'low' },
  { sign: 'ฌ', word: 'ฌ เฌอ', reading: 'cho choe', meaning: 'tree', class: 'low' },
  { sign: 'ญ', word: 'ญ หญิง', reading: 'yo ying', meaning: 'woman', class: 'low' },
  { sign: 'ฎ', word: 'ฎ ชฎา', reading: 'do cha-da', meaning: 'headdress', class: 'mid' },
  { sign: 'ฏ', word: 'ฏ ปฏัก', reading: 'to pa-tak', meaning: 'goad', class: 'mid' },
  { sign: 'ฐ', word: 'ฐ ฐาน', reading: 'tho than', meaning: 'pedestal', class: 'high' },
  { sign: 'ฑ', word: 'ฑ มณโฑ', reading: 'tho montho', meaning: 'Montho', class: 'low' },
  { sign: 'ฒ', word: 'ฒ ผู้เฒ่า', reading: 'tho phu-thao', meaning: 'elder', class: 'low' },
  { sign: 'ณ', word: 'ณ เณร', reading: 'no nen', meaning: 'samanera', class: 'low' },
  { sign: 'ด', word: 'ด เด็ก', reading: 'do dek', meaning: 'child', class: 'mid' },
  { sign: 'ต', word: 'ต เต่า', reading: 'to tao', meaning: 'turtle', class: 'mid' },
  { sign: 'ถ', word: 'ถ ถุง', reading: 'tho thung', meaning: 'sack', class: 'high' },
  { sign: 'ท', word: 'ท ทหาร', reading: 'tho thahan', meaning: 'soldier', class: 'low' },
  { sign: 'ธ', word: 'ธ ธง', reading: 'tho thong', meaning: 'flag', class: 'low' },
  { sign: 'น', word: 'น หนู', reading: 'no nu', meaning: 'mouse', class: 'low' },
  { sign: 'บ', word: 'บ ใบไม้', reading: 'bo baimai', meaning: 'leaf', class: 'mid' },
  { sign: 'ป', word: 'ป ปลา', reading: 'po pla', meaning: 'fish', class: 'mid' },
  { sign: 'ผ', word: 'ผ ผึ้ง', reading: 'pho phueng', meaning: 'bee', class: 'high' },
  { sign: 'ฝ', word: 'ฝ ฝา', reading: 'fo fa', meaning: 'lid', class: 'high' },
  { sign: 'พ', word: 'พ พาน', reading: 'pho phan', meaning: 'phan', class: 'low' },
  { sign: 'ฟ', word: 'ฟ ฟัน', reading: 'fo fan', meaning: 'tooth', class: 'low' },
  { sign: 'ภ', word: 'ภ สำเภา', reading: 'pho sam-phao', meaning: 'junk', class: 'low' },
  { sign: 'ม', word: 'ม ม้า', reading: 'mo ma', meaning: 'horse', class: 'low' },
  { sign: 'ย', word: 'ย ยักษ์', reading: 'yo yak', meaning: 'giant', class: 'low' },
  { sign: 'ร', word: 'ร เรือ', reading: 'ro ruea', meaning: 'boat', class: 'low' },
  { sign: 'ล', word: 'ล ลิง', reading: 'lo ling', meaning: 'monkey', class: 'low' },
  { sign: 'ว', word: 'ว แหวน', reading: 'wo waen', meaning: 'ring', class: 'low' },
  { sign: 'ศ', word: 'ศ ศาลา', reading: 'so sala', meaning: 'pavilion', class: 'high' },
  { sign: 'ษ', word: 'ษ ฤๅษี', reading: 'so rue-si', meaning: 'hermit', class: 'high' },
  { sign: 'ส', word: 'ส เสือ', reading: 'so suea', meaning: 'tiger', class: 'high' },
  { sign: 'ห', word: 'ห หีบ', reading: 'ho hip', meaning: 'chest', class: 'high' },
  { sign: 'ฬ', word: 'ฬ จุฬา', reading: 'lo chu-la', meaning: 'kite', class: 'low' },
  { sign: 'อ', word: 'อ อ่าง', reading: 'o ang', meaning: 'basin', class: 'mid' },
  { sign: 'ฮ', word: 'ฮ นกฮูก', reading: 'ho nok-huk', meaning: 'owl', class: 'low' }
]
</script>

<template>
  <h2>Alphabet</h2>
  <div class="letters">
    <div class="letter" v-for="(letter, i) of letters">
      <!-- <img :src="`/thai/${i+1}.png`"> -->
      <div class="sign" :class="[letter.class, { obsolete: letter.obsolete }]">{{ letter.sign }}</div>
      <div class="word">{{ letter.word }}</div>
      <div class="transcription">{{ letter.reading }}</div>
      <div class="translations">{{ letter.meaning }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.letters {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: auto;
}

.letter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sign {
  font-size: 80px;
  font-family: 'Sarabun', sans-serif;
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    font-family: 'Prompt', sans-serif;
  }
}

.mid {
  color: #ccffcc;
}

.high {
  color: #ffcccc;
}

.low {
  color: #ccccff;
}

.obsolete {
  color: rgba(128, 128, 128, 0.5);
}

img {
  width: 128px;
}
</style>