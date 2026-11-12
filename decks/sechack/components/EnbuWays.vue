<script setup lang="ts">
// §2「今のやり方」の 3 つ。big なら一覧として大きく、そうでなければ各スライドの上に置く目印として、いまの話を強調する
import slack from '../images/logos/slack.svg'
import discord from '../images/logos/discord.svg'
import sops from '../images/logos/sops.svg'
import git from '../images/logos/git.svg'
import onePassword from '../images/logos/1password.svg'

withDefaults(defineProps<{ now?: number, big?: boolean }>(), { now: 0, big: false })

const ways = [
  { icon: '💬', title: 'チャットに貼る', logos: [slack, discord], sub: 'Slack・Discord など' },
  { icon: '🔐', title: '暗号化して Git に置く', logos: [sops, git], sub: 'SOPS など' },
  { icon: '☁️', title: '専用サービスに預ける', logos: [onePassword], sub: '1Password・AWS Secrets Manager など' },
]
</script>

<template>
  <div class="enbu-ways" :class="{ big }">
    <div v-for="(w, i) in ways" :key="w.title" class="way" :class="{ now: now === i + 1, dim: now !== 0 && now !== i + 1 }">
      <template v-if="big">
        <div class="icon">{{ w.icon }}</div>
        <div class="title">{{ ['①', '②', '③'][i] }} {{ w.title }}</div>
        <div class="logos"><img v-for="l in w.logos" :key="l" :src="l" class="logo-chip" alt=""></div>
        <div class="sub">{{ w.sub }}</div>
      </template>
      <template v-else>{{ ['①', '②', '③'][i] }} {{ w.icon }} {{ w.title }}</template>
    </div>
  </div>
</template>

<style scoped>
.enbu-ways {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}
.way {
  padding: 0.15rem 0.7rem;
  border: 2px solid #d1d5db;
  border-radius: 999px;
  background: #fff;
  color: #374151;
  font-size: 1.1rem;
  white-space: nowrap;
}
.way.now { border-color: #dd2e44; background: #fff1f2; color: #111827; font-weight: bold; }
.way.dim { color: #4b5563; border-style: dashed; }
.big { gap: 1rem; margin-bottom: 0; }
.big .way {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  width: 16rem;
  padding: 0.8rem 0.6rem;
  border-radius: 14px;
  white-space: normal;
  text-align: center;
}
.big .icon { font-size: 2.6rem; line-height: 1.1; }
.big .title { font-size: 1.25rem; font-weight: bold; }
.big .logos { display: flex; gap: 0.5rem; font-size: 1.4rem; }
.big .sub { font-size: 1.1rem; color: #4b5563; }
</style>
