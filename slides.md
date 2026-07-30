---
theme: default
title: enbu workflow
colorSchema: dark
transition: slide-left
clicks: 4
---

# `enbu init`

<TransferAnim
  :steps="[
    { label: 'X25519 鍵ペアを生成',
      direction: 'local', icon: 'public-key',
      leftNote: '鍵ペアを生成中…',
      leftAct: 'gen-keys' },
    { label: '秘密鍵を OS Keychain に保存',
      direction: 'local', icon: 'private-key',
      leftNote: 'Keychain に保存中…',
      leftAct: 'save-keychain' },
    { label: '公開鍵を Registry に登録',
      direction: 'left-to-right', icon: 'public-key',
      leftNote: '公開鍵を送信中', rightNote: 'recipient として保存',
      leftAct: 'send-pubkey', rightAct: 'store-pubkey' },
  ]"
  :click="$clicks"
  left-label="Alice"
  right-label="Container Registry"
/>

---
clicks: 4
---

# `enbu add`

<TransferAnim
  :steps="[
    { label: '全メンバーの公開鍵を取得',
      direction: 'right-to-left', icon: 'public-key',
      leftNote: '公開鍵を受け取り中', rightNote: 'recipient 一覧を送信',
      leftAct: 'recv-ciphertext', rightAct: 'send-pubkeys' },
    { label: '全公開鍵で age 暗号化',
      direction: 'local', icon: 'lock',
      leftNote: '暗号化中 (age multi-recipient)',
      leftAct: 'encrypt' },
    { label: '暗号文を Registry に push',
      direction: 'left-to-right', icon: 'lock',
      leftNote: '暗号文を送信中', rightNote: 'secrets-{env} に保存',
      rightAct: 'store-cipher' },
  ]"
  :click="$clicks"
  left-label="Alice"
  right-label="Container Registry"
/>

---
clicks: 4
---

# `enbu pull`

<TransferAnim
  :steps="[
    { label: '暗号文を Registry から取得',
      direction: 'right-to-left', icon: 'lock',
      leftNote: '暗号文を受け取り中', rightNote: 'secrets-{env} を送信',
      leftAct: 'recv-ciphertext', rightAct: 'send-cipher' },
    { label: '自分の秘密鍵で復号',
      direction: 'local', icon: 'private-key',
      leftNote: '秘密鍵で復号中',
      leftAct: 'decrypt' },
    { label: '.env ファイルに書き出し',
      direction: 'local', icon: 'file',
      leftNote: '.env に書き出し中',
      leftAct: 'write-file' },
  ]"
  :click="$clicks"
  left-label="Alice"
  right-label="Container Registry"
/>

---
clicks: 8
---

# `enbu sync`

<SyncAnim
  :steps="[
    { label: 'Bob が enbu init → 公開鍵を Registry に登録',
      segment: 'bob-to-reg',
      bobAct: '公開鍵を生成 → 送信中',
      regActLeft: 'recipient として保存' },
    { label: 'Alice が公開鍵 + 暗号文を取得',
      segment: 'reg-to-alice',
      aliceAct: '受け取り中',
      regActLeft: '公開鍵 + 暗号文を送信' },
    { label: 'enbu.toml のポリシーで recipient をフィルタ（GitHub API でチームを確認）',
      segment: 'alice-policy',
      aliceAct: 'ポリシー評価中…' },
    { label: 'Alice が復号 → 許可 recipient の公開鍵で再暗号化',
      segment: 'alice-local',
      aliceAct: '復号 → Alice + Bob で再暗号化' },
    { label: '更新した暗号文を Registry に push',
      segment: 'alice-to-reg',
      aliceAct: '再暗号化済み暗号文を送信',
      regActLeft: 'secrets-{env} を更新' },
    { label: 'Bob が enbu pull → 暗号文を Registry から取得',
      segment: 'reg-to-bob',
      bobAct: '暗号文を受け取り中',
      regActLeft: 'secrets-{env} を送信' },
    { label: 'Bob が自分の秘密鍵で復号',
      segment: 'bob-local',
      bobAct: '秘密鍵で復号中' },
  ]"
  :click="$clicks"
/>
