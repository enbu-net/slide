---
theme: seriph
title: enbu 機密情報を安全・手軽・柔軟に共有・管理するツール
genre: Any%
colorSchema: light
defaults:
  layout: biim
fonts:
  mono: JetBrains Mono
est: 0:12
section: 0
---

<div class="h-full flex items-center justify-center gap-8" style="zoom: 1.15">
  <img src="./images/enbu.png" class="w-36 dance" alt="enbu">
  <div>
    <div class="text-6xl font-bold tracking-wide">enbu</div>
    <div class="text-2xl font-bold mt-4 leading-snug">機密情報を安全・手軽・柔軟に<br>共有・管理するツール</div>
    <div class="text-xl mt-6 leading-relaxed">人が頑張らなくていい<br>機密情報共有・管理を目指して</div>
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
enbu、機密情報を安全、手軽、柔軟に共有、管理するツール。人が頑張らなくていい機密情報共有、管理を目指して
-->

---
title: §1 シークレットの話
est: 0:03
section: 1
sectionDivider: true
---

<EnbuSection :n="1" />

<!--
まず、機密情報の話
-->

---
title: シークレットって何？
est: 0:18
section: 1
---

<EnbuStage :zoom="1.2">

<div class="lead">機密情報 = <span class="hl" :class="{ on: $clicks >= 1 }">知られたら困る</span>もの</div>

<div class="grid grid-cols-4 gap-4">
  <div class="card"><div class="big-emoji">🔑</div><div class="font-bold mt-1">API キー</div><div class="text-lg">不正に利用される</div></div>
  <div class="card"><div class="big-emoji">🗝️</div><div class="font-bold mt-1">パスワード</div><div class="text-lg">DB に不正アクセス</div></div>
  <div class="card"><div class="big-emoji">⚙️</div><div class="font-bold mt-1">設定ファイル</div><div class="text-lg">.env など</div></div>
  <div class="card"><div class="big-emoji">📄</div><div class="font-bold mt-1">機密文書</div><div class="text-lg">顧客情報など</div></div>
</div>

<div v-click="1" class="flex justify-center mt-6">
  <div class="warn">😈 コピーされたキーやパスワードは、他人も使えてしまう。一度漏れたものは回収できない</div>
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
[click:1] コピーされたキーやパスワードは、他人も使えてしまいます。一度漏れたものは回収できません
-->

---
title: でも、仲間との共有は必要
est: 0:10
section: 1
---

<EnbuStage :zoom="1.2">

<div class="lead">関係のない人には見せられない。<br><span v-click="1">でも、一緒に活動する仲間には共有したい</span></div>

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
だから、関係のない人には見せられません
[click:1] でも、一緒に活動する仲間とは共有する必要があります
-->

---
title: 安全と共有を両立したい
est: 0:07
section: 1
---

<EnbuStage :zoom="1.3">

<div class="lead">「見せてはいけないものを、<br>限られた人にだけ見せたい」<span class="sub">相手を限って、安全に渡す仕組みが必要</span></div>

<div class="flex items-center justify-center gap-6">
  <EnbuBox icon="🙈" title="見せない" tone="accent" class="w-32" />
  <div class="text-4xl font-bold" style="color:#dd2e44">⇄</div>
  <EnbuBox icon="👀" title="見せる" tone="accent" class="w-32" />
</div>

</EnbuStage>

<!--
見せる相手を限りながら、仲間には共有したい。そのための仕組みが必要です
-->

---
title: §2 今のやり方
est: 0:03
section: 2
sectionDivider: true
---

<EnbuSection :n="2" />

<!--
では今、どうしているか
-->

---
title: 今のやり方は 3 つ
est: 0:13
section: 2
---

<EnbuStage :zoom="1.1">

<div class="lead">機密情報の渡し方は、<span class="hl" :class="{ on: $clicks >= 1 }">大きく 3 つ</span></div>

<EnbuWays big />

</EnbuStage>

<!--
今の渡し方は、大きく 3 つあります
[click:1] チャットに貼る、暗号化して Git に置く、専用サービスに預ける。順に見ます
-->

---
title: チャットで送る
est: 0:26
section: 2
---

<EnbuStage :zoom="1">
<EnbuWays :now="1" />
<div class="lead">過去のキーが、<span class="hl" :class="{ on: $clicks >= 2 }">権限のない人にも見える</span></div>
<div class="chat-story">
  <div class="chat">
    <div class="chat-head"># project</div>
    <div class="day">当時：キーを見る権限は Alice と Bob だけ</div>
    <div class="msg"><b>Alice → Bob</b>共有用のキーです<code>API_KEY=sk-live-9x2fQ7</code></div>
    <div class="msg"><b>Bob</b>受け取りました</div>
    <div v-click="1" class="day">1 年後：Carol がチャンネルに参加</div>
    <div v-click="1" class="msg join">Carol には、このキーを見る権限がない</div>
    <div v-click="2" class="msg found"><b>Carol が過去の投稿を検索</b>昔のキーが、そのまま見つかる</div>
  </div>
  <div v-click="3" class="stat"><b class="ng-mark">有効なキーは悪用されるおそれ</b><div class="mt-2">投稿を消すだけでは、コピーは回収できない。<b>失効と再発行</b>が必要</div></div>
</div>
</EnbuStage>
<style>
.chat-story { display: flex; align-items: center; justify-content: center; gap: 1.5rem; }
.chat-story .chat { width: 31rem; }
.chat-story .msg { padding-block: 0.25rem; }
</style>

<!--
Alice と Bob は、キーを見る権限を持ち、チャンネルでやり取りしていました
[click:1] 1 年後、Carol が参加します。このキーを見る権限はありません
[click:2] でも、過去の投稿を検索すると、キーがそのまま見つかります
[click:3] コピーは回収できないので、キーの失効と再発行が必要です
-->

---
title: チャットでは値が変わる
est: 0:22
section: 2
---

<EnbuStage :zoom="1.05">
<EnbuWays :now="1" />
<div class="lead">チャットでは、<span class="hl" :class="{ on: $clicks >= 1 }">値を正確に渡し続ける</span>のも大変</div>
<div class="grid grid-cols-2 gap-4">
  <div class="card text-left">
    <div class="font-bold mb-3">① 書式として表示されることがある</div>
    <div class="text-base">送信した文字列</div><code class="chat-value">pa__ss__word</code>
    <div class="text-base mt-2">チャットでの表示（下線になる）</div><div class="chat-value">pa<u>ss</u>word</div>
    <div v-click="1" class="mt-3 ng-mark text-base">記号が値の一部でも、下線の指定に使われる<br>→ コードとして送るなどの配慮が必要</div>
  </div>
  <div v-click="2" class="card text-left">
    <div class="font-bold mb-3">② 更新のたびに投稿が増える</div>
    <div class="version-message">4/1 Alice：<code>API_KEY=key-A</code></div>
    <div class="version-message">4/8 Alice：更新しました <code>key-B</code></div>
    <div class="version-message">4/9 Alice：こちらが最新 <code>key-C</code></div>
    <div class="mt-3 ng-mark text-base">Bob：4/1 の投稿からコピーしていた…<br>→ どの投稿が最新か、人が確認する</div>
  </div>
</div>
</EnbuStage>
<style>
.chat-value { display: block; padding: 0.25rem 0.5rem; background: #f3f4f6; font-family: monospace; font-size: 1.25rem; }
.version-message { padding: 0.55rem 0; border-bottom: 1px solid #e5e7eb; font-size: 1rem; }
</style>

<!--
チャットは、文字の一部を下線などの書式として表示します
[click:1] この例では、パスワードのアンダースコアが下線の指定になります。値を正確に渡すには配慮が要ります
[click:2] 更新するたびに投稿も増え、古い投稿からコピーしてしまうこともあります
-->

---
title: SOPS ですり替え
est: 0:30
section: 2
---

<EnbuStage :zoom="1">

<EnbuWays :now="2" />

<div class="lead">暗号化だけでは、<span class="hl" :class="{ on: $clicks >= 2 }">書いた人を保証できない</span><span class="sub flex items-center justify-center gap-2"><img src="./images/logos/sops.svg" class="logo-chip" alt="SOPS">SOPS：値を暗号化して <img src="./images/logos/git.svg" class="logo-chip" alt="Git"> Git にコミットする道具</span></div>

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
    <div>SOPS の暗号化だけでは、<b>誰が書いたか</b>は確認できない。<br><br>書き込み権限や署名の運用も、使う側が設計する</div>
  </div>
</div>

</EnbuStage>

<!--
2 つ目は、SOPS で暗号化して Git に置く方法です。Mallory は復号の鍵を持たず、書き込みだけができます
[click:1] 宛先の公開鍵で、偽の値を暗号化してコミットします
[click:2] Alice が開くと、警告なしに偽の値が出てきます
[click:3] 書いた人も確認するには、署名などの仕組みを使う側が用意する必要があります
-->

---
title: SOPS は運用の知識も必要
est: 0:25
section: 2
---

<EnbuStage :zoom="1.05">
<EnbuWays :now="2" />
<div class="lead">SOPS を安全に運用するには、<br><span class="hl" :class="{ on: $clicks >= 1 }">鍵と履歴への理解が必要</span></div>
<div class="grid grid-cols-2 gap-4">
  <div class="card text-left"><div class="font-bold mb-2">メンバー変更も手作業</div><div>公開鍵を集める<br>→ 宛先を更新して暗号化し直す<br>→ 抜けた人が知る値も変える</div><div v-click="1" class="mt-3 ng-mark text-base">どの操作が必要か、利用者が判断する</div></div>
  <div v-click="2" class="card text-left"><div class="font-bold mb-2">古い暗号文は Git 履歴に残る</div><div>最新の版から相手を外しても、<br>過去のコミットは書き換わらない</div><div class="mt-3 ng-mark text-base">古い暗号文と対応する秘密鍵があれば、<br>過去の値は復号できる</div></div>
</div>
<div v-click="2" class="text-center mt-4 text-lg">暗号化する道具に加えて、<b>安全な運用を組み立てる知識</b>が要る</div>
</EnbuStage>

<!--
SOPS は暗号化する道具ですが、安全な運用には鍵や履歴の知識も必要です
[click:1] 人が抜けたら、宛先の更新と再暗号化に加え、知られた値も変える必要があります
[click:2] 古い暗号文は Git 履歴に残ります。対応する秘密鍵があれば、昔の値は復号できます
-->

---
title: 専用サービス
est: 0:24
section: 2
---

<EnbuStage :zoom="1.1">

<EnbuWays :now="3" />

<div class="lead">専用サービスは便利。でも、<span class="hl" :class="{ on: $clicks >= 2 }">利用料金</span>がかかる</div>

<div class="flex items-start justify-center gap-5">
  <div class="quote">
    <div class="quote-head">🧾 5 人で 1 年使うと(1 ドル = 150 円)</div>
    <div class="row"><span class="flex items-center gap-2"><img src="./images/logos/1password.svg" class="logo-chip" alt=""><span>1Password Teams<small>10 人まで定額</small></span></span><b>約 4.5 万円</b></div>
    <div class="row"><span class="flex items-center gap-2"><img src="./images/logos/1password.svg" class="logo-chip" alt=""><span>1Password Business<small>1 人 $8.99/月</small></span></span><b>約 8.1 万円</b></div>
    <div class="row"><span class="flex items-center gap-2"><img src="./images/logos/doppler.svg" class="logo-chip" alt=""><span>Doppler Team<small>1 人 $21/月</small></span></span><b>約 19 万円</b></div>
    <div class="note">2026 年 11 月、各社公式サイトの価格</div>
  </div>
  <div class="flex flex-col gap-3">
    <div v-click="1" class="member">🤝 人数課金では、1 人増えると<br><b>+1.6 万〜3.8 万円/年</b></div>
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
3 つ目は、1Password のような専用サービスです。表のプランでは、5 人で年に約 4 万 5 千円から 19 万円です
[click:1] 人数に応じた課金では、社外の人を追加しても料金が増えます
[click:2] 学生チームには大きな負担です
-->

---
title: 今のやり方のまとめ
est: 0:15
section: 2
---

<EnbuStage :zoom="1.15">

<div class="lead">安全と手軽さが、<span class="hl" :class="{ on: $clicks >= 1 }">両立していない</span></div>

<div class="cmp">
  <div />
  <div class="ch"><div class="ci">🚪</div>抜けた人に<br>見えない</div>
  <div class="ch"><div class="ci">🛡️</div>すり替え<br>られない</div>
  <div class="ch"><div class="ci">⚡</div>手間が<br>少ない</div>
  <div class="ch"><div class="ci">💸</div>無料で<br>追加登録不要</div>

  <div class="rh"><img src="./images/logos/slack.svg" class="logo-chip" alt="">チャット</div>
  <div class="c ng"><b>✗</b></div>
  <div class="c ng"><b>✗</b></div>
  <div class="c ng"><b>✗</b><small>貼り直し</small></div>
  <div class="c ok"><b>✓</b></div>

  <div class="rh"><img src="./images/logos/sops.svg" class="logo-chip" alt="">SOPS + Git</div>
  <div class="c mid"><b>△</b><small>手作業</small></div>
  <div class="c ng"><b>✗</b></div>
  <div class="c ng"><b>✗</b></div>
  <div class="c ok"><b>✓</b></div>

  <div class="rh"><img src="./images/logos/1password.svg" class="logo-chip" alt="">専用サービス</div>
  <div class="c ok"><b>✓</b></div>
  <div class="c ok"><b>✓</b></div>
  <div class="c ok"><b>✓</b></div>
  <div class="c ng"><b>✗</b><small>人数分</small></div>

  <template v-if="$clicks >= 2">
    <div class="rh want"><img src="./images/enbu.png" class="logo-chip" alt="">enbu</div>
    <div class="c ok want"><b>✓</b></div>
    <div class="c ok want"><b>✓</b></div>
    <div class="c ok want"><b>✓</b></div>
    <div class="c ok want"><b>✓</b></div>
  </template>
</div>

</EnbuStage>

<style>
.cmp {
  display: grid;
  grid-template-columns: auto repeat(4, 8.2rem);
  gap: 0.35rem;
  justify-content: center;
  align-items: stretch;
}
.ch {
  padding: 0.2rem 0.3rem 0.35rem;
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.25;
  text-align: center;
  color: #1f2937;
}
.ci { font-size: 1.6rem; line-height: 1.2; }
.rh {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0 0.9rem 0 0.4rem;
  font-size: 1.2rem;
  font-weight: bold;
  white-space: nowrap;
}
.c {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 2.6rem;
  border-radius: 10px;
  line-height: 1.1;
}
.c b { font-size: 1.8rem; }
.c small { font-size: 1rem; font-weight: bold; }
.ok { background: #dcfce7; color: #166534; }
.ng { background: #fee2e2; color: #991b1b; }
.mid { background: #fef3c7; color: #92400e; }
.rh.want { margin-top: 0.35rem; font-size: 1.35rem; }
.c.want { margin-top: 0.35rem; outline: 3px solid #15803d; outline-offset: -3px; }
</style>

<!--
どの方法にも、手間や費用の課題があります
[click:1] 安全と手軽さが両立せず、人の注意と手作業に頼っています
[click:2] この両立を目指して、enbu を作りました
-->

---
title: §3 enbu
est: 0:03
section: 3
sectionDivider: true
---

<EnbuSection :n="3" />

<!--
それが enbu です
-->

---
title: enbu とは
est: 0:15
section: 3
---

<EnbuStage :zoom="1.15">

<div class="lead">今あるアカウントと置き場所で、<br><span class="hl" :class="{ on: $clicks >= 1 }">機密情報を安全に保管して共有</span></div>

<div class="flex items-center justify-center gap-8">
  <img src="./images/enbu.png" class="w-28" alt="enbu">
  <div class="flex flex-col gap-2">
    <div class="feat">👤 アカウントを増やさない。<img src="./images/logos/github.svg" class="logo-chip" alt=""> GitHub や S3 をそのまま使う</div>
    <div class="feat">🔑 鍵の手動管理なし</div>
    <div class="feat">🧰 暗号化から共有、取得、履歴管理までを 1 つに</div>
    <div class="feat">🖥️ GUI（デスクトップ / VS Code）と CLI</div>
    <div v-click="1" class="feat goal">🛡️ 目指すのは、人の注意や手作業に頼らないこと</div>
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
今ある GitHub や S3 を使い、新たなアカウント登録や手作業での鍵管理なしで、安全に共有します
[click:1] 目指すのは、人の注意や手作業に頼らないことです
-->

---
title: enbu のやり方
est: 0:29
section: 3
---

<EnbuStage :zoom="1.1">

<div class="lead">enbu は、チームの機密情報を<br><span class="hl" :class="{ on: $clicks >= 1 }">暗号化して共有するアプリ</span><span class="sub">各 PC に入れて使う。デスクトップ / VS Code / CLI</span></div>

<div class="overview">
  <div class="overview-pc">
    <div class="font-bold text-lg">🧑‍💻 Alice の PC</div>
    <div class="overview-file">📄 共有したい情報</div>
    <div class="text-base">↓ 登録する</div>
    <div class="overview-app">💃 enbu <small>暗号化して送る</small></div>
  </div>
  <div v-click="1" class="overview-transfer">
    <EnbuArrow label="🔒 暗号文" flow color="#dd2e44" size="3rem" />
  </div>
  <div v-click="1" class="overview-store">
    <div class="font-bold text-lg">☁️ GitHub / S3</div>
    <div class="text-base mt-2">暗号文と履歴を保管</div>
    <div class="text-base font-bold mt-1">平文は置かない</div>
  </div>
  <div v-click="2" class="overview-transfer">
    <EnbuArrow label="🔒 暗号文" flow color="#dd2e44" size="3rem" />
  </div>
  <div v-click="2" class="overview-pc">
    <div class="font-bold text-lg">👩‍💻 Bob の PC</div>
    <div class="overview-app">💃 enbu <small>承認済みの PC で復号</small></div>
    <div class="text-base">↓ 取り出す</div>
    <div class="overview-file">📄 情報を取り出して使う</div>
  </div>
</div>

<div v-click="2" class="text-center mt-5 text-lg">メンバーの承認、値の更新、履歴も <b>enbu で管理</b></div>

</EnbuStage>

<style>
.overview { display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
.overview-pc { width: 13rem; padding: 0.6rem; border: 2px solid #1f2937; border-radius: 12px; background: #fff; text-align: center; }
.overview-file { padding: 0.35rem 0; font-size: 1.05rem; }
.overview-app { padding: 0.4rem; border: 2px solid #dd2e44; border-radius: 8px; background: #fff1f2; font-weight: bold; }
.overview-app small { display: block; font-size: 1rem; font-weight: normal; }
.overview-store { padding: 0.8rem 0.6rem; border: 2px dashed #9ca3af; border-radius: 12px; background: #f9fafb; text-align: center; }
.overview-transfer { flex-shrink: 0; }
</style>

<!--
enbu は、機密情報を暗号化して共有、管理するアプリです。各 PC に入れ、Alice が情報を登録します
[click:1] enbu が暗号化して、GitHub や S3 に送ります。平文は置きません
[click:2] 承認済みの Bob の PC で取り出して使います。メンバーの承認や更新、履歴も enbu で管理します
-->

---
title: §4 誰の役に立つ？
est: 0:03
section: 4
sectionDivider: true
---

<EnbuSection :n="4" />

<!--
誰の役に立つのか
-->

---
title: 個人開発者
est: 0:21
section: 4
---

<EnbuStage :zoom="1.05">

<div class="lead">🧑‍💻 個人開発者：<span class="hl" :class="{ on: $clicks >= 1 }">復元できる。公開ミスも防ぐ</span></div>

<EnbuComparison audience="solo" :revealed="$clicks >= 1" :show-limit="$clicks >= 2" />

</EnbuStage>

<!--
個人開発では、.env を消したり、うっかりコミットしたりすることがあります
[click:1] enbu なら復元でき、履歴も残ります。.gitignore も自動で設定します
[click:2] ただ合鍵はないので、PC は 2 台以上登録してください
-->

---
title: 学生チーム
est: 0:22
section: 4
---

<EnbuStage :zoom="1.05">

<div class="lead">🎓 学生チーム：<span class="hl" :class="{ on: $clicks >= 1 }">無料で、最新の値を共有</span></div>

<EnbuComparison audience="team" :revealed="$clicks >= 1" :show-limit="$clicks >= 2" />

</EnbuStage>

<!--
チャットで共有していると、どれが最新の値か分からなくなります
[click:1] enbu なら、無料で最新の値を共有でき、卒業したメンバーを外せます
[click:2] ただし、全員がアプリを入れ、管理者が PC を 1 台ずつ承認する必要があります
-->

---
title: 企業
est: 0:20
section: 4
---

<EnbuStage :zoom="1.05">

<div class="lead">🏢 企業：<span class="hl" :class="{ on: $clicks >= 1 }">今の基盤のまま、社外の人とも</span></div>

<EnbuComparison audience="company" :revealed="$clicks >= 1" :show-limit="$clicks >= 2" />

</EnbuStage>

<!--
企業では、社外の人のライセンス費用や、安全に共有する手間が課題になります
[click:1] enbu なら今の基盤を使って共有でき、契約が終わったらメンバーを外せます
[click:2] ただ SSO はなく、誰が読んだかの記録も取れません
-->

---
title: §5 デモ
est: 0:03
section: 5
sectionDivider: true
---

<EnbuSection :n="5" />

<!--
では、動かしてみます
-->

---
title: デモ
est: 0:32
section: 5
voiceHold: true
---

<EnbuStage :zoom="1.2">

<div class="lead">Alice から Bob に、<span class="hl on">.env を渡します</span> 🎬<span class="sub">1 台の PC 上で、別の端末と GitHub アカウントを持つ 2 人を再現</span></div>

<div class="flex items-center justify-center gap-3">
  <EnbuBox icon="🧑‍💻" title="Alice" sub="管理者" tone="accent" class="w-32" />
  <div class="flow">
    <div>① Alice が値を入れる</div>
    <div>② Bob が参加 → 指紋を確認して承認</div>
    <div>③ Alice が値を変える</div>
  </div>
  <EnbuBox icon="👩‍💻" title="Bob" sub="新メンバー" class="w-32" />
</div>

<div class="watch">👀 見てほしいところ：<b>チャットに 1 回も貼らない</b>/<b>値を変えても、貼り直さない</b></div>

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
title: 今見たこと
est: 0:12
section: 5
---

<EnbuStage :zoom="1.15">

<div class="lead"><span class="hl" :class="{ on: $clicks >= 1 }">チャットに貼らずに共有</span>。貼り直しも不要</div>

<table class="seen">
  <tbody>
    <tr><td>💬 チャットに貼らずに渡せた</td><td>→ チャットに残らず、記号も保てる</td></tr>
    <tr><td>🔄 値を変えたら同期するだけ</td><td>→ 最新の値を取り出せる</td></tr>
    <tr><td>👤 GitHub アカウントだけ</td><td>→ 追加のアカウント登録は不要</td></tr>
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
チャットに貼らずに共有でき、更新後も同期するだけです。アカウントも増えません
[click:1] 承認するときは、相手の鍵の指紋を確かめます
-->

---
title: §6 デモの裏側
est: 0:03
section: 6
sectionDivider: true
---

<EnbuSection :n="6" />

<!--
その裏側です
-->

---
title: 置き場所は信用しない
est: 0:08
section: 6
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
est: 0:17
section: 6
---

<EnbuStage :zoom="1.25">

<div class="lead">メンバー表には、<span class="hl" :class="{ on: $clicks >= 2 }">管理者のハンコ</span><span class="sub">ハンコ = 電子署名。本人の秘密鍵で付ける</span></div>

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
メンバー表には、管理者のハンコに当たる電子署名が付いています
[click:1] 先ほどの承認では、新しいメンバー表を作り、署名します
[click:2] 暗号化する相手は、この表に載ったメンバーだけです
-->

---
title: §7 攻撃にどう耐えるか
est: 0:03
section: 7
sectionDivider: true
---

<EnbuSection :n="7" />

<!--
攻撃する側から見てみます
-->

---
title: すべての版にハンコ
est: 0:10
section: 7
---

<EnbuStage :zoom="1.2">

<div class="lead">すべての版に、<span class="hl" :class="{ on: $clicks >= 1 }">書いた人のハンコ</span></div>

<div class="flex items-center justify-center gap-2">
  <div class="ver">v1<div class="who">🧑‍💻 Alice ㊞</div></div><div class="link" />
  <div class="ver">v2<div class="who">👩‍💻 Bob ㊞</div></div><div class="link" />
  <div class="ver">v3<div class="who">🧑‍💻 Alice ㊞</div></div>
</div>

<div v-click="1" class="text-center mt-8 text-lg">前の版も署名に含める → <b>偽物や差し替え、巻き戻し</b>が分かる</div>

</EnbuStage>

<style>
.ver { padding: 0.5rem 1rem; border: 2px solid #1f2937; border-radius: 8px; background: #fff; font-weight: bold; text-align: center; }
.who { font-size: 1.1rem; font-weight: normal; color: #b91c1c; }
.link { width: 2rem; height: 3px; background: #1f2937; }
</style>

<!--
値を更新するたびに書いた人が署名し、前の版とつなげます
[click:1] だから偽物や巻き戻しが分かります
-->

---
title: 偽物は無視
est: 0:13
section: 7
---

<EnbuStage :zoom="1.3">

<div class="lead">偽物を置かれても、<span class="hl" :class="{ on: $clicks >= 1 }">正しいハンコがなければ無視</span></div>

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
SOPS ではすり替えが通りました。enbu では、Mallory が偽のメンバー表を置いても
[click:1] 正しいハンコがないので、無視されます
-->

---
title: 巻き戻しに気づく
est: 0:09
section: 7
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
置き場所のデータを、古い版に戻す攻撃もあります
[click:1] 手元の記録より古ければ止まります
-->

---
title: 守れないもの
est: 0:13
section: 7
---

<EnbuStage :zoom="1.15">

<div class="lead">メンバー本人が裏切ったら、<span class="hl" :class="{ on: $clicks >= 1 }">止められない</span><span class="sub">内部の攻撃者や、乗っ取られたメンバーの PC</span></div>

<div class="flex items-center justify-center gap-4">
  <EnbuBox icon="👩‍💻" title="Bob（メンバー）" sub="正しく復号できる" class="w-48" />
  <EnbuArrow label="値をコピー" color="#b91c1c" size="5rem" />
  <EnbuBox icon="😈" title="外へ持ち出す" tone="bad" class="w-44" />
</div>

<div v-click="2" class="flex justify-center gap-6 mt-6">
  <div class="can"><b class="ok-mark">できること</b><br>メンバーを外す、値を変える、承認を記録</div>
  <div class="can"><b class="ng-mark">できないこと</b><br>持ち出しを防ぐ、閲覧者を特定する</div>
</div>

</EnbuStage>

<style>
.can { padding: 0.5rem 1rem; font-size: 1.15rem; border: 2px solid #e5e7eb; border-radius: 10px; background: #fff; text-align: center; line-height: 1.6; }
</style>

<!--
ただし、読めるメンバー本人が裏切った場合は
[click:1] 持ち出しは止められません
[click:2] メンバーを外して値を変え、以後のアクセスに対処します
-->

---
title: §8 作るときの工夫
est: 0:03
section: 8
sectionDivider: true
---

<EnbuSection :n="8" />

<!--
作るときの工夫
-->

---
title: 工夫は 3 つ
est: 0:03
section: 8
---

<EnbuStage :zoom="1.25">

<div class="lead">工夫したのは 3 つ</div>

<div class="grid grid-cols-3 gap-5">
  <div class="card"><div class="big-emoji">🔀</div><div class="font-bold mt-1">① 共同編集の統合</div></div>
  <div class="card"><div class="big-emoji">🧪</div><div class="font-bold mt-1">② 失敗の再現テスト</div></div>
  <div class="card"><div class="big-emoji">🔑</div><div class="font-bold mt-1">③ 秘密鍵の保護</div></div>
</div>

</EnbuStage>

<!--
工夫は 3 つです
-->

---
title: enbu は分散システム
est: 0:18
section: 8
---

<EnbuStage :zoom="1.15">

<div class="lead">① enbu には、<span class="hl" :class="{ on: $clicks >= 1 }">順番を決めるサーバーがない</span></div>

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

<div v-click="2" class="text-center mt-5 text-lg">各 PC がデータを検証して同期する <b>分散システム</b></div>

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
1 つ目は共同編集です。専用サービスでは、サーバーが順番を決めます
[click:1] enbu の置き場所は、データを保管するだけです
[click:2] 各 PC がデータを検証して同期する、分散システムです
-->

---
title: 同時に書いても消えない
est: 0:16
section: 8
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
2 人が同時に書き込むこともあります
[click:1] 一方を上書きせず、両方の変更を残します
[click:2] 別の項目の変更は自動で統合し、同じ項目の変更は人が選びます
-->

---
title: まれな順番で起きる不具合
est: 0:13
section: 8
---

<EnbuStage :zoom="1.15">

<div class="lead"><span class="hl" :class="{ on: $clicks >= 1 }">② まれな順番でだけ起きる</span>不具合がある</div>

<div class="flex items-center justify-center gap-8">
  <div class="text-center">
    <div class="grid-dots">
      <span v-for="i in 48" :key="i" class="d" :class="{ red: i === 37 && $clicks >= 1, tried: [1, 2, 3].includes(i) }" />
    </div>
    <div class="text-lg mt-2">書き込み、読み込み、承認、通信断の順番</div>
  </div>
  <div class="flex flex-col gap-2 text-lg">
    <div><span class="sw tried" /> 手で試せるのは数通り</div>
    <div v-click="1"><span class="sw red" /> この順番で不具合が発生</div>
  </div>
</div>

<div v-click="2" class="text-center mt-5 text-lg">🧪 だから、さまざまな順番を機械に試させる → <b>DST</b></div>

</EnbuStage>

<style>
.grid-dots { display: grid; grid-template-columns: repeat(12, 1.1rem); gap: 0.35rem; padding: 0.7rem; border: 2px solid #e5e7eb; border-radius: 10px; background: #fff; }
.d, .sw { display: inline-block; width: 1.1rem; height: 1.1rem; border-radius: 50%; background: #e5e7eb; vertical-align: middle; }
.d.tried, .sw.tried { background: #2563eb; }
.d.red, .sw.red { background: #b91c1c; }
</style>

<!--
操作や通信断の順番には、膨大な組み合わせがあります
[click:1] まれな順番でしか起きない不具合もあります
[click:2] そこで DST です
-->

---
title: DST とは
est: 0:15
section: 8
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
DST は、決定的シミュレーションテストです
[click:1] 本体と暗号処理は本物です。置き場所や時計、PC を再現した仮想環境で、何千回も動かします
-->

---
title: 失敗を再現できる
est: 0:17
section: 8
---

<EnbuStage :zoom="1.25">

<div class="lead">乱数の種が同じなら、<span class="hl" :class="{ on: $clicks >= 1 }">同じ失敗をもう一度</span></div>

<div class="flex items-center justify-center gap-4">
  <div class="dice">🎲 seed 42</div>
  <EnbuArrow size="3rem" />
  <div class="run">🧑‍💻 書く → 📡 通信が切れる → 👩‍💻 読む → <span class="ng-mark">💥</span></div>
</div>
<div v-click="1" class="flex items-center justify-center gap-4 mt-4">
  <div class="dice">🎲 seed 42</div>
  <EnbuArrow size="3rem" />
  <div class="run">🧑‍💻 書く → 📡 通信が切れる → 👩‍💻 読む → <span class="ng-mark">💥</span></div>
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
操作や通信断の順番は、乱数で決めます
[click:1] 同じ乱数の種を使えば、同じ失敗を再現できます
[click:2] 毎晩 1,024 通りを、5 つの OS で回しています
-->

---
title: 鍵は PC から出ない
est: 0:13
section: 8
---

<EnbuStage :zoom="1.3">

<div class="lead">③ PC ごとの秘密鍵は、<span class="hl" :class="{ on: $clicks >= 1 }">PC から出ない</span><span class="sub">TPM などのチップ内で鍵を作る場合。使えない場合は OS の鍵保管庫へ</span></div>

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
3 つ目は秘密鍵です。対応する PC では、セキュリティチップの中で作ります
[click:1] ディスクを丸ごとコピーされても、鍵はついていきません
-->

---
title: 量子コンピュータにも備える
est: 0:21
section: 8
---

<EnbuStage :zoom="1.15">

<div class="lead">今保存した暗号文を、<span class="hl" :class="{ on: $clicks >= 1 }">未来の量子コンピュータ</span>からも守る<span class="sub">今コピーして、将来解読する攻撃（Harvest Now, Decrypt Later）</span></div>

<div class="flex items-center justify-center gap-3">
  <EnbuBox icon="😈" title="今" sub="暗号文をコピー" tone="bad" class="w-44" />
  <EnbuArrow label="何年も保存" color="#b91c1c" size="4rem" />
  <EnbuBox icon="⚛️" title="将来" sub="量子コンピュータで解く" tone="bad" class="w-44" />
</div>

<div v-click="1" class="flex justify-center mt-4">
  <div class="pq">🔐 鍵の共有：<b>ML-KEM-768</b>（耐量子）+ <b>X25519 / P-256</b>（従来の暗号）</div>
</div>
<div v-click="2" class="flex justify-center mt-2">
  <div class="pq tpm">🔑 TPM はまだ ML-KEM を計算できない → ML-KEM の鍵は <b>TPM で封印</b></div>
</div>

</EnbuStage>

<style>
.pq {
  padding: 0.35rem 1rem;
  border: 2px solid #15803d;
  border-radius: 10px;
  background: #f0fdf4;
  font-size: 1.15rem;
}
.pq.tpm { border-color: #1f2937; background: #fff; }
</style>

<!--
暗号文は、今盗まれて、将来の量子コンピュータで解かれるかもしれません
[click:1] そこで鍵の共有には、従来の暗号と耐量子暗号を組み合わせます
[click:2] TPM を使う場合、耐量子暗号の秘密鍵も TPM で封印して保護します
-->

---
title: §9 これから
est: 0:02
section: 9
sectionDivider: true
---

<EnbuSection :n="9" />

<!--
これから
-->

---
title: これから
est: 0:21
section: 9
---

<EnbuStage :zoom="1.25">

<div class="lead">目指すのは、<span class="hl" :class="{ on: $clicks >= 2 }">気をつけなくても漏れない世界</span></div>

<div class="flex items-center justify-center gap-2">
  <EnbuBox icon="💃" title="今回" sub="機密情報を共有、管理" tone="accent" class="w-40" />
  <EnbuArrow v-click="1" size="2.5rem" />
  <div v-click="1" class="flex flex-col gap-2">
    <div class="pill">⏳ 使うときだけ有効</div>
    <div class="pill">🕵️ 怪しい動きを見つける</div>
    <div class="pill">🚨 漏えいスキャン</div>
  </div>
  <EnbuArrow v-click="2" size="2.5rem" />
  <EnbuBox v-click="2" icon="🌏" title="夢" sub="文書や顧客情報も安全に共有" class="w-40" />
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
今回作ったのは、機密情報を安全に共有、管理する仕組みです
[click:1] 次は、使うときだけ有効な鍵や、怪しい動きの検知に取り組みます
[click:2] 将来は、文書や顧客情報も、誰もが安心して共有できる世界を目指します
-->

---
title: まとめ
est: 0:14
section: 9
---

<div class="h-full flex items-center justify-center gap-8" style="zoom: 1.15">
  <img src="./images/enbu.png" class="w-32" alt="enbu">
  <div>
    <div class="text-5xl font-bold mb-5">enbu</div>
    <div class="text-2xl font-bold leading-relaxed">機密情報を安全・手軽・柔軟に<br>共有・管理するツール</div>
    <div class="mt-5 text-xl leading-relaxed">人が頑張らなくていい<br>機密情報共有・管理を目指して</div>
  </div>
</div>

<!--
enbu は、機密情報を安全、手軽、柔軟に共有、管理するツールです。人が頑張らなくていい共有と管理を目指します。ありがとうございました
-->
