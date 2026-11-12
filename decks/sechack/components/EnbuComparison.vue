<script setup lang="ts">
const props = defineProps<{ audience: 'solo' | 'team' | 'company'; revealed: boolean; showLimit: boolean }>()
const content = {
  solo: {
    rows: [
      ['ファイルを消したら作り直し', 'クラウドと履歴から復元'],
      ['うっかり Git にコミット', '.gitignore を自動で設定'],
      ['暗号化や鍵の操作が難しい', 'GUI で操作。鍵はアプリが管理'],
    ],
    limit: 'すべての PC を失うと復号できない → 2 台以上を登録しておく',
  },
  team: {
    rows: [
      ['チャットに秘密情報を貼る', '暗号化して共有。貼り付けは不要'],
      ['どれが最新の値か分からない', 'enbu の値を同期して使う'],
      ['卒業後も新しい値が見える', 'メンバーを外し、以後の共有を止める'],
    ],
    limit: '全員がアプリを入れ、PC ごとに承認。除外後は、知っていた値も変更する',
  },
  company: {
    rows: [
      ['社外の人にも追加ライセンス', '既存の GitHub や S3 を利用'],
      ['ZIP とパスワードを別々に送る', '承認した PC に暗号化して共有'],
      ['契約終了後のアクセスが心配', 'メンバーを外して共有を停止'],
    ],
    limit: 'SSO、細かい権限、CI での自動取得、閲覧記録には未対応',
  },
}[props.audience]
</script>

<template>
  <div class="comparison">
    <table>
      <thead><tr><th scope="col">今の課題</th><th class="arrow-col" aria-label="対応" /><th scope="col">enbu でできること</th></tr></thead>
      <tbody>
        <tr v-for="[problem, solution] in content.rows" :key="problem">
          <td>{{ problem }}</td>
          <td class="arrow-col"><span :class="{ concealed: !revealed }">→</span></td>
          <td class="solution"><span :class="{ concealed: !revealed }">{{ solution }}</span></td>
        </tr>
      </tbody>
    </table>
    <div class="limit" :class="{ concealed: !showLimit }"><b>利用時の注意</b><span>{{ content.limit }}</span></div>
  </div>
</template>

<style scoped>
.comparison { font-size: 1.15rem; line-height: 1.5; }
table { width: 100%; table-layout: fixed; border-collapse: collapse; background: #fff; }
th { padding: 0.4rem 0.8rem; text-align: left; font-size: 1rem; color: #4b5563; border-bottom: 2px solid #d1d5db; }
td { padding: 0.65rem 0.8rem; border-bottom: 1px solid #d1d5db; }
.arrow-col { width: 2rem; padding-inline: 0; text-align: center; color: #15803d; }
.solution { background: #f0fdf4; color: #166534; font-weight: bold; }
.limit { display: flex; gap: 0.75rem; margin-top: 1rem; padding: 0.6rem 0.8rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem; background: #f9fafb; }
.limit b { white-space: nowrap; }
.concealed { visibility: hidden; }
</style>
