---
theme: seriph
title: enbu 10 分発表(SecHack365)
genre: Any%
colorSchema: light
defaults:
  layout: biim
fonts:
  mono: JetBrains Mono
est: 0:10
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
はい、enbu という、チームで機密情報を共有するためのツールを作っているので、その話をします
-->

---
title: シークレットってなに?
est: 0:20
---

<EnbuStage :zoom="1.2">

<div class="lead">シークレット = <span class="hl" :class="{ on: $clicks >= 1 }">知っていれば誰でも使える</span>鍵</div>

<div class="flex items-center justify-center gap-6">
  <div class="env">
    <div class="text-xs op-70 mb-1">📄 .env</div>
    <div class="font-mono">API_KEY=sk-9x…</div>
    <div class="font-mono">DB_PASSWORD=hunter2</div>
  </div>
  <EnbuArrow v-click="1" label="コピーすれば" color="#dc2626" size="5rem" />
  <div v-click="1" class="flex flex-col items-center gap-1">
    <div class="big-emoji">😈</div>
    <div class="text-sm">他人でも</div>
  </div>
  <EnbuArrow v-click="1" color="#dc2626" size="3rem" />
  <div v-click="1" class="flex gap-3">
    <EnbuBox icon="💳" title="API を使い放題" tone="bad" class="w-32" />
    <EnbuBox icon="🗄️" title="DB を丸ごと" tone="bad" class="w-32" />
  </div>
</div>

</EnbuStage>

<style>
.env {
  padding: 0.8rem 1rem;
  border: 2px solid #1f2937;
  border-radius: 10px;
  background: #fef3c7;
  line-height: 1.7;
}
</style>

<!--
まずシークレットの話です。API キーやパスワードのことで、開発ではよく .env というファイルにまとめて置きます
[click:1] これは鍵と同じで、持っていれば誰でも使えてしまいます。コピーされたら、他人が API を使い放題、データベースも丸ごと見られます
-->

---
title: でも見せないと開発できない
est: 0:20
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
なので、本来は誰にも見せてはいけません
[click:1] でもチームで開発するには、仲間にはこの鍵を渡さないと動かせません。輪の内側の人にだけ見せて、外の人には見せたくない
-->

---
title: そもそも矛盾している
est: 0:15
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
つまり、見せてはいけないものを、限られた人にだけ見せたい。そもそも矛盾した話なんですね。だから今は、みんなどこかで無理をしています。よくある方法を 3 つ見ます
-->

---
title: チャットで送る
est: 0:20
---

<EnbuStage :zoom="1.3">

<div class="lead">チャットに貼ると、<span class="hl" :class="{ on: $clicks >= 1 }">ずっと残る</span></div>

<div class="flex items-center justify-center gap-6">
  <div class="chat">
    <div class="chat-head"># dev-team</div>
    <div class="msg"><b>Alice</b><code>API_KEY=sk-9x...</code></div>
    <div class="msg"><b>Bob</b>ありがとう!</div>
  </div>
  <div v-click="1" class="flex flex-col items-center gap-2">
    <div class="text-sm op-70">1 年後も</div>
    <div class="flex gap-2 text-3xl"><span>👀</span><span>👀</span><span>👀</span></div>
    <div class="text-sm op-70">誰が見たか分からない</div>
  </div>
</div>

</EnbuStage>

<style>
.chat {
  width: 18rem;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}
.chat-head { padding: 0.4rem 1rem; font-weight: bold; background: #4a154b; color: #fff; }
.msg {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: 0.55rem 1rem;
  border-top: 1px solid #f3f4f6;
  font-size: 0.95rem;
}
.msg b { font-size: 0.8rem; }
</style>

<!--
一番多いのは、Discord や Slack に貼る方法です。楽ですね
[click:1] でもメッセージはずっと残ります。1 年後に入った人も読めますし、誰が見たのかも分かりません
-->

---
title: Git にコミットしちゃう
est: 0:20
---

<EnbuStage :zoom="1.3">

<div class="lead">Git は、<span class="hl" :class="{ on: $clicks >= 1 }">消しても覚えている</span></div>

<div class="flex items-center justify-center gap-1">
  <div class="commit"><div class="cid">a1f3</div><div>📄 .env を追加</div></div>
  <div class="link" />
  <div class="commit" :class="{ del: $clicks >= 1 }"><div class="cid">7c2e</div><div>🗑️ .env を削除</div></div>
  <div class="link" />
  <div class="commit"><div class="cid">e94b</div><div>…</div></div>
</div>

<div v-click="1" class="flex justify-center mt-6">
  <div class="dig">🔍 <code>git log</code> で a1f3 を見れば、まだ読める</div>
</div>

</EnbuStage>

<style>
.commit {
  padding: 0.4rem 0.8rem;
  border: 2px solid #1f2937;
  border-radius: 8px;
  background: #fff;
  text-align: center;
}
.commit.del { border-style: dashed; color: #6b7280; }
.cid { font-family: var(--slidev-code-font-family, monospace); font-size: 0.7rem; color: #6b7280; }
.link { width: 1.6rem; height: 3px; background: #1f2937; }
.dig {
  padding: 0.4rem 1rem;
  font-weight: bold;
  border-radius: 8px;
  background: #fee2e2;
  border: 2px solid #dc2626;
  color: #991b1b;
}
</style>

<!--
次に、うっかり Git にコミットしちゃうパターン
[click:1] 慌てて消しても、Git は履歴を全部覚えているので、昔のコミットを見れば読めます。公開リポジトリなら、キーを探して回るボットに数分で拾われることもあります
-->

---
title: 専用サービス
est: 0:20
---

<EnbuStage :zoom="1.25">

<div class="lead">専用サービスは安全。<br><span v-click="1">でも、<span class="hl" :class="{ on: $clicks >= 1 }">お金とアカウント</span>が増える</span></div>

<div class="flex items-center justify-center gap-4">
  <div class="flex flex-col gap-2">
    <div class="member">🧑‍💻 <span v-click="1">👤 💳</span></div>
    <div class="member">👩‍💻 <span v-click="1">👤 💳</span></div>
    <div class="member">🤝 <span v-click="1" class="op-50">👤? 社外</span></div>
  </div>
  <EnbuArrow label="ログイン" flow size="4rem" />
  <EnbuBox icon="☁️" title="専用サービス" sub="1Password / Secrets Manager など" class="w-52" />
</div>

</EnbuStage>

<style>
.member {
  padding: 0.25rem 0.7rem;
  font-size: 1.3rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
}
</style>

<!--
1Password や AWS の Secrets Manager のような専用サービスもあります。安全で機能もそろっています
[click:1] ただ、人数分のアカウントとお金が必要です。学生チームや個人には重いし、業務委託のような社外の人に渡すのも面倒です。結局どの方法でも、誰かが取り残されます
-->

---
title: enbu のやり方
est: 0:25
---

<EnbuStage :zoom="1.15">

<div class="lead">今ある置き場所に、<span class="hl" :class="{ on: $clicks >= 1 }">鍵をかけた中身だけ</span>を置く</div>

<div class="flex items-center justify-center gap-4">
  <div class="flex flex-col gap-2">
    <EnbuBox icon="🧑‍💻" title="Alice" sub="🔑 Alice の鍵" class="w-32 py-1" />
    <EnbuBox icon="👩‍💻" title="Bob" sub="🔑 Bob の鍵" class="w-32 py-1" />
  </div>
  <EnbuArrow v-click="1" label="🔒 暗号文" flow color="#dd2e44" size="6rem" />
  <div v-click="1" class="store">
    <div class="text-sm font-bold mb-2">☁️ 今ある置き場所</div>
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
enbu はどうするか。1 人 1 つずつ鍵を持っていて
[click:1] その全員の鍵で開けられるように鍵をかけた中身だけを、もう持っている GitHub や S3 に置きます
[click:2] なので、追加のお金も、新しいアカウントもいりません
-->

---
title: enbu がしないこと
est: 0:20
---

<EnbuStage :zoom="1.2">

<div class="lead">一度見た値は、<span class="hl" :class="{ on: $clicks >= 1 }">頭から消せない</span><span class="sub">できないことは、できないと決めている</span></div>

<div class="flex items-center justify-center gap-5">
  <EnbuBox icon="👋" title="Bob を外す" class="w-32" />
  <EnbuArrow size="3rem" />
  <EnbuBox icon="🔒" title="新しい値" sub="もう読めない" tone="good" class="w-32" />
  <div v-click="1" class="flex items-center gap-5">
    <EnbuBox icon="🧠" title="前に見た値" sub="覚えている" tone="bad" class="w-32" />
    <EnbuArrow color="#dd2e44" size="3rem" />
    <EnbuBox icon="🔄" title="値を変える" tone="accent" class="w-32" />
  </div>
</div>

</EnbuStage>

<!--
逆に、enbu がしないことも決めています。Bob を外すと、新しい値はもう読めません
[click:1] でも、Bob が前に見た値は頭に残っています。これはどんな仕組みでも消せないので、外したら値そのものを変えてください。ほかにも、CI やボットに勝手に読ませる機能や、Git の操作は、あえて入れていません
-->

---
title: だれに嬉しい?
est: 0:30
---

<EnbuStage :zoom="1.3">

<div class="lead">お金もアカウントも増やさず、<br><span class="hl" :class="{ on: $clicks >= 3 }">誰にでも渡せる</span></div>

<div class="grid grid-cols-3 gap-5">
  <div v-click="1" class="card">
    <div class="big-emoji">🧑‍💻</div>
    <div class="font-bold mt-1">個人開発者</div>
    <div class="text-sm op-80">PC が壊れても戻せる</div>
  </div>
  <div v-click="2" class="card">
    <div class="big-emoji">🎓</div>
    <div class="font-bold mt-1">学生チーム</div>
    <div class="text-sm op-80">無料。Discord に貼らない</div>
  </div>
  <div v-click="3" class="card">
    <div class="big-emoji">🏢</div>
    <div class="font-bold mt-1">企業</div>
    <div class="text-sm op-80">社外の人にも。終わったら外す</div>
  </div>
</div>

</EnbuStage>

<!--
誰に嬉しいか
[click:1] 個人開発者なら、PC が壊れても戻せます
[click:2] 学生チームなら、無料で、Discord にキーを貼らなくてよくなります
[click:3] 企業なら、業務委託のような社外の人にも渡せて、終わったら外すだけ。誰にでも渡せる、というのが一番の嬉しさです
-->

---
title: デモ
est: 2:00
---

<EnbuStage :zoom="1.2">

<div class="lead">見てみましょう 🎬<span class="sub">1 台の PC で、デバイスも GitHub アカウントも別の 2 人</span></div>

<div class="flex items-center justify-center gap-3">
  <EnbuBox icon="🧑‍💻" title="Alice" sub="管理者" tone="accent" class="w-28" />
  <div class="flow">
    <div>① 値を入れる</div>
    <div>② 指紋を口頭で確認</div>
    <div>③ 承認 → Bob に .env</div>
    <div>④ 値を変える → 同期だけ</div>
  </div>
  <EnbuBox icon="👩‍💻" title="Bob" sub="新メンバー" class="w-28" />
</div>

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
  font-size: 0.95rem;
}
</style>

<!--
では実際に見てもらいます。Alice と Bob の 2 人で、それぞれ別の GitHub アカウントです
まず Alice がワークスペースを作って、API キーを入れます。チャットに貼る代わりに、ここに入れるだけです
次に Bob が参加します。この時点では Bob はまだ何も読めません。画面に出る指紋を、通話や対面で Alice に読み上げてもらいます
Alice は指紋が同じか確かめて承認します。すると Bob の手元に .env ができました
最後に Alice がキーを変えます。Bob は連絡をもらわなくても、同期するだけで新しい値になります
-->

---
title: 鍵は PC から出ない
est: 0:20
---

<EnbuStage :zoom="1.3">

<div class="lead">鍵は 1 人 1 つ。<span class="hl" :class="{ on: $clicks >= 1 }">PC から出ない</span></div>

<div class="flex items-center justify-center gap-8">
  <div class="device">
    <div class="text-sm font-bold mb-2">💻 PC</div>
    <div class="chip">
      <div class="text-xs">セキュリティチップ</div>
      <div class="text-3xl mt-1">🔑</div>
    </div>
  </div>
  <div v-click="1" class="flex items-center gap-3">
    <EnbuArrow label="ディスクを丸ごとコピー" color="#dc2626" size="7rem" />
    <div class="copy">
      <div class="text-sm font-bold mb-2">😈 コピー</div>
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
ここからデモの裏側です。鍵は 1 人 1 つずつで、PC のセキュリティチップの中にあります
[click:1] チップから鍵を取り出す方法はないので、ディスクを丸ごとコピーされても、鍵はついていきません
-->

---
title: メンバー表にはハンコ
est: 0:20
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
誰がメンバーかという表は、管理者のハンコ、つまり電子署名つきで鎖のようにつながっています
[click:1] Bob を入れるときは、Alice がハンコを押した新しい表を作ります。さっきのデモの承認がこれです
[click:2] こうして表がつながっていきます。暗号化の宛先は、この表からしか作りません
-->

---
title: 置き場所は信用しない
est: 0:15
---

<EnbuStage :zoom="1.25">

<div class="lead">置き場所は、<span class="hl" :class="{ on: $clicks >= 1 }">信用しない</span><span class="sub">見えるのは暗号文とハンコだけ</span></div>

<div class="flex items-stretch justify-center gap-4">
  <div class="zone trust">
    <div class="zone-label">🏠 自分の PC</div>
    <div class="text-center text-3xl mt-2">🔑 🔓</div>
    <div class="text-center text-sm mt-1">開けるのはここだけ</div>
  </div>
  <div class="flex items-center">
    <EnbuArrow label="🔒 + ㊞" flow color="#dd2e44" size="6rem" />
  </div>
  <div v-click="1" class="zone untrust">
    <div class="zone-label">☁️ 置き場所</div>
    <div class="text-center text-3xl mt-2">🔒 🔒 🔒</div>
    <div class="text-center text-sm mt-1">中身は読めない</div>
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
.zone-label { position: absolute; top: 0.5rem; left: 1rem; font-weight: bold; font-size: 0.95rem; }
</style>

<!--
置き場所に送るのは、暗号文とハンコだけです。開けられるのは自分の PC の中だけ
[click:1] 置き場所そのものは信用しない、という前提で作っています。GitHub や S3 の中の人にも、中身は読めません
-->

---
title: 偽物は無視
est: 0:15
---

<EnbuStage :zoom="1.3">

<div class="lead">偽物を置かれても、<span class="hl" :class="{ on: $clicks >= 1 }">ハンコがないので無視</span></div>

<div class="flex items-center justify-center gap-6">
  <div class="ctl"><div>👑 Alice</div><div>👩‍💻 Bob</div><div class="stamp">㊞</div></div>
  <div class="ctl evil" :class="{ out: $clicks >= 1 }"><div>😈 Mallory</div><div class="text-xs op-70">「私もメンバー」</div></div>
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
  line-height: 1.6;
  transition: opacity 0.4s;
}
.stamp { position: absolute; right: -0.6rem; bottom: -0.7rem; font-size: 1.6rem; color: #dc2626; transform: rotate(-12deg); }
.evil { border-color: #dc2626; border-style: dashed; background: #fef2f2; }
.evil.out { opacity: 0.35; text-decoration: line-through; }
</style>

<!--
SecHack なので、攻撃する側の目線でも見てみます。置き場所に書き込める Mallory が、自分をメンバーにした表を置いたとします
[click:1] 管理者のハンコがないので、無視されます。置き場所に書けることと、メンバーであることは別物です
-->

---
title: 巻き戻しに気づく
est: 0:15
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
.pin { position: absolute; top: -1.6rem; left: 50%; transform: translateX(-50%); font-size: 0.8rem; white-space: nowrap; font-weight: normal; }
.link { width: 1.6rem; height: 3px; background: #1f2937; }
</style>

<!--
次に、置き場所の中身を古い版に巻き戻して、前の値を使わせようとする攻撃
[click:1] 手元に、どこまで見たかの記録があるので、それより古ければ止まります
-->

---
title: 同時に書いても消えない
est: 0:15
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
  width: 170px;
  padding: 0.5rem 0.8rem;
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
攻撃ではないですが、よくある事故です
[click:1] Alice と Bob が同時に書いても、上書きせず両方を残します
[click:2] そして Git のように自動で合わせます。同じところを別の値にしていたら、勝手に決めずに人に選んでもらいます
-->

---
title: DST とは
est: 0:25
---

<EnbuStage :zoom="1.2">

<div class="lead">DST = <span class="hl" :class="{ on: $clicks >= 1 }">仮想の世界で何千回もリハーサル</span></div>

<div class="flex justify-center">
  <div class="world">
    <div class="text-sm font-bold mb-2">🌐 仮想の世界</div>
    <div class="flex gap-2 justify-center">
      <div class="real">🧩 enbu 本体</div>
      <div class="real">🔒 暗号</div>
    </div>
    <div v-click="1" class="flex gap-2 justify-center mt-2">
      <div class="fake">☁️ 置き場所</div>
      <div class="fake">⏰ 時計</div>
      <div class="fake">💻 PC</div>
    </div>
    <div class="flex gap-4 justify-center mt-3 text-sm">
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
.real, .fake { padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 1rem; }
.real { border: 2px solid #16a34a; background: #f0fdf4; }
.fake { border: 2px dashed #d97706; background: #fffbeb; }
.real-k { color: #16a34a; font-weight: bold; }
.fake-k { color: #d97706; font-weight: bold; }
</style>

<!--
ここからは作るときに工夫したところです。セキュリティのツールは、変なタイミングで壊れるのが一番怖い。そこで DST というテストをしています
[click:1] enbu 本体と暗号は本物のまま、置き場所と時計と PC だけを作り物にした仮想の世界で、チームを何千回も動かすリハーサルです
-->

---
title: 失敗を再現できる
est: 0:20
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
誰がいつ操作するか、どこで通信が落ちるかは、サイコロで決めます
[click:1] 失敗したら、同じサイコロの目でもう一度動かせば、まったく同じ失敗が起きます。たまにしか起きないバグも追いかけられます
[click:2] これを毎晩 1,024 通り、5 つの OS で回しています
-->

---
title: 形式検証
est: 0:25
---

<EnbuStage :zoom="1.2">

<div class="lead">形式検証 = <span class="hl" :class="{ on: $clicks >= 1 }">ありうる動きを全部、機械が調べる</span></div>

<div class="flex items-center justify-center gap-10">
  <div class="text-center">
    <div class="text-sm font-bold mb-2">🧪 テスト</div>
    <div class="tree">
      <span class="dot on" /><span class="dot" /><span class="dot on" /><span class="dot" /><span class="dot" /><span class="dot on" /><span class="dot" /><span class="dot" />
    </div>
    <div class="text-xs op-70 mt-1">選んだ例だけ</div>
  </div>
  <div v-click="1" class="text-center">
    <div class="text-sm font-bold mb-2">🤖 形式検証(TLA+)</div>
    <div class="tree">
      <span class="dot on" /><span class="dot on" /><span class="dot on" /><span class="dot on" /><span class="dot on" /><span class="dot on" /><span class="dot on" /><span class="dot on" />
    </div>
    <div class="text-xs op-70 mt-1">決めた範囲を全部</div>
  </div>
</div>

</EnbuStage>

<style>
.tree {
  display: grid;
  grid-template-columns: repeat(4, 1.6rem);
  gap: 0.5rem;
  padding: 0.8rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
}
.dot { width: 1.6rem; height: 1.6rem; border-radius: 50%; background: #e5e7eb; }
.dot.on { background: #dd2e44; }
</style>

<!--
もう一つが形式検証です。テストは、選んだ例しか試せません
[click:1] 形式検証では、メンバー表や同期のルールを数式のモデルにして、決めた範囲の中のありうる動きを全部、機械に調べさせます。わざと壊したモデルが、ちゃんと引っかかるかも確かめています
-->

---
title: これから
est: 0:25
---

<EnbuStage :zoom="1.25">

<div class="lead">次は、<span class="hl" :class="{ on: $clicks >= 1 }">使う時だけ有効</span>なシークレットへ</div>

<div class="flex items-center justify-center gap-3">
  <EnbuBox icon="📥" title="今の .env" sub="enbu import 1 回" class="w-36" />
  <EnbuArrow size="3rem" />
  <EnbuBox icon="💃" title="enbu" sub="いまここ" tone="accent" class="w-32" />
  <EnbuArrow v-click="1" size="3rem" />
  <div v-click="1" class="flex flex-col gap-2">
    <div class="pill">⏳ 使う時だけ有効</div>
    <div class="pill">🕵️ 怪しい動きを見つける</div>
    <div class="pill">🚨 漏えいスキャン</div>
  </div>
</div>

</EnbuStage>

<style>
.pill {
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  background: #fff;
  border: 1px dashed #6b7280;
  font-size: 0.95rem;
}
</style>

<!--
これからの話です。今 .env を使っているなら、enbu import を 1 回するだけで乗り換えられます
[click:1] 次は、使う時だけ有効になるシークレット、怪しい動きを見つける監査、漏えいのスキャンを作っていきます
-->

---
title: まとめ
est: 0:15
---

<div class="h-full flex items-center justify-center gap-10" style="zoom: 1.3">
  <img src="./images/enbu.png" class="w-36" alt="">
  <div class="flex flex-col gap-3">
    <div class="text-3xl font-bold leading-snug">見せてはいけないものを、<br>仕組みで、限られた人にだけ</div>
    <div class="mt-4 text-base font-mono op-70">github.com/enbu-net/enbu</div>
  </div>
</div>

<!--
まとめです。見せてはいけないものを、限られた人にだけ見せる。それを人の注意ではなく、仕組みで安全にするのが enbu です。ぜひ使ってみてください。以上になります。ありがとうございました。
-->
