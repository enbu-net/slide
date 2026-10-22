---
theme: seriph
title: enbu 紹介
genre: Any%
colorSchema: light
defaults:
  layout: biim
fonts:
  mono: JetBrains Mono
est: 0:15
---

<div class="h-full flex items-center justify-center gap-12" style="zoom: 1.25">
  <img src="./images/enbu.png" class="w-52 dance" alt="enbu">
  <div>
    <div class="text-8xl font-bold tracking-wide">enbu</div>
    <div class="text-2xl mt-4">チームの機密情報を、仕組みで安全に</div>
    <div class="mt-8 text-sm op-60 font-mono">github.com/enbu-net/enbu</div>
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
</style>

<!--
はい、enbu の紹介をやっていきます
-->

---
title: enbu ってなに?
est: 0:30
---

<EnbuStage :zoom="1.05">

<div class="text-center text-lg op-70">enbu は</div>
<div class="text-center text-4xl font-bold mt-1 leading-snug">
  チームの機密情報を、<br>
  <span class="hl" :class="{ on: $clicks >= 1 }">人の注意ではなく仕組みで</span>安全に共有する
</div>

<div class="flex justify-center"><div class="tri">
  <svg class="absolute inset-0" viewBox="0 0 520 250">
    <polygon v-click="2" points="260,22 40,228 480,228" fill="#fff1f2" stroke="#dd2e44" stroke-width="3" stroke-linejoin="round" />
  </svg>
  <div v-click="2" class="vtx" style="left: 260px; top: 0;">🔒 安全</div>
  <div v-click="2" class="vtx" style="left: 40px; top: 228px;">🤝 共有しやすさ</div>
  <div v-click="2" class="vtx" style="left: 480px; top: 228px;">🛠️ 運用しやすさ</div>
  <div v-click="3" class="center">
    <img src="./images/enbu.png" class="w-14" alt="">
    <div class="text-sm font-bold">ぜんぶ両立</div>
  </div>
</div></div>

</EnbuStage>

<style>
.hl {
  background: linear-gradient(transparent 62%, #fecdd3 62%) no-repeat;
  background-size: 0% 100%;
  transition: background-size 0.6s ease;
}
.hl.on { background-size: 100% 100%; }
.tri {
  position: relative;
  width: 520px;
  height: 250px;
  margin: 2rem auto 0;
}
.vtx {
  position: absolute;
  transform: translate(-50%, -50%);
  padding: 0.3rem 0.9rem;
  white-space: nowrap;
  font-weight: bold;
  font-size: 1.05rem;
  background: #fff;
  border: 2px solid #dd2e44;
  border-radius: 999px;
}
.center {
  position: absolute;
  left: 260px;
  top: 158px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<!--
enbu は、チームの機密情報を安全に共有するためのツールです
[click:1] ポイントは、人が気を付けることに頼らず、仕組みで安全にすることです
[click:2] 安全であること、共有しやすいこと、運用しやすいこと。ふつうはどれかを諦めがちな 3 つを
[click:3] enbu はぜんぶ両立させることを目指しています
-->

---
title: だれのため?
est: 0:30
---

<EnbuStage :zoom="1.25">

<div class="grid grid-cols-3 gap-5">
  <div v-click="1" class="who">
    <div class="face">🧑‍💻</div>
    <div class="role">開発者</div>
    <div class="pain">「最新の .env どれ?」<br>を毎回手で渡している</div>
  </div>
  <div v-click="2" class="who">
    <div class="face">🚀</div>
    <div class="role">スタートアップ・<br>小さいチーム</div>
    <div class="pain">専用サービスの契約や<br>運用はまだ重い</div>
  </div>
  <div v-click="3" class="who">
    <div class="face">🏢</div>
    <div class="role">組織</div>
    <div class="pain">「あの人しか分からない」<br>をなくしたい</div>
  </div>
</div>

<div v-click="4" class="team">
  <span>👋 招待</span><span class="arr">→</span><span>🔑 権限</span><span class="arr">→</span><span>➕ 追加 / ➖ 削除</span>
  <div class="text-sm font-normal mt-1 op-80">メンバーの出入りまで、チームの運用ごと安全に</div>
</div>

</EnbuStage>

<style>
.who {
  padding: 1rem 0.8rem;
  border: 2px solid #e5e7eb;
  border-radius: 14px;
  text-align: center;
  background: #fff;
}
.face { font-size: 3rem; line-height: 1.2; }
.role { font-size: 1.2rem; font-weight: bold; margin: 0.3rem 0 0.5rem; line-height: 1.3; }
.pain {
  font-size: 0.85rem;
  line-height: 1.5;
  padding: 0.4rem 0.5rem;
  border-radius: 8px;
  background: #f3f4f6;
  color: #374151;
}
.team {
  margin-top: 1.8rem;
  padding: 0.8rem 1rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 12px;
  background: #fff1f2;
  border: 2px solid #dd2e44;
}
.team .arr { margin: 0 0.6rem; color: #dd2e44; }
</style>

<!--
だれのためのツールかというと
[click:1] まず、チームの開発者に .env を毎回手で渡している人
[click:2] 専用のシークレット管理サービスを入れるほどではない、スタートアップや小さいチーム
[click:3] そして、機密情報の管理が特定の人に頼りきりになっている組織です
[click:4] 招待や権限、メンバーの追加と削除まで、チームの運用ごと安全にできることを目指しています
-->

---
title: 目指すところ
est: 0:30
---

<EnbuStage :zoom="1.25">

<div class="flex items-center justify-center gap-10">
  <div class="rings">
    <div class="ring r3" v-click="2"><span>チームの機密情報</span></div>
    <div class="ring r2" v-click="1"><span>設定ファイル・認証情報</span></div>
    <div class="ring r1"><span><code>.env</code></span></div>
  </div>
  <div class="flex flex-col gap-4 w-60">
    <div class="step-l">まずは <b>.env</b> から</div>
    <div v-click="1" class="step-l">設定ファイルや<br>サービスの認証情報へ</div>
    <div v-click="2" class="step-l strong">チームの機密情報を<br>まとめて扱える基盤へ</div>
  </div>
</div>

</EnbuStage>

<style>
.rings {
  position: relative;
  width: 21rem;
  height: 21rem;
}
.ring {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  border-radius: 50%;
  border: 3px solid #dd2e44;
  font-weight: bold;
}
.ring span { margin-top: 0.8rem; font-size: 0.9rem; }
.r1 { width: 7rem; height: 7rem; align-items: center; background: #dd2e44; color: #fff; }
.r1 span { margin: 0; font-size: 1.1rem; }
.r1 code { color: #fff; background: transparent; }
.r2 { width: 14rem; height: 14rem; background: #fecdd3; }
.r3 { width: 21rem; height: 21rem; background: #fff1f2; }
.step-l {
  padding: 0.5rem 0.9rem;
  border-left: 5px solid #fecdd3;
  font-size: 1.05rem;
  line-height: 1.4;
}
.step-l.strong { border-left-color: #dd2e44; font-weight: bold; }
</style>

<!--
目指しているところです。いまは .env から始めていますが
[click:1] 設定ファイルや、サービスの認証情報にも広げて
[click:2] 最終的には、チームの機密情報をまとめて安全に扱える基盤にしたいと考えています
-->

---
title: いまの .env の配り方
est: 0:40
---

<EnbuStage :zoom="1.3">

<div class="flex gap-8 items-start mt-2">
  <div class="chat">
    <div class="chat-head"># dev-team</div>
    <div class="msg"><b>Alice</b><code>API_KEY=sk-<span class="ring-mark" :class="{ on: $clicks >= 1 }">1Il0O</span>9x...</code></div>
    <div v-click="2" class="msg"><b>Alice</b>@channel DB のパスワード変えました!各自 .env 更新お願いします 🙏</div>
    <div v-click="2" class="msg"><b>Bob</b>あれ、ローカル動かない…最新どれ?</div>
    <div v-click="3" class="msg"><b>Alice</b>暗号化した zip 送ります。パスワードは DM で 🔑</div>
  </div>

  <div class="flex flex-col gap-3 pt-6 w-64">
    <div v-click="1" class="tag">👀 <span><b>1 I l 0 O</b> の見間違い</span></div>
    <div v-click="2" class="tag">📣 <span>変更のたびに<b>全員に連絡</b></span></div>
    <div v-click="3" class="tag">🔓 <span>チャットは <b>E2E 暗号化ではない</b>。<br>鍵の渡し方も結局チャット</span></div>
    <div v-click="4" class="tag">🗃️ <span>メッセージは<b>ずっと残る</b></span></div>
  </div>
</div>

</EnbuStage>

<style>
.ring-mark {
  border-radius: 999px;
  outline: 3px solid transparent;
  outline-offset: 2px;
  transition: outline-color 0.4s;
}
.ring-mark.on { outline-color: #dc2626; }
.chat {
  flex: 1;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}
.chat-head {
  padding: 0.4rem 1rem;
  font-weight: bold;
  background: #4a154b;
  color: #fff;
}
.msg {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: 0.55rem 1rem;
  border-top: 1px solid #f3f4f6;
  font-size: 0.95rem;
}
.msg b {
  font-size: 0.8rem;
}
.tag {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  padding: 0.5rem 0.8rem;
  border-left: 5px solid #dd2e44;
  background: #fff1f2;
  border-radius: 6px;
  font-size: 0.95rem;
  line-height: 1.35;
}
</style>

<!--
まず背景です。.env、みなさんどうやって配ってますか
[click:1] よくあるのがチャットに貼る方法。でも 1 と大文字の I と小文字の l、見分けがつかないんですよね
[click:2] 値を変えたら、全員に連絡して、全員に手で更新してもらう必要があります
[click:3] しかもチャットは E2E 暗号化ではありません。zip を暗号化しても、パスワードをチャットで送ったら意味がない
[click:4] そして、そのメッセージはずっと残り続けます
-->

---
title: ほかの手法
est: 1:00
---

<EnbuStage :zoom="1.3">

<table class="cmp">
  <thead>
    <tr>
      <th></th>
      <th>💬<br>チャットで送る</th>
      <th v-click="1">☁️<br>シークレット管理<br>サービス<div class="ex">1Password, AWS など</div></th>
      <th v-click="2">📦<br>Git に暗号化して<br>コミット<div class="ex">sops, git-crypt など</div></th>
      <th v-click="3" class="me">💃<br>enbu</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>E2E 暗号化</td>
      <td class="ng">×</td>
      <td v-click="1" class="ok">○</td>
      <td v-click="2" class="ok">○</td>
      <td v-click="3" class="me ok">○</td>
    </tr>
    <tr>
      <td>新しい契約や運用がいらない</td>
      <td class="ok">○</td>
      <td v-click="1" class="ng">×</td>
      <td v-click="2" class="ok">○</td>
      <td v-click="3" class="me ok">○</td>
    </tr>
    <tr>
      <td>共有の鍵を配らなくていい</td>
      <td class="ng">×</td>
      <td v-click="1" class="ok">○</td>
      <td v-click="2" class="mid">△</td>
      <td v-click="3" class="me ok">○</td>
    </tr>
    <tr>
      <td>暗号文が消せる</td>
      <td class="ng">×</td>
      <td v-click="1" class="ok">○</td>
      <td v-click="2" class="ng">×</td>
      <td v-click="3" class="me ok">○</td>
    </tr>
  </tbody>
</table>


</EnbuStage>

<style>
.cmp {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.95rem;
}
.cmp th, .cmp td {
  padding: 0.45rem 0.4rem;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
  line-height: 1.3;
}
.cmp th {
  font-size: 0.85rem;
  border-bottom: 2px solid #9ca3af;
}
.cmp td:first-child {
  text-align: left;
  font-weight: bold;
  white-space: nowrap;
}
.ex { font-size: 0.65rem; font-weight: normal; color: #6b7280; }
.ok { color: #16a34a; font-size: 1.4rem; font-weight: bold; }
.ng { color: #dc2626; font-size: 1.4rem; font-weight: bold; }
.mid { color: #d97706; font-size: 1.4rem; font-weight: bold; }
.cmp .me {
  background: #fff1f2;
  border-left: 3px solid #dd2e44;
  border-right: 3px solid #dd2e44;
}
.cmp th.me { border-top: 3px solid #dd2e44; border-radius: 8px 8px 0 0; }
.cmp tr:last-child td.me { border-bottom: 3px solid #dd2e44; }
</style>

<!--
ではほかの手法と比べてみます。チャットは手軽ですが、暗号化も鍵の受け渡しもダメです
[click:1] 専用のシークレット管理サービスを使えば機能はそろいます。ただ契約やアカウント管理が必要で、小さいチームには重い
[click:2] じゃあ Git に暗号化して入れればいい、という手もあります。でも鍵を配る必要があることが多いし、暗号文が Git の履歴にずっと残ります。将来アルゴリズムが破られたら、過去の分まで読まれてしまう
[click:3] enbu は、いま使っているストレージだけで、この全部を満たすことを目指しています
-->

---
title: enbu のやり方
est: 0:40
---

<EnbuStage :zoom="1.15">

<div class="grid grid-cols-3 gap-5 mt-4">
  <div v-click="1" class="idea">
    <div class="big">🔐</div>
    <div class="head">1 人 1 鍵</div>
    <div class="body">共有パスワードなし。<br>宛先を人数分付けて暗号化</div>
  </div>
  <div v-click="2" class="idea">
    <div class="big">🗄️</div>
    <div class="head">置き場所は手持ち</div>
    <div class="body">GHCR などの OCI レジストリ<br>または S3 互換</div>
  </div>
  <div v-click="3" class="idea">
    <div class="big">✍️</div>
    <div class="head">ストレージを信用しない</div>
    <div class="body">名前は場所を指すだけ。<br>信じるのは<b>署名</b></div>
  </div>
</div>


</EnbuStage>

<style>
.hl {
  background: linear-gradient(transparent 62%, #fecdd3 62%) no-repeat;
  background-size: 0% 100%;
  transition: background-size 0.6s ease;
}
.hl.on { background-size: 100% 100%; }
.idea {
  padding: 1.1rem 0.8rem;
  border: 2px solid #e5e7eb;
  border-top: 6px solid #dd2e44;
  border-radius: 12px;
  text-align: center;
  background: #fff;
}
.big { font-size: 3rem; line-height: 1.2; }
.head { font-size: 1.1rem; font-weight: bold; margin: 0.3rem 0; white-space: nowrap; }
.body { font-size: 0.9rem; color: #4b5563; line-height: 1.5; }
.motto {
  margin-top: 2.2rem;
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
}
</style>

<!--
では enbu はどうやって実現しているのか。柱は 3 つです
[click:1] まず 1 人 1 鍵。全員の公開鍵を宛先にして暗号化するので、共有パスワードがいりません
[click:2] 置き場所は、すでに持っているストレージ。GitHub の GHCR や S3 が使えます
[click:3] そしてストレージは信用しません。ストレージに書けるだけの人は、メンバーにもなれないし、データも差し込めません
-->

---
title: 全体像
est: 0:45
---

<EnbuStage :zoom="1.15">

<div class="flex items-stretch gap-4 mt-1 h-88">
  <div class="zone trust">
    <div class="zone-label">🏠 自分のデバイス(信頼する)</div>
    <div class="flex gap-2 justify-center">
      <EnbuBox icon="⌨️" title="CLI" class="w-22 py-1" />
      <EnbuBox icon="🖥️" title="TUI" class="w-22 py-1" />
      <EnbuBox icon="🪟" title="デスクトップ" class="w-28 py-1" />
    </div>
    <EnbuArrow dir="down" size="1.6rem" class="self-center" />
    <div v-click="1" class="core">
      <span>🔒 暗号化</span><span>✍️ 署名</span><span>🔀 マージ</span>
    </div>
    <div v-click="2" class="flex gap-2 justify-center mt-3">
      <EnbuBox icon="🔑" title="鍵" sub="TPM / Secure Enclave" tone="accent" class="w-50 py-1" />
    </div>
  </div>

  <div class="flex flex-col justify-center">
    <EnbuArrow v-click="3" label="暗号文 + 署名" flow color="#dd2e44" size="6.5rem" />
  </div>

  <div v-click="3" class="zone untrust">
    <div class="zone-label">☁️ ストレージ(信頼しない)</div>
    <div class="flex flex-col gap-3 items-center mt-3">
      <EnbuBox icon="📦" title="OCI レジストリ" sub="GHCR など" class="w-44 py-1" />
      <EnbuBox icon="🪣" title="S3 互換" sub="AWS S3 など" class="w-44 py-1" />
    </div>
    <div v-click="4" class="text-center text-sm mt-4 leading-relaxed">
      見えるのは暗号文だけ。<br>書き換えられても<b>署名で見抜く</b>
    </div>
  </div>
</div>

</EnbuStage>

<style>
.zone {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2.2rem 1rem 1rem;
  border-radius: 14px;
}
.trust { border: 3px solid #16a34a; background: #f0fdf4; }
.untrust { border: 3px dashed #9ca3af; background: #f9fafb; flex: 0.75; }
.zone-label {
  position: absolute;
  top: 0.5rem;
  left: 1rem;
  font-weight: bold;
  font-size: 0.95rem;
}
.core {
  display: flex;
  justify-content: space-around;
  padding: 0.6rem;
  border-radius: 10px;
  background: #1f2937;
  color: #fff;
  font-weight: bold;
}
</style>

<!--
全体像です。左が自分のデバイス、右がストレージです
[click:1] CLI、TUI、デスクトップアプリのどれからでも、暗号化と署名とマージは手元で済ませます
[click:2] 秘密鍵は TPM や Secure Enclave の中にあって、デバイスから出ていきません
[click:3] ストレージに送るのは、暗号文とその署名だけです
[click:4] ストレージは信頼しない前提なので、もし書き換えられても署名の検証で見抜けます
-->

---
title: 仕組み① 1 人 1 鍵の暗号化
est: 0:50
---

<EnbuStage :zoom="1.2">

<div class="flex items-center gap-5 mt-4">
  <EnbuBox icon="📄" title=".env" sub="平文" class="w-28" />
  <EnbuArrow label="age で暗号化" color="#dd2e44" size="6rem" />

  <div class="file">
    <div class="file-head">ヘッダー:だれが開けられるか</div>
    <div class="stanza">🔑 Alice 宛て</div>
    <div class="stanza">🔑 Bob 宛て</div>
    <div class="stanza" :class="{ removed: $clicks >= 3 }">🔑 Carol 宛て</div>
    <div v-click="2" class="stanza added">🔑 Dave 宛て <span class="new">NEW</span></div>
    <div class="file-body">🔒 本文(暗号化した .env)</div>
  </div>

  <div class="flex flex-col gap-3 w-56">
    <div v-click="1" class="note">本文は 1 つ。<br>宛先が<b>人数分</b>付く</div>
    <div v-click="2" class="note">メンバー追加 =<br><b>宛先を足して暗号化し直す</b></div>
    <div v-click="3" class="note">メンバー削除 =<br><b>宛先を外して暗号化し直す</b></div>
  </div>
</div>

<div v-click="4" class="text-center mt-6">
  宛先の一覧は、<b>署名で検証したメンバー表</b>からしか作らない
</div>

</EnbuStage>

<style>
.file {
  width: 15rem;
  border: 2px solid #1f2937;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
}
.file-head {
  padding: 0.3rem 0.7rem;
  font-size: 0.75rem;
  color: #fff;
  background: #1f2937;
}
.stanza {
  padding: 0.3rem 0.8rem;
  border-bottom: 1px dashed #d1d5db;
  font-size: 0.9rem;
  transition: all 0.4s;
}
.stanza.added { background: #f0fdf4; }
.stanza.removed { text-decoration: line-through; color: #9ca3af; background: #f3f4f6; }
.new {
  margin-left: 0.3rem;
  padding: 0 0.3rem;
  font-size: 0.65rem;
  color: #fff;
  background: #16a34a;
  border-radius: 4px;
}
.file-body {
  padding: 0.7rem 0.8rem;
  font-weight: bold;
  background: #fef3c7;
}
.note {
  padding: 0.45rem 0.8rem;
  border-left: 5px solid #dd2e44;
  background: #fff1f2;
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.4;
}
</style>

<!--
ここから仕組みです。暗号化には age を使っています
[click:1] 本文は 1 つだけで、ヘッダーにメンバーの人数分の宛先が付きます。それぞれ自分の鍵で開けられる
[click:2] メンバーを追加するときは、宛先を足して暗号化し直します
[click:3] 削除するときは宛先を外して暗号化し直します。ただし、すでに読まれた値は取り消せないので、値自体のローテーションは必要です
[click:4] 大事なのは、この宛先の一覧をどこから作るか。次のスライドの、署名されたメンバー表からだけ作ります
-->

---
title: 仕組み② メンバー表は署名の鎖
est: 1:00
---

<EnbuStage :zoom="1.2">

<div class="flex items-center gap-2 mt-6">
  <div class="toml">
    <div class="text-xs op-70">enbu.toml(Git で共有)</div>
    <div class="font-mono text-sm">control_genesis =<br>"sha256:9f3a…"</div>
  </div>
  <EnbuArrow color="#16a34a" size="2.5rem" />
  <div class="ctl">
    <div class="ctl-id">c-9f3a</div>
    <div>👑 Alice</div>
  </div>
  <EnbuArrow v-click="1" label="Alice が署名" color="#16a34a" size="4.5rem" />
  <div v-click="1" class="ctl">
    <div class="ctl-id">c-41b7</div>
    <div>👑 Alice</div>
    <div>🧑 Bob</div>
  </div>
  <EnbuArrow v-click="2" label="Alice が署名" color="#16a34a" size="4.5rem" />
  <div v-click="2" class="ctl">
    <div class="ctl-id">c-d20e</div>
    <div>👑 Alice</div>
    <div>🧑 Bob</div>
    <div>🧑 Carol</div>
  </div>
</div>

<div v-click="3" class="attack">
  <div class="ctl evil">
    <div class="ctl-id">c-6666</div>
    <div>😈 Mallory</div>
  </div>
  <div class="flex flex-col">
    <div class="text-sm">ストレージに書ける Mallory が「自分もメンバー」と置く</div>
    <div v-click="4" class="reject">✗ admin の署名がない → 無視</div>
  </div>
</div>

<div v-click="5" class="text-center mt-5 text-lg font-bold">
  ストレージに書ける ≠ メンバー
</div>

</EnbuStage>

<style>
.toml {
  padding: 0.5rem 0.7rem;
  border: 2px solid #16a34a;
  border-radius: 8px;
  background: #f0fdf4;
}
.ctl {
  min-width: 6.5rem;
  padding: 0.4rem 0.7rem;
  border: 2px solid #1f2937;
  border-radius: 8px;
  background: #fff;
  font-size: 0.9rem;
  line-height: 1.5;
}
.ctl-id {
  font-family: var(--slidev-code-font-family, monospace);
  font-size: 0.7rem;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 0.15rem;
}
.attack {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.6rem 0 0 14rem;
}
.evil {
  border-color: #dc2626;
  border-style: dashed;
  background: #fef2f2;
}
.reject {
  margin-top: 0.3rem;
  font-weight: bold;
  color: #dc2626;
  font-size: 1.1rem;
}
</style>

<!--
メンバー表は Control と呼んでいて、署名の鎖になっています。出発点は Git で共有する enbu.toml の genesis です
[click:1] メンバーを足すときは、admin が前の Control を親にして、新しい Control に署名します
[click:2] こうして鎖がのびていきます。どのデバイスも genesis からたどって検証します
[click:3] ここで、ストレージに書き込めるだけの Mallory が、自分をメンバーにした Control を置いたとします
[click:4] admin の署名がないので、検証で弾かれて無視されます
[click:5] つまり、ストレージに書けることと、メンバーであることは別物です
-->

---
title: 仕組み③ 上書きしない
est: 1:00
---

<EnbuStage :zoom="1.08">

<div class="relative h-80 mt-2">
  <svg class="absolute inset-0 w-full h-full" viewBox="0 0 860 320">
    <defs>
      <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#6b7280" />
      </marker>
    </defs>
    <path v-click="1" d="M150,160 C220,160 230,70 300,70" stroke="#6b7280" stroke-width="3" fill="none" marker-end="url(#ah)" />
    <path v-click="1" d="M150,160 C220,160 230,250 300,250" stroke="#6b7280" stroke-width="3" fill="none" marker-end="url(#ah)" />
    <path v-click="2" d="M470,70 C540,70 550,160 620,160" stroke="#6b7280" stroke-width="3" fill="none" marker-end="url(#ah)" />
    <path v-click="2" d="M470,250 C540,250 550,160 620,160" stroke="#6b7280" stroke-width="3" fill="none" marker-end="url(#ah)" />
  </svg>

  <div class="rev" style="left: 0; top: 120px;">
    <div class="rev-id">s-1</div>
    <div>A=1</div><div>B=1</div>
  </div>
  <div v-click="1" class="rev alice" style="left: 300px; top: 30px;">
    <div class="rev-id">🧑 Alice</div>
    <div><b>A=2</b></div><div>B=1</div>
  </div>
  <div v-click="1" class="rev bob" style="left: 300px; top: 210px;">
    <div class="rev-id">🧑 Bob</div>
    <div>A=1</div><div><b>B=2</b></div>
  </div>
  <div v-click="1" class="same-time">同時に保存 → 横に並ぶ</div>

  <div v-click="2" class="rev merged" style="left: 620px; top: 120px;">
    <div class="rev-id">3-way マージ</div>
    <div><b>A=2</b></div><div><b>B=2</b></div>
  </div>

  <div v-click="3" class="conflict">
    同じキーを違う値にしたら ⚠️ 止めて <code>enbu resolve</code>
  </div>
</div>

</EnbuStage>

<style>
.rev {
  position: absolute;
  width: 170px;
  padding: 0.4rem 0.8rem;
  border: 2px solid #1f2937;
  border-radius: 10px;
  background: #fff;
  font-family: var(--slidev-code-font-family, monospace);
  font-size: 1.15rem;
  line-height: 1.45;
}
.rev-id {
  font-family: inherit;
  font-size: 0.75rem;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 0.15rem;
}
.alice { border-color: #dd2e44; }
.bob { border-color: #2563eb; }
.merged { border-color: #16a34a; background: #f0fdf4; }
.same-time {
  position: absolute;
  left: 270px;
  top: 135px;
  width: 230px;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
}
.conflict {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.5rem;
  text-align: center;
  font-size: 1.15rem;
}
</style>

<!--
3 つ目は、上書きしないことです。OCI のレジストリには、条件付きで上書きする仕組みがありません
[click:1] なので、更新は毎回、新しいリビジョンとして横に置きます。Alice と Bob が同時に保存しても、どちらも消えません
[click:2] 次に読む人が、Git みたいに 3-way マージします。違うキーなら両方とも残ります
[click:3] 同じキーを違う値にしていたら、勝手に決めずに止めて、enbu resolve で人に選んでもらいます
-->

---
title: メンバーの追加
est: 0:50
---

<EnbuStage :zoom="1.2">

<div class="lanes">
  <div class="lane-name">🧑 新メンバー</div>
  <div class="lane">
    <div class="step"><code>enbu init</code></div>
    <EnbuArrow v-click="1" label="参加リクエスト" color="#6b7280" size="5rem" />
    <div v-click="1" class="step dim">🗄️ r-… を置く<br><span class="text-xs">権限はゼロ</span></div>
    <div class="flex-1" />
    <div v-click="4" class="step good"><code>enbu pull</code> ✓</div>
  </div>

  <div class="lane-name">🗣️ 別の経路</div>
  <div class="lane">
    <div v-click="2" class="fp">a1b2-c3d4-e5f6-0718-293a</div>
    <div v-click="2" class="text-sm op-80 ml-3">指紋を対面やチャットで伝える</div>
  </div>

  <div class="lane-name">👑 admin</div>
  <div class="lane">
    <div class="flex-1" />
    <div v-click="3" class="step"><code>enbu member approve</code><br><span class="text-xs">指紋が一致するか確かめる</span></div>
    <EnbuArrow v-click="3" color="#16a34a" size="3rem" />
    <div v-click="3" class="step good">Control に追加<br>全環境を暗号化し直す</div>
  </div>
</div>

</EnbuStage>

<style>
.lanes {
  display: grid;
  grid-template-columns: 7rem 1fr;
  row-gap: 0.9rem;
  margin-top: 1rem;
}
.lane-name {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 0.9rem;
}
.lane {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-height: 5.5rem;
  padding: 0 0.8rem;
  border-radius: 10px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
}
.step {
  padding: 0.4rem 0.8rem;
  border: 2px solid #1f2937;
  border-radius: 8px;
  background: #fff;
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.35;
}
.step.dim { border-style: dashed; color: #6b7280; }
.step.good { border-color: #16a34a; background: #f0fdf4; }
.fp {
  padding: 0.3rem 0.8rem;
  font-family: var(--slidev-code-font-family, monospace);
  font-weight: bold;
  border-radius: 6px;
  background: #fef3c7;
  border: 2px solid #f59e0b;
}
</style>

<!--
メンバーの追加はこんな流れです
[click:1] 新しいメンバーが enbu init すると、ストレージに参加リクエストが置かれます。これ自体には何の権限もありません
[click:2] 画面に出る指紋を、対面やチャットなど、ストレージとは別の経路で admin に伝えます
[click:3] admin は一覧からリクエストを選んで、指紋が一致するか確かめて承認します。すると全部の環境が新メンバー宛てに暗号化し直されます
[click:4] 新メンバーはすぐ enbu pull できます
-->

---
title: 鍵はデバイスから出ない
est: 0:40
---

<EnbuStage :zoom="1.35">

<div class="flex items-center justify-center gap-10 mt-6">
  <div class="device">
    <div class="text-sm font-bold mb-2">💻 デバイス</div>
    <div class="chip">
      <div class="text-xs op-80">TPM 2.0 / Secure Enclave</div>
      <div class="flex gap-3 justify-center mt-2">
        <div class="key">🔑<div class="text-xs">暗号化鍵</div></div>
        <div v-click="1" class="key">✍️<div class="text-xs">署名鍵</div></div>
      </div>
    </div>
    <div v-click="2" class="nope">✗ 取り出す API なし</div>
  </div>

  <table class="os">
    <thead><tr><th>OS</th><th>ハードウェア</th><th>ない場合</th></tr></thead>
    <tbody>
      <tr><td>Linux</td><td>TPM 2.0</td><td>Secret Service</td></tr>
      <tr><td>Windows</td><td>TPM 2.0</td><td>資格情報マネージャー</td></tr>
      <tr><td>macOS</td><td>Secure Enclave</td><td>キーチェーン</td></tr>
    </tbody>
  </table>
</div>

<div v-click="3" class="text-center mt-8">
  ノート PC を丸ごとコピーされても、<b>鍵はついていかない</b>
</div>

</EnbuStage>

<style>
.device {
  position: relative;
  padding: 1rem 1.2rem 1.4rem;
  border: 3px solid #1f2937;
  border-radius: 14px;
  background: #fff;
  text-align: center;
}
.chip {
  padding: 0.8rem 1rem;
  border-radius: 10px;
  color: #fff;
  background: repeating-linear-gradient(45deg, #1f2937 0 10px, #273244 10px 20px);
  box-shadow: 0 0 0 4px #dd2e44;
}
.key {
  font-size: 1.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  background: rgba(255,255,255,.12);
}
.nope {
  position: absolute;
  right: -2.5rem;
  bottom: -1rem;
  padding: 0.15rem 0.7rem;
  font-weight: bold;
  color: #fff;
  background: #dc2626;
  border-radius: 999px;
  transform: rotate(-5deg);
}
.os { font-size: 0.9rem; }
.os th, .os td { padding: 0.35rem 0.7rem; border-bottom: 1px solid #e5e7eb; text-align: left; }
.os th { border-bottom: 2px solid #9ca3af; }
</style>

<!--
秘密鍵は、できるだけハードウェアに置きます。Linux と Windows は TPM、Mac は Secure Enclave です
[click:1] 暗号化の鍵とは別に、署名用の鍵も持っています。署名鍵もストレージには書きません
[click:2] ハードウェアの鍵には、取り出す API がそもそもありません
[click:3] なので、ディスクを丸ごとコピーされても鍵はついていきません。TPM がない環境では OS のキーチェーンなどに入れます
-->

---
title: 使い方
est: 0:40
---

<EnbuStage :zoom="1.25">

<div class="term">
  <div class="term-bar"><span /><span /><span /></div>
  <div class="term-body">
    <div><span class="ps">$</span> enbu init --storage oci://ghcr.io/your-org/app-enbu</div>
    <div class="out">✓ Initialized</div>
    <div v-click="1"><span class="ps">$</span> enbu add API_KEY <span class="cm"># 値は隠れたプロンプトで入力</span></div>
    <div v-click="1" class="out">✓ Secret added</div>
    <div v-click="2"><span class="ps">$</span> enbu pull</div>
    <div v-click="2" class="out">✓ wrote .env</div>
    <div v-click="3"><span class="ps">$</span> enbu run -- npm start <span class="cm"># ファイルに書かずに渡す</span></div>
    <div v-click="4"><span class="ps">$</span> enbu switch -c prod <span class="cm"># 環境を切り替える</span></div>
  </div>
</div>

<div v-click="5" class="text-center mt-4">
  ふだんは <code>enbu add</code> と <code>enbu pull</code> だけ。TUI とデスクトップアプリもある
</div>

</EnbuStage>

<style>
.term {
  border-radius: 10px;
  overflow: hidden;
  background: #111827;
  box-shadow: 0 6px 18px rgba(0,0,0,.2);
}
.term-bar {
  display: flex;
  gap: 6px;
  padding: 0.5rem 0.8rem;
  background: #1f2937;
}
.term-bar span {
  width: 11px; height: 11px; border-radius: 50%;
  background: #ef4444;
}
.term-bar span:nth-child(2) { background: #f59e0b; }
.term-bar span:nth-child(3) { background: #22c55e; }
.term-body {
  padding: 0.8rem 1.2rem;
  font-family: var(--slidev-code-font-family, monospace);
  font-size: 0.95rem;
  line-height: 1.7;
  color: #e5e7eb;
}
.ps { color: #22c55e; margin-right: 0.4rem; }
.out { color: #9ca3af; }
.cm { color: #6b7280; }
</style>

<!--
使い方です。最初に enbu init でストレージを指定します
[click:1] 秘密の値は enbu add。値はコマンドラインに残らないよう、隠れたプロンプトで入れられます
[click:2] 取ってくるのは enbu pull。.env に書き出します
[click:3] ディスクに書きたくなければ、enbu run で環境変数として渡せます
[click:4] dev や prod のような環境も切り替えられます
[click:5] ふだん使うのは add と pull だけです
-->

---
title: これから
est: 0:30
---

<EnbuStage :zoom="1.3">

<div class="flex items-center justify-center gap-6">
  <div class="plan">
    <div class="text-4xl">💃</div>
    <div class="text-xl font-bold mt-1">enbu(OSS)</div>
    <div class="text-sm op-80 mt-1">チームですぐ使える</div>
  </div>
  <EnbuArrow v-click="1" color="#dd2e44" size="5rem" />
  <div v-click="1" class="plan cloud">
    <div class="text-4xl">☁️</div>
    <div class="text-xl font-bold mt-1">enbu cloud(構想)</div>
    <div class="grid grid-cols-2 gap-2 mt-3">
      <div class="pill">SSO</div>
      <div class="pill">SCIM</div>
      <div class="pill">監査ログ</div>
      <div class="pill">管理コンソール</div>
    </div>
  </div>
</div>

<div v-click="2" class="text-center mt-8 text-lg">組織の規模が大きくなっても、同じ仕組みのまま</div>

</EnbuStage>

<style>
.plan {
  padding: 1rem 1.4rem;
  text-align: center;
  border: 2px solid #e5e7eb;
  border-radius: 14px;
  background: #fff;
}
.plan.cloud { border: 2px dashed #6b7280; background: #f9fafb; }
.pill {
  padding: 0.3rem 0.8rem;
  text-align: center;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #d1d5db;
  font-size: 0.9rem;
}
</style>

<!--
これからの話です。enbu は OSS として、チームですぐに使えます
[click:1] それに加えて、組織向けに SSO や SCIM、監査ログ、管理コンソールを備えた enbu cloud を構想しています
[click:2] 組織が大きくなっても、同じ仕組みのまま使い続けられるようにしたいと考えています
-->

---
title: まとめ
est: 0:30
---

<div class="h-full flex items-center justify-center gap-10" style="zoom: 1.3">
  <img src="./images/enbu.png" class="w-36" alt="">
  <div class="flex flex-col gap-3 text-xl">
    <div v-click="1">🛡️ チームの機密情報を、仕組みで安全に共有</div>
    <div v-click="2">🔐 1 人 1 鍵。共有パスワードなし</div>
    <div v-click="3">✍️ ストレージは信用せず、署名で検証</div>
    <div v-click="4" class="mt-4 text-base font-mono op-70">github.com/enbu-net/enbu</div>
  </div>
</div>

<!--
まとめです
[click:1] enbu は、チームの機密情報を、人の注意ではなく仕組みで安全に共有するためのツールです
[click:2] 1 人 1 鍵なので、共有パスワードがいりません
[click:3] そのストレージは信用せず、署名で検証します
[click:4] ぜひ使ってみてください。ありがとうございました
-->
