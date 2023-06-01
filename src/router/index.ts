import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import AlphabetView from '@/views/AlphabetView.vue'
import WordsView from '@/views/WordsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainView
    },
    {
      path: '/th',
      name: 'Alphabet',
      component: AlphabetView
    },
    {
      path: '/en',
      name: 'Words',
      component: WordsView
    }
  ]
})


export default router