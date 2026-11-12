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
title: シークレットって何？
est: 0:18
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
  <div class="warn">😈 コピーされたキーやパスワードは、他人も使えてしまう。漏れた事実は取り消せない</div>
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
[click:1] コピーされたキーやパスワードは、他人も使えてしまいます。一度漏れた事実は取り消せません
-->

---
title: でも見せないと開発できない
est: 0:11
---

<EnbuStage :zoom="1.2">

<div class="lead">関係のない人には見せられない。<br><span v-click="1">でも、仲間には見せないと開発できない</span></div>

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
[click:1] でも仲間には見せないと、開発が進みません
-->

---
title: 安全と共有を両立したい
est: 0:08
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
est: 0:04
---

<EnbuSection :n="2" />

<!--
では今、どうしているか
-->

---
title: 今のやり方は 3 つ
est: 0:00
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
est: 0:27
---

<EnbuStage :zoom="1.15">

<EnbuWays :now="1" />

<div class="lead">チャットに貼ると、<span class="hl" :class="{ on: $clicks >= 2 }">ずっと残る</span></div>

<div class="flex items-start justify-center gap-6">
  <div class="chat">
    <div class="chat-head"><span class="flex items-center gap-2"><img src="./images/logos/slack.svg" class="logo-chip" alt="Slack"># dev-team</span><span v-click="2" class="search">🔍 API_KEY <b>1 件</b></span></div>
    <div class="day">2025 年 4 月 1 日</div>
    <div class="msg" :class="{ found: $clicks >= 2 }"><b>Alice</b>本番のキーです<code>API_KEY=sk-live-9x2fQ7</code></div>
    <div v-click="1" class="day">— 1 年後 —</div>
    <div v-click="1" class="msg join">➕ Carol が参加しました</div>
    <div v-click="2" class="msg"><strong class="ng-mark">後から参加した人にも、昔のキーが見える</strong></div>
  </div>
  <div v-click="3" class="stat">
    <div class="font-bold ng-mark mb-2">有効なキーは<br>悪用されるおそれがある</div>
    <div>漏れたら、投稿を消すだけでは足りない。<b>キーの失効と再発行</b>が必要</div>
    <div class="src">企業の Slack チャンネルの 2.4% にシークレットが残存<br>GitGuardian「State of Secrets Sprawl 2025」</div>
  </div>
</div>

</EnbuStage>

<!--
1 つ目は、Slack や Discord などのチャットに貼る方法です
[click:1] 1 年後、新しく Carol が参加します
[click:2] 検索すると、当時の共有相手でなくても昔のキーが見えます
[click:3] キーが有効なら、悪用されるおそれがあります。漏れたら投稿を消すだけでなく、キーの失効と再発行が必要です
-->

---
title: チャットでは値が変わる
est: 0:18
---

<EnbuStage :zoom="1.12">

<EnbuWays :now="1" />

<div class="lead">チャットでは、<span class="hl" :class="{ on: $clicks >= 1 }">記号が消える</span>。<span class="hl" :class="{ on: $clicks >= 2 }">古い値も残る</span></div>

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
チャットでは、記号が書式として解釈されます。Discord では、二重のアンダースコアで囲むと下線になります
[click:1] 表示された文字をコピーすると、記号が抜けて認証に失敗します
[click:2] 値を変えるたびに貼り直すので、古い値を使う人が出ます
-->

---
title: SOPS ですり替え
est: 0:32
---

<EnbuStage :zoom="1.15">

<EnbuWays :now="2" />

<div class="lead">暗号化して Git に置いても、<span class="hl" :class="{ on: $clicks >= 2 }">中身をすり替えられる</span><span class="sub flex items-center justify-center gap-2"><img src="./images/logos/sops.svg" class="logo-chip" alt="SOPS">SOPS：値を暗号化して <img src="./images/logos/git.svg" class="logo-chip" alt="Git"> Git にコミットする道具</span></div>

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
2 つ目は、SOPS で暗号化して Git に置く方法です。Mallory は復号の鍵を持たず、書き込みだけができます
[click:1] 宛先の公開鍵で、偽の値を暗号化してコミットします
[click:2] Alice が開くと、警告なしに偽の値が出てきます
[click:3] 暗号化は読めなくするだけで、誰が書いたかは確かめません
-->

---
title: SOPS は手作業が多い
est: 0:16
---

<EnbuStage :zoom="1.12">

<EnbuWays :now="2" />

<div class="lead">メンバーが変わるたびに、<span class="hl" :class="{ on: $clicks >= 2 }">全部手作業</span></div>

<div class="flex items-start justify-center gap-6">
  <div class="steps">
    <div class="font-bold mb-1">👋 1 人が入る、または抜けるたびに</div>
    <div>① 公開鍵を集める（チャットなどで）</div>
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
    <div class="cm"># 競合を手作業で解決する</div>
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
メンバーが変わるたびに、公開鍵の一覧を更新します
[click:1] さらに、同時に編集すると、暗号文の競合を手作業で解決する必要があります
[click:2] 全部、手作業です
-->

---
title: 専用サービス
est: 0:19
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
est: 0:18
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

<div class="lead">今あるアカウントと置き場所で、<br><span class="hl" :class="{ on: $clicks >= 1 }">機密情報を安全に保管して共有</span></div>

<div class="flex items-center justify-center gap-8">
  <img src="./images/enbu.png" class="w-28" alt="enbu">
  <div class="flex flex-col gap-2">
    <div class="feat">👤 アカウントを増やさない。<img src="./images/logos/github.svg" class="logo-chip" alt=""> GitHub や S3 をそのまま使う</div>
    <div class="feat">🔑 鍵の手動管理なし</div>
    <div class="feat">🧰 暗号化から共有、取得、履歴管理までを 1 つに</div>
    <div class="feat">🖥️ GUI（デスクトップ / VS Code）と CLI</div>
    <div v-click="1" class="feat goal">🛡️ 目指すのは Secure by Default：人の注意や手作業に頼らない</div>
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
[click:1] 目指すのは、人の注意に頼らない Secure by Default です
-->

---
title: enbu のやり方
est: 0:26
---

<EnbuStage :zoom="1.1">

<div class="lead">enbu は、チームの <code>.env</code> を<br><span class="hl" :class="{ on: $clicks >= 1 }">暗号化して共有するアプリ</span><span class="sub">各 PC に入れて使う。デスクトップ / VS Code / CLI</span></div>

<div class="overview">
  <div class="overview-pc">
    <div class="font-bold text-lg">🧑‍💻 Alice の PC</div>
    <div class="overview-file">📄 開発用の .env</div>
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
    <div class="overview-file">📄 .env を開発に使う</div>
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
enbu は、チームの .env を暗号化して共有するアプリです。各 PC に入れて、まず Alice が .env を登録します
[click:1] enbu が暗号化して、GitHub や S3 に送ります。平文は置きません
[click:2] 承認済みの Bob の PC で取り出し、開発に使います。メンバーの承認や更新、履歴も enbu で管理します
-->

---
title: §4 誰に役立つ？
est: 0:03
---

<EnbuSection :n="4" />

<!--
誰に役立つのか
-->

---
title: 個人開発者
est: 0:22
---

<EnbuStage :zoom="1.15">

<div class="lead">🧑‍💻 個人開発者：<span class="hl" :class="{ on: $clicks >= 1 }">復元できる。公開ミスも防ぐ</span></div>

<div class="persona">
  <div class="col now"><div class="h">😩 今</div><div>.env は今の PC の中だけ</div><div>消したら作り直し</div><div>うっかり Git にコミット</div></div>
  <div v-click="1" class="col good"><div class="h">✅ enbu だと</div><div>消してもクラウドから戻せる</div><div>履歴が自動で残る</div><div>.gitignore を自動設定して公開ミスを防ぐ</div><div>GUI で操作。CLI は AI からも使える</div></div>
  <div v-click="2" class="col bad"><div class="h">⚠️ 困るところ</div><div>復旧用の合鍵はない。<b>全部の PC を失うと開けない</b></div><div>→ 2 台以上登録しておく</div></div>
</div>

</EnbuStage>

<!--
個人開発では、.env を消したり、うっかりコミットしたりすることがあります
[click:1] enbu なら復元でき、履歴も残ります。.gitignore も自動で設定します
[click:2] ただ合鍵はないので、PC は 2 台以上登録してください
-->

---
title: 学生チーム
est: 0:21
---

<EnbuStage :zoom="1.15">

<div class="lead">🎓 学生チーム：<span class="hl" :class="{ on: $clicks >= 1 }">無料で、最新の値を共有</span></div>

<div class="persona">
  <div class="col now"><div class="h">😩 今</div><div>Slack や Discord に貼る</div><div>どれが最新か分からない</div><div>卒業生もずっと読める</div></div>
  <div v-click="1" class="col good"><div class="h">✅ enbu だと</div><div>貼らずに、安全に手軽に共有</div><div>最新の値を enbu にまとめる</div><div>無料で使える</div><div>卒業したメンバーを外せる</div></div>
  <div v-click="2" class="col bad"><div class="h">⚠️ 困るところ</div><div>全員がアプリを入れる</div><div>管理者が 1 台ずつ承認</div><div>外した後は、値も自分で変える</div></div>
</div>

</EnbuStage>

<!--
チャットで共有していると、どれが最新の値か分からなくなります
[click:1] enbu なら、無料で最新の値を共有でき、卒業したメンバーを外せます
[click:2] ただし、全員がアプリを入れ、管理者が PC を 1 台ずつ承認する必要があります
-->

---
title: 企業
est: 0:21
---

<EnbuStage :zoom="1.15">

<div class="lead">🏢 企業：<span class="hl" :class="{ on: $clicks >= 1 }">今の基盤のまま、社外の人とも</span></div>

<div class="persona">
  <div class="col now"><div class="h">😩 今</div><div>社外の人にもライセンスを購入</div><div>ZIP とパスワードを別々に送る</div><div>契約終了後も権限を外し忘れる</div></div>
  <div v-click="1" class="col good"><div class="h">✅ enbu だと</div><div>今のアカウント基盤で導入</div><div>社外の人とも機密情報を共有</div><div>委託先やインターンも、承認して終了後に外す</div></div>
  <div v-click="2" class="col bad"><div class="h">⚠️ 困るところ</div><div>SSO や細かい権限はまだない</div><div>CI が自動で読めない</div><div>誰が読んだかは記録できない</div></div>
</div>

</EnbuStage>

<!--
企業では、社外の人のライセンス費用や、安全に共有する手間が課題になります
[click:1] enbu なら今の基盤を使って共有でき、契約が終わったらメンバーを外せます
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
est: 0:56
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
est: 0:13
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
置き場所のデータを、古い版に戻す攻撃もあります
[click:1] 手元の記録より古ければ止まります
-->

---
title: 守れないもの
est: 0:13
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

<div v-click="1" class="text-center mt-8 text-lg">前の版も署名に含める → <b>偽物や差し替え、巻き戻し</b>が分かる</div>

</EnbuStage>

<style>
.ver { padding: 0.5rem 1rem; border: 2px solid #1f2937; border-radius: 8px; background: #fff; font-weight: bold; text-align: center; }
.who { font-size: 1.1rem; font-weight: normal; color: #b91c1c; }
.link { width: 2rem; height: 3px; background: #1f2937; }
</style>

<!--
1 つ目は署名です。値を更新するたびに書いた人が署名し、前の版とつなげます
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
2 つ目は競合。専用サービスでは、サーバーが順番を決めます
[click:1] enbu の置き場所は、データを保管するだけです
[click:2] 各 PC がデータを検証して同期する、分散システムです
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
2 人が同時に書き込むこともあります
[click:1] 一方を上書きせず、両方の変更を残します
[click:2] 別の項目の変更は自動で統合し、同じ項目の変更は人が選びます
-->

---
title: まれな順番で起きる不具合
est: 0:13
---

<EnbuStage :zoom="1.15">

<div class="lead"><span class="hl" :class="{ on: $clicks >= 1 }">まれな順番でだけ起きる</span>不具合がある</div>

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
DST は、決定的シミュレーションテストです
[click:1] 本体と暗号処理は本物です。置き場所や時計、PC を再現した仮想環境で、何千回も動かします
-->

---
title: 失敗を再現できる
est: 0:16
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
est: 0:14
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
est: 0:18
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
今回作ったのは、チームで .env を共有するところまでです
[click:1] 次は、使うときだけ有効な鍵や、怪しい動きの検知に取り組みます
[click:2] 将来は、文書や顧客情報も、誰もが安心して共有できる世界を目指します
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
