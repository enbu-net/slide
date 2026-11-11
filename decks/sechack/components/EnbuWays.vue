<script setup lang="ts">
// §2「今のやり方」の 3 つを、カードで並べる
import slack from '../images/logos/slack.svg'
import discord from '../images/logos/discord.svg'
import sops from '../images/logos/sops.svg'
import git from '../images/logos/git.svg'
import onePassword from '../images/logos/1password.svg'
import doppler from '../images/logos/doppler.svg'

const ways = [
  { icon: '💬', title: 'チャットに貼る', logos: [slack, discord], sub: 'Slack・Discord など' },
  { icon: '🔐', title: '暗号化して Git に置く', logos: [sops, git], sub: 'SOPS など' },
  { icon: '☁️', title: '専用サービスに預ける', logos: [onePassword, doppler], sub: '1Password・Doppler など' },
]
</script>

<template>
  <div class="enbu-ways">
    <div v-for="(w, i) in ways" :key="w.title" class="way">
      <div class="icon">{{ w.icon }}</div>
      <div class="title">{{ ['①', '②', '③'][i] }} {{ w.title }}</div>
      <div class="logos"><img v-for="l in w.logos" :key="l" :src="l" class="logo-chip" alt=""></div>
      <div class="sub">{{ w.sub }}</div>
    </div>
  </div>
</template>

<style scoped>
.enbu-ways {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.way {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  width: 16rem;
  padding: 0.8rem 0.6rem;
  border: 2px solid #d1d5db;
  border-radius: 14px;
  background: #fff;
  color: #374151;
  text-align: center;
}
.icon { font-size: 2.6rem; line-height: 1.1; }
.title { font-size: 1.25rem; font-weight: bold; }
.logos { display: flex; gap: 0.5rem; font-size: 1.4rem; }
.sub { font-size: 1.1rem; color: #4b5563; }
</style>
