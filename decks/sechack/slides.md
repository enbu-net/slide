---
theme: seriph
title: enbu 10 分発表(SecHack365)
genre: Any%
colorSchema: light
defaults:
  layout: biim
fonts:
  mono: JetBrains Mono
est: 0:07
---

<div class="h-full flex items-center justify-center gap-12" style="zoom: 1.25">
  <img src="./images/enbu.png" class="w-52 dance" alt="enbu">
  <div>
    <div class="text-8xl font-bold tracking-wide">enbu</div>
    <div class="text-2xl mt-4">チームの機密情報を、仕組みで安全に</div>
    <div class="mt-8 text-lg op-80 font-mono">github.com/enbu-net/enbu</div>
  </div>
</div>

<style>
.dance {
  animation: dance 2.4s ease-in-out infinite;
  transform-origin: 50% 90%;
}
@keyframes dance {
  0%, 100% { transform: rotate(-6deg); }
  50% { transform: rotate(6deg) translateY(-6px); }
}
@media (prefers-reduced-motion: reduce) {
  .dance { animation: none; }
}
</style>

<!--
enbu という、チームで機密情報を共有する道具の話をします
-->

---
title: §1 シークレットの話
est: 0:04
---

<EnbuSection :n="1" />

<!--
まず、機密情報の話
-->

---
title: シークレットってなに?
est: 0:18
---

<EnbuStage :zoom="1.2">

<div class="lead">機密情報 = <span class="hl" :class="{ on: $clicks >= 1 }">知られたら困る</span>もの</div>

<div class="grid grid-cols-4 gap-4">
  <div class="card"><div class="big-emoji">🔑</div><div class="font-bold mt-1">API キー</div><div class="text-lg">使い放題にされる</div></div>
  <div class="card"><div class="big-emoji">🗝️</div><div class="font-bold mt-1">パスワード</div><div class="text-lg">DB を丸ごと</div></div>
  <div class="card"><div class="big-emoji">⚙️</div><div class="font-bold mt-1">設定ファイル</div><div class="text-lg">.env など</div></div>
  <div class="card"><div class="big-emoji">📄</div><div class="font-bold mt-1">機密文書</div><div class="text-lg">顧客情報など</div></div>
</div>

<div v-click="1" class="flex justify-center mt-6">
  <div class="warn">😈 コピーされたら、他人でもそのまま使える。漏れた事実は取り消せない</div>
</div>

</EnbuStage>

<style>
.warn {
  padding: 0.4rem 1rem;
  font-size: 1.15rem;
  font-weight: bold;
  border-radius: 8px;
  background: #fee2e2;
  border: 2px solid #b91c1c;
  color: #7f1d1d;
}
</style>

<!--
API キーやパスワード、設定ファイル、顧客情報。知られたら困るものを、誰もが扱っています
[click:1] コピーされたら他人がそのまま使えて、漏れたら取り消せません
-->

---
title: でも見せないと開発できない
est: 0:11
---

<EnbuStage :zoom="1.2">

<div class="lead">本来は誰にも見せてはダメ。<br><span v-click="1">でも、仲間には見せないと開発できない</span></div>

<div class="relative flex justify-center">
  <svg width="520" height="210" viewBox="0 0 520 210">
    <circle cx="260" cy="105" r="95" fill="#fff1f2" stroke="#dd2e44" stroke-width="3" stroke-dasharray="8 6" />
  </svg>
  <div class="absolute inset-0 flex items-center justify-center">
    <div class="flex flex-col items-center gap-1">
      <div class="big-emoji">🔑</div>
      <div v-click="1" class="flex gap-3 text-3xl"><span>🧑‍💻</span><span>👩‍💻</span><span>🧑‍🎓</span></div>
    </div>
  </div>
  <div class="outside" style="left: 40px; top: 70px;">😈</div>
  <div class="outside" style="right: 40px; top: 70px;">🕵️</div>
</div>

</EnbuStage>

<style>
.outside {
  position: absolute;
  font-size: 2.4rem;
  opacity: 0.8;
}
</style>

<!--
だから本来は、誰にも見せてはいけない
[click:1] でも仲間には見せないと、開発が進みません
-->

---
title: そもそも矛盾している
est: 0:08
---

<EnbuStage :zoom="1.3">

<div class="lead">「見せてはいけないものを、<br>限られた人にだけ見せたい」<span class="sub">そもそも矛盾した話。だから、みんなどこかで無理をしている</span></div>

<div class="flex items-center justify-center gap-6">
  <EnbuBox icon="🙈" title="見せない" tone="accent" class="w-32" />
  <div class="text-4xl font-bold" style="color:#dd2e44">⇄</div>
  <EnbuBox icon="👀" title="見せる" tone="accent" class="w-32" />
</div>

</EnbuStage>

<!--
見せてはいけないものを、限られた人にだけ見せる。そもそも矛盾した話です
-->

---
title: §2 今のやり方
est: 0:04
---

<EnbuSection :n="2" />

<!--
では今、どうしているか
-->

---
title: チャットで送る
est: 0:27
---

<EnbuStage :zoom="1.15">

<div class="lead">チャットに貼ると、<span class="hl" :class="{ on: $clicks >= 2 }">ずっと残る</span></div>

<div class="flex items-start justify-center gap-6">
  <div class="chat">
    <div class="chat-head"><span class="flex items-center gap-2"><img src="./images/logos/slack.svg" class="logo-chip" alt="Slack"># dev-team</span><span v-click="2" class="search">🔍 API_KEY <b>1 件</b></span></div>
    <div class="day">2025 年 4 月 1 日</div>
    <div class="msg" :class="{ found: $clicks >= 2 }"><b>Alice</b>本番のキーです<code>API_KEY=sk-live-9x2fQ7</code></div>
    <div class="msg"><b>Bob</b>顧客リストも置いときます<span class="file">📎 顧客リスト.xlsx</span></div>
    <div v-click="1" class="day">— 1 年後 —</div>
    <div v-click="1" class="msg join">➕ Carol が参加しました</div>
  </div>
  <div v-click="3" class="stat">
    <div class="num">2.4%</div>
    <div>企業の Slack チャンネルの 2.4% に、シークレットが残っていた</div>
    <div class="src">GitGuardian「State of Secrets Sprawl 2025」</div>
  </div>
</div>

</EnbuStage>

<!--
一番多いのは、Slack や Discord に貼る方法
[click:1] 1 年後、新しく Carol が入ってきて
[click:2] 検索すると、昔のキーがそのまま出てきます
[click:3] 企業の Slack の 2.4% のチャンネルに、実際に残っていたそうです
-->

---
title: チャットは値が化ける
est: 0:18
---

<EnbuStage :zoom="1.12">

<div class="lead">貼った値は、<span class="hl" :class="{ on: $clicks >= 1 }">化ける</span>し、<span class="hl" :class="{ on: $clicks >= 2 }">古くなる</span></div>

<div class="flex items-start justify-center gap-5">
  <div class="chat dc">
    <div class="chat-head"><span class="flex items-center gap-2"><img src="./images/logos/discord.svg" class="logo-chip" alt="Discord"># dev</span></div>
    <div class="typed"><span>送ったテキスト</span><code>DB_PASSWORD=pa__ss__word</code></div>
    <div class="msg"><b>Alice</b><span class="mono">DB_PASSWORD=pa<u>ss</u>word</span></div>
    <div v-click="1" class="msg"><b>Bob</b>コピーしたけど <span class="mono bad">password</span> で入れない…</div>
  </div>
  <div v-click="2" class="chat dc">
    <div class="chat-head"><span># dev</span></div>
    <div class="msg"><b>Alice</b><span class="mono">API_KEY=sk-live-<s>9x2f</s></span></div>
    <div class="msg"><b>Alice</b>キー変えました <span class="mono">sk-live-<s>Q7mk</s></span></div>
    <div class="msg"><b>Alice</b>すみません、こっちが最新 <span class="mono">sk-live-Zp4c</span></div>
    <div class="msg"><b>Bob</b>まだ 1 個目のを使ってた…</div>
  </div>
</div>

</EnbuStage>

<style>
.typed { display: flex; flex-direction: column; gap: 0.1rem; padding: 0.4rem 1rem; font-size: 1.15rem; background: #f3f4f6; color: #374151; }
.mono { font-family: var(--slidev-code-font-family, monospace); font-size: 1.2rem; }
.mono.bad { color: #b91c1c; font-weight: bold; }
</style>

<!--
Discord では、アンダースコア 2 つで囲むと下線になります
[click:1] コピーすると記号が消えて、動きません
[click:2] 値を変えるたびに貼り直しで、古い値を使う人が出ます
-->

---
title: SOPS ですり替え
est: 0:32
---

<EnbuStage :zoom="1.15">

<div class="lead">Git で暗号化しても、<span class="hl" :class="{ on: $clicks >= 2 }">中身をすり替えられる</span><span class="sub flex items-center justify-center gap-2"><img src="./images/logos/sops.png" class="logo-chip" alt="SOPS">SOPS:値を暗号化して <img src="./images/logos/git.svg" class="logo-chip" alt="Git"> Git にコミットする道具</span></div>

<div class="flex items-start justify-center gap-5">
  <div class="term">
    <div class="term-head"><i /><i /><i /></div>
    <div class="cm"># 😈 Mallory: 書き込めるだけ。鍵はない</div>
    <div><span class="ps">$</span> cat .sops.yaml</div>
    <div class="out">  - age: age1w39g…, age1a4ft… <span class="cm"># 公開鍵は丸見え</span></div>
    <div v-click="1"><span class="ps">$</span> echo 'API_URL=https://evil.example' \</div>
    <div v-click="1">&nbsp;&nbsp;| sops encrypt … > .env.enc</div>
    <div v-click="1"><span class="ps">$</span> git commit -am "update secrets"</div>
    <div v-click="2" class="cm mt-2"># 🧑‍💻 Alice</div>
    <div v-click="2"><span class="ps">$</span> sops decrypt .env.enc</div>
    <div v-click="2" class="out leak">API_URL=https://evil.example</div>
    <div v-click="2" class="cm"># エラーも警告も出ない</div>
  </div>
  <div v-click="3" class="stat">
    <div class="num">🔒 ≠ ㊞</div>
    <div>暗号化は「読めなくする」だけ。<b>誰が書いたか</b>は確かめない</div>
  </div>
</div>

</EnbuStage>

<!--
次は、SOPS で暗号化して Git に置く方法。実際に試しました。Mallory は鍵がなく、書き込めるだけ
[click:1] 宛先の公開鍵で、自分の値を暗号化してコミット
[click:2] Alice が開くと、警告なしに偽の値が出てきます
[click:3] 暗号化は読めなくするだけで、誰が書いたかは確かめません
-->

---
title: SOPS は手作業が多い
est: 0:16
---

<EnbuStage :zoom="1.12">

<div class="lead">メンバーが変わるたびに、<span class="hl" :class="{ on: $clicks >= 2 }">全部手作業</span></div>

<div class="flex items-start justify-center gap-6">
  <div class="steps">
    <div class="font-bold mb-1">👋 1 人入る・抜けるたびに</div>
    <div>① 公開鍵を集める(チャットで…)</div>
    <div>② .sops.yaml を書き換える</div>
    <div>③ 全部のファイルで <code>sops updatekeys</code></div>
    <div>④ 抜けた人が見た値を全部変える</div>
    <div>⑤ コミットして、全員に pull してもらう</div>
  </div>
  <div v-click="1" class="term w-76">
    <div class="term-head"><i /><i /><i /></div>
    <div class="cm"># 2 人が別々に値を変えた</div>
    <div><span class="ps">$</span> git merge bob</div>
    <div class="out leak">CONFLICT … in .env.enc</div>
    <div class="cm"># 暗号文を手で直す</div>
  </div>
</div>

</EnbuStage>

<style>
.steps {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.7rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  font-size: 1.15rem;
}
</style>

<!--
人が出入りするたびに、鍵を集めて暗号化し直し
[click:1] 2 人が別々の値を変えただけで、暗号文がコンフリクトします
[click:2] 全部、手作業です
-->

---
title: 専用サービス
est: 0:19
---

<EnbuStage :zoom="1.1">

<div class="lead">専用サービスは安全。でも、<span class="hl" :class="{ on: $clicks >= 2 }">人数分のお金</span>がかかる</div>

<div class="flex items-start justify-center gap-5">
  <div class="quote">
    <div class="quote-head">🧾 5 人で 1 年使うと(1 ドル = 150 円)</div>
    <div class="row"><span class="flex items-center gap-2"><img src="./images/logos/1password.svg" class="logo-chip" alt=""><span>1Password Teams<small>10 人まで定額</small></span></span><b>約 4.5 万円</b></div>
    <div class="row"><span class="flex items-center gap-2"><img src="./images/logos/1password.svg" class="logo-chip" alt=""><span>1Password Business<small>1 人 $8.99/月</small></span></span><b>約 8.1 万円</b></div>
    <div class="row"><span class="flex items-center gap-2"><img src="./images/logos/doppler.svg" class="logo-chip" alt=""><span>Doppler Team<small>1 人 $21/月</small></span></span><b>約 19 万円</b></div>
    <div class="note">2026 年 11 月、各社公式サイトの価格</div>
  </div>
  <div class="flex flex-col gap-3">
    <div v-click="1" class="member">🤝 社外の人を 1 人足すと<br><b>+1.6 万〜3.8 万円/年</b></div>
    <div v-click="2" class="member">🎓 学生 5 人なら<br><b>1 人 9 千〜3.8 万円/年</b></div>
  </div>
</div>

</EnbuStage>

<style>
.quote {
  width: 28rem;
  border: 2px solid #1f2937;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  color: #111827;
}
.quote-head { padding: 0.4rem 1rem; font-weight: bold; font-size: 1.15rem; background: #f3f4f6; }
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.4rem 1rem;
  font-size: 1.2rem;
  border-top: 1px solid #e5e7eb;
}
.row small { display: block; font-size: 1.15rem; color: #4b5563; }
.row b { font-size: 1.4rem; white-space: nowrap; }
.note { padding: 0.3rem 1rem; font-size: 1rem; color: #4b5563; border-top: 1px solid #e5e7eb; }
.member {
  padding: 0.45rem 0.9rem;
  font-size: 1.2rem;
  line-height: 1.45;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  color: #111827;
}
</style>

<!--
1Password のような専用サービスは安全ですが、5 人で年に 4 万から 19 万円
[click:1] 社外の人を足すと、さらに増えます
[click:2] 学生チームには重いですね
-->

---
title: 今のやり方のまとめ
est: 0:18
---

<EnbuStage :zoom="1.15">

<div class="lead">安全と手軽さが、<span class="hl" :class="{ on: $clicks >= 1 }">両立していない</span></div>

<table class="cmp">
  <thead><tr><th></th><th>抜けた人に<br>見えない</th><th>すり替え<br>られない</th><th>手間が<br>少ない</th><th>無料・<br>アカウント不要</th></tr></thead>
  <tbody>
    <tr><td><img src="./images/logos/slack.svg" class="logo-chip" alt=""> チャット</td><td class="ng">✗</td><td class="ng">✗</td><td class="ng">✗ 貼り直し</td><td class="ok">○</td></tr>
    <tr><td><img src="./images/logos/sops.png" class="logo-chip" alt=""> SOPS + Git</td><td class="ng">△ 手作業</td><td class="ng">✗</td><td class="ng">✗</td><td class="ok">○</td></tr>
    <tr><td><img src="./images/logos/1password.svg" class="logo-chip" alt=""> 専用サービス</td><td class="ok">○</td><td class="ok">○</td><td class="ok">○</td><td class="ng">✗</td></tr>
    <tr v-click="2" class="want"><td>💃 ほしいもの</td><td class="ok">○</td><td class="ok">○</td><td class="ok">○</td><td class="ok">○</td></tr>
  </tbody>
</table>

</EnbuStage>

<style>
.cmp { margin: 0 auto; border-collapse: collapse; background: #fff; font-size: 1.2rem; }
.cmp th, .cmp td { padding: 0.3rem 0.7rem; border: 1px solid #d1d5db; text-align: center; }
.cmp th { font-size: 1.15rem; line-height: 1.3; background: #f3f4f6; }
.cmp td:first-child { text-align: left; font-weight: bold; white-space: nowrap; }
.cmp .ok { color: #15803d; font-weight: bold; }
.cmp .ng { color: #b91c1c; font-weight: bold; }
.cmp .want td { background: #fff1f2; }
</style>

<!--
どれも、どこかに丸がつきません
[click:1] 安全と手軽さが両立せず、人の注意と手作業に頼っています
[click:2] 手軽で、安全で、安いもの。それを作りました
-->

---
title: §3 enbu
est: 0:03
---

<EnbuSection :n="3" />

<!--
それが enbu です
-->

---
title: enbu とは
est: 0:19
---

<EnbuStage :zoom="1.15">

<div class="lead">今あるアカウントと置き場所で、<br><span class="hl" :class="{ on: $clicks >= 1 }">機密情報を安全に保管・共有</span></div>

<div class="flex items-center justify-center gap-8">
  <img src="./images/enbu.png" class="w-28" alt="enbu">
  <div class="flex flex-col gap-2">
    <div class="feat">👤 アカウントを増やさない。<img src="./images/logos/github.svg" class="logo-chip" alt=""> GitHub や S3 をそのまま使う</div>
    <div class="feat">🔑 鍵の手動管理なし</div>
    <div class="feat">🧰 暗号化・履歴・共有・取得を 1 つの仕組みで</div>
    <div class="feat">🖥️ GUI(デスクトップ / VS Code)と CLI</div>
    <div v-click="1" class="feat goal">🛡️ 目指すのは Secure by Default:人の注意や手作業に頼らない</div>
  </div>
</div>

</EnbuStage>

<style>
.feat {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.9rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  font-size: 1.15rem;
}
.feat.goal { border-color: #dd2e44; background: #fff1f2; font-weight: bold; }
</style>

<!--
今ある GitHub や S3 を使って、アカウントも鍵の手作業も増やさず、暗号化から共有までをまとめて扱います
[click:1] 目指すのは、人の注意に頼らない Secure by Default です
-->

---
title: enbu のやり方
est: 0:16
---

<EnbuStage :zoom="1.15">

<div class="lead">今ある置き場所に、<span class="hl" :class="{ on: $clicks >= 1 }">鍵をかけた中身だけ</span>を置く</div>

<div class="flex items-center justify-center gap-4">
  <div class="flex flex-col gap-2">
    <EnbuBox icon="🧑‍💻" title="Alice" sub="🔑 Alice の鍵" class="w-40 py-1" />
    <EnbuBox icon="👩‍💻" title="Bob" sub="🔑 Bob の鍵" class="w-40 py-1" />
  </div>
  <EnbuArrow v-click="1" label="🔒 暗号文" flow color="#dd2e44" size="6rem" />
  <div v-click="1" class="store">
    <div class="text-lg font-bold mb-2">☁️ 今ある置き場所</div>
    <div class="flex gap-2">
      <EnbuBox icon="📦" title="GitHub" class="w-24 py-1" />
      <EnbuBox icon="🪣" title="S3" class="w-24 py-1" />
    </div>
  </div>
</div>

<div v-click="2" class="flex justify-center gap-6 mt-6 text-lg">
  <span>💸 追加のお金 <b class="ng-mark">なし</b></span>
  <span>👤 新しいアカウント <b class="ng-mark">なし</b></span>
</div>

</EnbuStage>

<style>
.store {
  padding: 0.8rem 1rem;
  border: 3px dashed #9ca3af;
  border-radius: 14px;
  background: #f9fafb;
  text-align: center;
}
</style>

<!--
1 人 1 つずつ鍵を持ち
[click:1] 全員の鍵で開けられる暗号文だけを、置き場所に置きます
[click:2] だから追加のお金もアカウントもいりません
-->

---
title: §4 だれに嬉しい?
est: 0:03
---

<EnbuSection :n="4" />

<!--
だれに嬉しいか
-->

---
title: 個人開発者
est: 0:22
---

<EnbuStage :zoom="1.15">

<div class="lead">🧑‍💻 個人開発者・初学者:<span class="hl" :class="{ on: $clicks >= 1 }">消しても戻せる、漏らさない</span></div>

<div class="persona">
  <div class="col now"><div class="h">😩 今</div><div>.env は今の PC の中だけ</div><div>消したら作り直し</div><div>うっかり Git にコミット</div></div>
  <div v-click="1" class="col good"><div class="h">✅ enbu だと</div><div>消してもクラウドから戻せる</div><div>履歴が自動で残る</div><div>.gitignore も自動で、うっかり公開を防ぐ</div><div>GUI で簡単。CLI なら AI も使える</div></div>
  <div v-click="2" class="col bad"><div class="h">⚠️ 困るところ</div><div>合鍵がない。<b>全部の PC を失うと開けない</b></div><div>→ 2 台以上登録しておく</div></div>
</div>

</EnbuStage>

<!--
個人開発者や初学者は、.env を消したり、うっかりコミットしたり
[click:1] enbu なら、クラウドから戻せて履歴も残り、.gitignore も自動です
[click:2] ただ合鍵はないので、PC は 2 台以上登録してください
-->

---
title: 学生チーム
est: 0:21
---

<EnbuStage :zoom="1.15">

<div class="lead">🎓 学生チーム:<span class="hl" :class="{ on: $clicks >= 1 }">無料で、いつも最新</span></div>

<div class="persona">
  <div class="col now"><div class="h">😩 今</div><div>Slack や Discord に貼る</div><div>どれが最新か分からない</div><div>卒業生もずっと読める</div></div>
  <div v-click="1" class="col good"><div class="h">✅ enbu だと</div><div>貼らずに、安全に手軽に共有</div><div>enbu が唯一の正 → 迷わない</div><div>無料で使える</div><div>卒業したら外せる</div></div>
  <div v-click="2" class="col bad"><div class="h">⚠️ 困るところ</div><div>全員がアプリを入れる</div><div>管理者が 1 台ずつ承認</div><div>外したら、値は自分で変える</div></div>
</div>

</EnbuStage>

<!--
学生チームは、チャットに貼って、どれが最新か分かりません
[click:1] enbu が唯一の正しい値になり、無料で、卒業したら外せます
[click:2] ただ全員がアプリを入れて、1 台ずつ承認が要ります
-->

---
title: 企業
est: 0:21
---

<EnbuStage :zoom="1.15">

<div class="lead">🏢 企業:<span class="hl" :class="{ on: $clicks >= 1 }">今の基盤のまま、社外の人とも</span></div>

<div class="persona">
  <div class="col now"><div class="h">😩 今</div><div>社外の人にも席を買う</div><div>zip + パスワード別送</div><div>終わっても外し忘れる</div></div>
  <div v-click="1" class="col good"><div class="h">✅ enbu だと</div><div>今のアカウント基盤で導入</div><div>社外とのやり取りや、クラウドストレージの代わりに</div><div>委託やインターンも、承認して終わったら外す</div></div>
  <div v-click="2" class="col bad"><div class="h">⚠️ 困るところ</div><div>SSO や細かい権限はまだない</div><div>CI が自動で読めない</div><div>誰が読んだかは記録できない</div></div>
</div>

</EnbuStage>

<!--
企業は、社外の人に席を買うか、zip とパスワード別送
[click:1] enbu なら今の基盤のまま、承認して、終わったら外すだけ
[click:2] ただ SSO はなく、誰が読んだかの記録も取れません
-->

---
title: §5 デモ
est: 0:03
---

<EnbuSection :n="5" />

<!--
では、動かしてみます
-->

---
title: デモ
est: 1:09
voiceHold: true
---

<EnbuStage :zoom="1.2">

<div class="lead">Alice から Bob に、<span class="hl on">.env を渡します</span> 🎬<span class="sub">1 台の PC で、デバイスも GitHub アカウントも別の 2 人</span></div>

<div class="flex items-center justify-center gap-3">
  <EnbuBox icon="🧑‍💻" title="Alice" sub="管理者" tone="accent" class="w-32" />
  <div class="flow">
    <div>① Alice が値を入れる</div>
    <div>② Bob が参加 → 指紋を確認して承認</div>
    <div>③ Alice が値を変える</div>
  </div>
  <EnbuBox icon="👩‍💻" title="Bob" sub="新メンバー" class="w-32" />
</div>

<div class="watch">👀 見てほしいところ:<b>チャットに 1 回も貼らない</b>/<b>値を変えても、貼り直さない</b></div>

</EnbuStage>

<style>
.flow {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  font-size: 1.15rem;
}
.watch {
  margin-top: 1.2rem;
  padding: 0.4rem 1rem;
  border-radius: 10px;
  background: #fff1f2;
  border: 2px solid #dd2e44;
  font-size: 1.15rem;
  text-align: center;
}
</style>

<!--
Alice が Bob に .env を渡します。見てほしいのは、一度も貼らず、変えても貼り直さないところです
-->

---
title: いま見たこと
est: 0:13
---

<EnbuStage :zoom="1.15">

<div class="lead">いま見たのは、<span class="hl" :class="{ on: $clicks >= 1 }">貼らない・貼り直さない共有</span></div>

<table class="seen">
  <tbody>
    <tr><td>💬 チャットに貼らずに渡せた</td><td>→ 残らない・化けない</td></tr>
    <tr><td>🔄 値を変えたら同期するだけ</td><td>→ 古い値を使わない</td></tr>
    <tr><td>👤 GitHub アカウントだけ</td><td>→ お金もアカウントも増えない</td></tr>
    <tr><td>🔍 指紋を確かめて承認</td><td>→ 偽物のメンバーを入れない</td></tr>
  </tbody>
</table>

</EnbuStage>

<style>
.seen { margin: 0 auto; border-collapse: collapse; background: #fff; font-size: 1.2rem; }
.seen td { padding: 0.45rem 1rem; border-bottom: 1px solid #e5e7eb; }
.seen td:first-child { font-weight: bold; }
.seen td:last-child { color: #15803d; font-weight: bold; }
</style>

<!--
貼らずに渡せて、変えても同期だけ。アカウントも増えません
[click:1] 人が確かめるのは、承認する時の指紋だけです
-->

---
title: §6 デモの裏側
est: 0:03
---

<EnbuSection :n="6" />

<!--
その裏側です
-->

---
title: 置き場所は信用しない
est: 0:09
---

<EnbuStage :zoom="1.25">

<div class="lead">置き場所は、<span class="hl" :class="{ on: $clicks >= 1 }">信用しない</span><span class="sub">見えるのは暗号文とハンコだけ</span></div>

<div class="flex items-stretch justify-center gap-4">
  <div class="zone trust">
    <div class="zone-label">🏠 自分の PC</div>
    <div class="text-center text-3xl mt-2">🔑 🔓</div>
    <div class="text-center text-lg mt-1">開けるのはここだけ</div>
  </div>
  <div class="flex items-center">
    <EnbuArrow label="🔒 + ㊞" flow color="#dd2e44" size="6rem" />
  </div>
  <div v-click="1" class="zone untrust">
    <div class="zone-label">☁️ 置き場所</div>
    <div class="text-center text-3xl mt-2">🔒 🔒 🔒</div>
    <div class="text-center text-lg mt-1">中身は読めない</div>
  </div>
</div>

</EnbuStage>

<style>
.zone {
  position: relative;
  width: 14rem;
  padding: 2.2rem 1rem 1rem;
  border-radius: 14px;
}
.trust { border: 3px solid #16a34a; background: #f0fdf4; }
.untrust { border: 3px dashed #9ca3af; background: #f9fafb; }
.zone-label { position: absolute; top: 0.5rem; left: 1rem; font-weight: bold; font-size: 1.15rem; }
</style>

<!--
置き場所に送るのは、暗号文とハンコだけ
[click:1] 置き場所そのものは、信用しません
-->

---
title: メンバー表にはハンコ
est: 0:18
---

<EnbuStage :zoom="1.25">

<div class="lead">メンバー表には、<span class="hl" :class="{ on: $clicks >= 2 }">管理者のハンコ</span><span class="sub">ハンコ = 電子署名。本人にしか押せない</span></div>

<div class="flex items-center justify-center gap-2">
  <div class="ctl"><div>👑 Alice</div><div class="stamp">㊞</div></div>
  <EnbuArrow v-click="1" label="Alice が押す" color="#16a34a" size="4.5rem" />
  <div v-click="1" class="ctl"><div>👑 Alice</div><div>👩‍💻 Bob</div><div class="stamp">㊞</div></div>
  <EnbuArrow v-click="2" label="Alice が押す" color="#16a34a" size="4.5rem" />
  <div v-click="2" class="ctl"><div>👑 Alice</div><div>👩‍💻 Bob</div><div>🧑‍🎓 Carol</div><div class="stamp">㊞</div></div>
</div>

</EnbuStage>

<style>
.ctl {
  position: relative;
  min-width: 7rem;
  padding: 0.5rem 0.8rem;
  border: 2px solid #1f2937;
  border-radius: 8px;
  background: #fff;
  font-size: 1.1rem;
  line-height: 1.6;
}
.stamp {
  position: absolute;
  right: -0.6rem;
  bottom: -0.7rem;
  font-size: 1.6rem;
  color: #dc2626;
  transform: rotate(-12deg);
}
</style>

<!--
メンバー表には、管理者のハンコ、電子署名が押されています
[click:1] さっきの承認は、ハンコを押した新しい表を作ること
[click:2] 暗号化の宛先は、この表からしか作りません
-->

---
title: §7 攻撃にどう耐えるか
est: 0:04
---

<EnbuSection :n="7" />

<!--
攻撃する側から見てみます
-->

---
title: 偽物は無視
est: 0:13
---

<EnbuStage :zoom="1.3">

<div class="lead">偽物を置かれても、<span class="hl" :class="{ on: $clicks >= 1 }">ハンコがないので無視</span></div>

<div class="flex items-center justify-center gap-6">
  <div class="ctl"><div>👑 Alice</div><div>👩‍💻 Bob</div><div class="stamp">㊞</div></div>
  <div class="ctl evil" :class="{ out: $clicks >= 1 }"><div>😈 Mallory</div><div>「私もメンバー」</div></div>
  <div v-click="1" class="text-2xl ng-mark">✗ 無視</div>
</div>

</EnbuStage>

<style>
.ctl {
  position: relative;
  min-width: 8rem;
  padding: 0.5rem 0.8rem;
  border: 2px solid #1f2937;
  border-radius: 8px;
  background: #fff;
  font-size: 1.1rem;
  line-height: 1.6;
  transition: opacity 0.4s;
}
.stamp { position: absolute; right: -0.6rem; bottom: -0.7rem; font-size: 1.6rem; color: #dc2626; transform: rotate(-12deg); }
.evil { border-color: #dc2626; border-style: dashed; background: #fef2f2; }
.evil.out { color: #4b5563; background: #f3f4f6; border-color: #9ca3af; text-decoration: line-through; }
</style>

<!--
SOPS ではすり替えが通りました。enbu で Mallory が偽物を置くと
[click:1] ハンコがないので、無視されます
-->

---
title: 巻き戻しに気づく
est: 0:08
---

<EnbuStage :zoom="1.3">

<div class="lead">古い版に戻されても、<span class="hl" :class="{ on: $clicks >= 1 }">気づいて止まる</span></div>

<div class="flex items-center justify-center gap-2">
  <div class="ver">v1</div><div class="link" />
  <div class="ver">v2</div><div class="link" />
  <div class="ver now">v3<div class="pin">📌 手元の記録</div></div>
</div>

<div v-click="1" class="flex items-center justify-center gap-3 mt-8">
  <div class="text-lg">😈 置き場所を v1 に</div>
  <EnbuArrow color="#dc2626" size="3rem" />
  <div class="text-lg font-bold ng-mark">⛔ v3 より古い → 止める</div>
</div>

</EnbuStage>

<style>
.ver {
  position: relative;
  padding: 0.5rem 1rem;
  border: 2px solid #1f2937;
  border-radius: 8px;
  background: #fff;
  font-weight: bold;
}
.ver.now { border-color: #16a34a; background: #f0fdf4; }
.pin { position: absolute; top: -1.6rem; left: 50%; transform: translateX(-50%); font-size: 1.05rem; white-space: nowrap; font-weight: normal; }
.link { width: 1.6rem; height: 3px; background: #1f2937; }
</style>

<!--
古い版に戻す攻撃は
[click:1] 手元の記録より古ければ止まります
-->

---
title: 守れないもの
est: 0:13
---

<EnbuStage :zoom="1.15">

<div class="lead">メンバー本人が裏切ったら、<span class="hl" :class="{ on: $clicks >= 1 }">止められない</span><span class="sub">内部の攻撃者や、乗っ取られたメンバーの PC</span></div>

<div class="flex items-center justify-center gap-4">
  <EnbuBox icon="👩‍💻" title="Bob(メンバー)" sub="正しく復号できる" class="w-48" />
  <EnbuArrow label="値をコピー" color="#b91c1c" size="5rem" />
  <EnbuBox icon="😈" title="外へ持ち出す" tone="bad" class="w-44" />
</div>

<div v-click="2" class="flex justify-center gap-6 mt-6">
  <div class="can"><b class="ok-mark">できること</b><br>外す・値を変える・承認の記録</div>
  <div class="can"><b class="ng-mark">できないこと</b><br>持ち出しを防ぐ・誰が読んだか知る</div>
</div>

</EnbuStage>

<style>
.can { padding: 0.5rem 1rem; font-size: 1.15rem; border: 2px solid #e5e7eb; border-radius: 10px; background: #fff; text-align: center; line-height: 1.6; }
</style>

<!--
ただ、読めるメンバー本人が裏切ったら
[click:1] 持ち出しは止められません
[click:2] できるのは、外して、値を変えるところまでです
-->

---
title: §8 作るときの工夫
est: 0:03
---

<EnbuSection :n="8" />

<!--
作るときの工夫
-->

---
title: 工夫は 3 つ
est: 0:03
---

<EnbuStage :zoom="1.25">

<div class="lead">工夫したのは 3 つ</div>

<div class="grid grid-cols-3 gap-5">
  <div class="card"><div class="big-emoji">㊞</div><div class="font-bold mt-1">① 署名付きの状態管理</div></div>
  <div class="card"><div class="big-emoji">🔀</div><div class="font-bold mt-1">② 共同編集の競合処理</div></div>
  <div class="card"><div class="big-emoji">🔑</div><div class="font-bold mt-1">③ 秘密鍵の安全な運用</div></div>
</div>

</EnbuStage>

<!--
工夫は 3 つです
-->

---
title: すべての版にハンコ
est: 0:14
---

<EnbuStage :zoom="1.2">

<div class="lead">① すべての版に、<span class="hl" :class="{ on: $clicks >= 1 }">書いた人のハンコ</span></div>

<div class="flex items-center justify-center gap-2">
  <div class="ver">v1<div class="who">🧑‍💻 Alice ㊞</div></div><div class="link" />
  <div class="ver">v2<div class="who">👩‍💻 Bob ㊞</div></div><div class="link" />
  <div class="ver">v3<div class="who">🧑‍💻 Alice ㊞</div></div>
</div>

<div v-click="1" class="text-center mt-8 text-lg">前の版も署名に含める → <b>偽物・差し替え・巻き戻し</b>が分かる</div>

</EnbuStage>

<style>
.ver { padding: 0.5rem 1rem; border: 2px solid #1f2937; border-radius: 8px; background: #fff; font-weight: bold; text-align: center; }
.who { font-size: 1.1rem; font-weight: normal; color: #b91c1c; }
.link { width: 2rem; height: 3px; background: #1f2937; }
</style>

<!--
1 つ目。値の版にも全部、書いた人のハンコを押して、前の版とつなげます
[click:1] だから偽物や巻き戻しが分かります
-->

---
title: enbu は分散システム
est: 0:18
---

<EnbuStage :zoom="1.15">

<div class="lead">② enbu には、<span class="hl" :class="{ on: $clicks >= 1 }">順番を決めるサーバーがない</span></div>

<div class="flex items-center justify-center gap-10">
  <div class="text-center">
    <div class="text-lg font-bold mb-2">☁️ 専用サービス</div>
    <div class="hub">
      <div class="node">🧑‍💻</div><div class="node">👩‍💻</div><div class="node">🧑‍🎓</div>
      <div class="center">🖥️ サーバーが<br>順番を決める</div>
    </div>
  </div>
  <div v-click="1" class="text-center">
    <div class="text-lg font-bold mb-2">💃 enbu</div>
    <div class="hub p2p">
      <div class="node">🧑‍💻</div><div class="node">👩‍💻</div><div class="node">🧑‍🎓</div>
      <div class="center dumb">📦 置くだけ<br>(信用しない)</div>
    </div>
  </div>
</div>

<div v-click="2" class="text-center mt-5 text-lg">各 PC が、自分で正しいかを判断する = <b>分散システム</b></div>

</EnbuStage>

<style>
.hub {
  display: grid;
  grid-template-columns: repeat(3, 3.4rem);
  gap: 0.5rem 1.2rem;
  justify-content: center;
  padding: 0.8rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
}
.node { font-size: 2rem; text-align: center; }
.center { grid-column: 1 / 4; padding: 0.4rem; border: 2px solid #1f2937; border-radius: 8px; font-size: 1.15rem; font-weight: bold; }
.center.dumb { border-style: dashed; border-color: #6b7280; color: #374151; font-weight: normal; }
</style>

<!--
2 つ目は競合。専用サービスでは、サーバーが順番を決めます
[click:1] enbu の置き場所は、置くだけ
[click:2] 各 PC が自分で判断する、分散システムです
-->

---
title: 同時に書いても消えない
est: 0:14
---

<EnbuStage :zoom="1.15">

<div class="lead">2 人が同時に書いても、<span class="hl" :class="{ on: $clicks >= 2 }">消えない</span></div>

<div class="relative h-60">
  <svg class="absolute inset-0 w-full h-full" viewBox="0 0 760 240">
    <path v-click="1" d="M140,120 C200,120 210,50 270,50" stroke="#6b7280" stroke-width="3" fill="none" />
    <path v-click="1" d="M140,120 C200,120 210,190 270,190" stroke="#6b7280" stroke-width="3" fill="none" />
    <path v-click="2" d="M440,50 C500,50 510,120 570,120" stroke="#6b7280" stroke-width="3" fill="none" />
    <path v-click="2" d="M440,190 C500,190 510,120 570,120" stroke="#6b7280" stroke-width="3" fill="none" />
  </svg>
  <div class="rev" style="left: 0; top: 85px;">A=1 B=1</div>
  <div v-click="1" class="rev alice" style="left: 270px; top: 15px;">🧑‍💻 <b>A=2</b> B=1</div>
  <div v-click="1" class="rev bob" style="left: 270px; top: 155px;">👩‍💻 A=1 <b>B=2</b></div>
  <div v-click="2" class="rev merged" style="left: 570px; top: 85px;">✓ <b>A=2 B=2</b></div>
</div>

</EnbuStage>

<style>
.rev {
  position: absolute;
  width: 190px;
  padding: 0.5rem 0.6rem;
  font-size: 1.15rem;
  border: 2px solid #1f2937;
  border-radius: 10px;
  background: #fff;
  font-family: var(--slidev-code-font-family, monospace);
  text-align: center;
}
.alice { border-color: #dd2e44; }
.bob { border-color: #2563eb; }
.merged { border-color: #16a34a; background: #f0fdf4; }
</style>

<!--
2 人が同時に書いても
[click:1] 上書きせず両方残し
[click:2] 自動で合わせます。同じ所なら人に選んでもらいます
-->

---
title: まれな順番だけ壊れる
est: 0:13
---

<EnbuStage :zoom="1.15">

<div class="lead">壊れるのは、<span class="hl" :class="{ on: $clicks >= 1 }">まれな順番のときだけ</span></div>

<div class="flex items-center justify-center gap-8">
  <div class="text-center">
    <div class="grid-dots">
      <span v-for="i in 48" :key="i" class="d" :class="{ red: i === 37 && $clicks >= 1, tried: [1, 2, 3].includes(i) }" />
    </div>
    <div class="text-lg mt-2">書く・読む・承認・通信切れ…の並び方</div>
  </div>
  <div class="flex flex-col gap-2 text-lg">
    <div><span class="sw tried" /> 手で試せるのは数通り</div>
    <div v-click="1"><span class="sw red" /> バグはここだけ</div>
  </div>
</div>

<div v-click="2" class="text-center mt-5 text-lg">🧪 だから、並び方ごと機械に試させる → <b>DST</b></div>

</EnbuStage>

<style>
.grid-dots { display: grid; grid-template-columns: repeat(12, 1.1rem); gap: 0.35rem; padding: 0.7rem; border: 2px solid #e5e7eb; border-radius: 10px; background: #fff; }
.d, .sw { display: inline-block; width: 1.1rem; height: 1.1rem; border-radius: 50%; background: #e5e7eb; vertical-align: middle; }
.d.tried, .sw.tried { background: #2563eb; }
.d.red, .sw.red { background: #b91c1c; }
</style>

<!--
出来事の並び方は、ものすごい数
[click:1] バグはまれな並び方でだけ出ます
[click:2] そこで DST です
-->

---
title: DST とは
est: 0:16
---

<EnbuStage :zoom="1.2">

<div class="lead">DST = <span class="hl" :class="{ on: $clicks >= 1 }">仮想の世界で何千回もリハーサル</span></div>

<div class="flex justify-center">
  <div class="world">
    <div class="text-lg font-bold mb-2">🌐 仮想の世界</div>
    <div class="flex gap-2 justify-center">
      <div class="real">🧩 enbu 本体</div>
      <div class="real">🔒 暗号</div>
    </div>
    <div v-click="1" class="flex gap-2 justify-center mt-2">
      <div class="fake">☁️ 置き場所</div>
      <div class="fake">⏰ 時計</div>
      <div class="fake">💻 PC</div>
    </div>
    <div class="flex gap-4 justify-center mt-3 text-lg">
      <span class="real-k">本物</span><span v-click="1" class="fake-k">作り物</span>
    </div>
  </div>
</div>

</EnbuStage>

<style>
.world {
  padding: 0.9rem 1.2rem;
  border: 3px solid #1f2937;
  border-radius: 14px;
  background: #fff;
  text-align: center;
}
.real, .fake { padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 1.15rem; }
.real { border: 2px solid #16a34a; background: #f0fdf4; }
.fake { border: 2px dashed #d97706; background: #fffbeb; }
.real-k { color: #15803d; font-weight: bold; }
.fake-k { color: #b45309; font-weight: bold; }
</style>

<!--
DST は、決定的シミュレーションテスト
[click:1] 本体と暗号は本物、置き場所と時計と PC は作り物の世界で、何千回も動かします
-->

---
title: 失敗を再現できる
est: 0:16
---

<EnbuStage :zoom="1.25">

<div class="lead">同じサイコロなら、<span class="hl" :class="{ on: $clicks >= 1 }">同じ失敗をもう一度</span></div>

<div class="flex items-center justify-center gap-4">
  <div class="dice">🎲 seed 42</div>
  <EnbuArrow size="3rem" />
  <div class="run">🧑‍💻 書く → 📡 通信が落ちる → 👩‍💻 読む → <span class="ng-mark">💥</span></div>
</div>
<div v-click="1" class="flex items-center justify-center gap-4 mt-4">
  <div class="dice">🎲 seed 42</div>
  <EnbuArrow size="3rem" />
  <div class="run">🧑‍💻 書く → 📡 通信が落ちる → 👩‍💻 読む → <span class="ng-mark">💥</span></div>
</div>

<div v-click="2" class="text-center mt-6 text-lg">🌙 毎晩 <b>1,024 通り × 5 OS</b></div>

</EnbuStage>

<style>
.dice {
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  background: #fef3c7;
  border: 2px solid #f59e0b;
  font-weight: bold;
  white-space: nowrap;
}
.run {
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  white-space: nowrap;
}
</style>

<!--
並び方はサイコロで決めます
[click:1] 同じ目なら、同じ失敗をもう一度起こせます
[click:2] 毎晩 1,024 通りを、5 つの OS で回しています
-->

---
title: 鍵は PC から出ない
est: 0:14
---

<EnbuStage :zoom="1.3">

<div class="lead">③ 鍵は 1 人 1 つ。<span class="hl" :class="{ on: $clicks >= 1 }">PC から出ない</span><span class="sub">チップ(TPM など)に鍵を作った場合。そうでなければ OS の鍵の保管庫へ</span></div>

<div class="flex items-center justify-center gap-8">
  <div class="device">
    <div class="text-lg font-bold mb-2">💻 PC</div>
    <div class="chip">
      <div class="text-base">セキュリティチップ</div>
      <div class="text-3xl mt-1">🔑</div>
    </div>
  </div>
  <div v-click="1" class="flex items-center gap-3">
    <EnbuArrow label="ディスクを丸ごとコピー" color="#dc2626" size="7rem" />
    <div class="copy">
      <div class="text-lg font-bold mb-2">😈 コピー</div>
      <div class="chip empty"><div class="text-3xl">∅</div></div>
    </div>
  </div>
</div>

</EnbuStage>

<style>
.device, .copy {
  padding: 0.8rem 1rem;
  border: 3px solid #1f2937;
  border-radius: 14px;
  background: #fff;
  text-align: center;
}
.copy { border-color: #dc2626; border-style: dashed; }
.chip {
  padding: 0.6rem 1rem;
  border-radius: 10px;
  color: #fff;
  background: repeating-linear-gradient(45deg, #1f2937 0 10px, #273244 10px 20px);
  box-shadow: 0 0 0 4px #dd2e44;
}
.chip.empty { background: #f3f4f6; color: #9ca3af; box-shadow: none; }
</style>

<!--
3 つ目は秘密鍵。鍵は PC のセキュリティチップの中で作ります
[click:1] ディスクを丸ごとコピーされても、鍵はついていきません
-->

---
title: §9 これから
est: 0:02
---

<EnbuSection :n="9" />

<!--
これから
-->

---
title: これから
est: 0:21
---

<EnbuStage :zoom="1.25">

<div class="lead">目指すのは、<span class="hl" :class="{ on: $clicks >= 2 }">気をつけなくても漏れない世界</span></div>

<div class="flex items-center justify-center gap-2">
  <EnbuBox icon="💃" title="今回" sub=".env をチームで共有" tone="accent" class="w-40" />
  <EnbuArrow v-click="1" size="2.5rem" />
  <div v-click="1" class="flex flex-col gap-2">
    <div class="pill">⏳ 使う時だけ有効</div>
    <div class="pill">🕵️ 怪しい動きを見つける</div>
    <div class="pill">🚨 漏えいスキャン</div>
  </div>
  <EnbuArrow v-click="2" size="2.5rem" />
  <EnbuBox v-click="2" icon="🌏" title="夢" sub="文書や顧客情報も、だれでも" class="w-40" />
</div>

</EnbuStage>

<style>
.pill {
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  background: #fff;
  border: 1px dashed #6b7280;
  font-size: 1.15rem;
}
</style>

<!--
今回作ったのは、チームで .env を共有するところまで
[click:1] 次は、使う時だけ有効な鍵や、怪しい動きの検知
[click:2] 夢は、どんな機密情報も、気をつけずに扱える世界です
-->

---
title: まとめ
est: 0:11
---

<div class="h-full flex items-center justify-center gap-10" style="zoom: 1.3">
  <img src="./images/enbu.png" class="w-36" alt="">
  <div class="flex flex-col gap-3">
    <div class="text-3xl font-bold leading-snug">見せてはいけないものを、<br>仕組みで、限られた人にだけ</div>
    <div class="mt-4 text-xl font-mono op-80">github.com/enbu-net/enbu</div>
  </div>
</div>

<!--
見せてはいけないものを、仕組みで、限られた人にだけ。それが enbu です。ありがとうございました
-->
