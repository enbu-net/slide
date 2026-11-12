<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ incident: 'forgery' | 'rollback' | 'member'; clicks: number }>()
const incidents = {
  forgery: {
    event: '置き場所に「Mallory もメンバー」と書いた偽の表が置かれた',
    behavior: '正しい署名がない表は無視。Mallory を共有相手に加えない',
    action: '偽の表を信用せず、管理者と正しいメンバー表を確認する',
  },
  rollback: {
    event: '手元では v3 まで取得済みなのに、置き場所が v1 に戻された',
    behavior: '手元の記録より古い版を検出し、同期を止める',
    action: '手元の記録を消して進めず、管理者と版の食い違いを確認する',
  },
  member: {
    event: '復号できるメンバーが、値をコピーして外へ持ち出した',
    behavior: '持ち出しは防げず、誰が読んだかも特定できない',
    action: 'メンバーを外す。キーやパスワードは失効・変更。コピーは回収できない',
  },
}
const current = computed(() => incidents[props.incident])
</script>

<template>
  <dl class="incident" :class="{ limitation: incident === 'member' }">
    <div><dt>起きたこと</dt><dd>{{ current.event }}</dd></div>
    <div :class="{ concealed: clicks < 1 }"><dt>enbu の挙動</dt><dd>{{ current.behavior }}</dd></div>
    <div :class="{ concealed: clicks < 2 }"><dt>利用者の対処</dt><dd>{{ current.action }}</dd></div>
  </dl>
</template>

<style scoped>
.incident { margin: 0; border: 1px solid #d1d5db; border-radius: 10px; overflow: hidden; font-size: 1.2rem; line-height: 1.6; background: #fff; }
.incident > div { display: grid; grid-template-columns: 9rem 1fr; border-bottom: 1px solid #e5e7eb; }
.incident > div:last-child { border-bottom: 0; }
dt { padding: 0.9rem 1rem; background: #f3f4f6; font-size: 1.05rem; font-weight: bold; }
dd { margin: 0; padding: 0.9rem 1rem; }
.incident > div:nth-child(2) dd { background: #f0fdf4; color: #166534; font-weight: bold; }
.incident.limitation > div:nth-child(2) dd { background: #fef2f2; color: #991b1b; }
.incident > div:last-child dd { background: #fff1f2; font-weight: bold; }
.concealed { visibility: hidden; }
</style>
