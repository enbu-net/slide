<script setup lang="ts">
export type LeftActType  = 'gen-keys' | 'save-keychain' | 'encrypt' | 'reencrypt' | 'decrypt' | 'write-file' | 'send-pubkey' | 'recv-ciphertext' | 'policy-eval'
export type RightActType = 'store-pubkey' | 'send-pubkeys' | 'store-cipher' | 'send-cipher' | 'send-cipher-right'

defineProps<{
  act: LeftActType | RightActType | string | undefined
  click: number
  keyPrefix?: string
}>()
</script>

<template>
  <div class="act-zone" :key="(keyPrefix ?? '') + click">
    <template v-if="act">

      <!-- ===== LEFT acts ===== -->

      <!-- gen-keys: pub + pri pop up -->
      <template v-if="act === 'gen-keys'">
        <div class="act-item act-pop-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
          <span class="act-tag" style="color:#f59e0b">pub</span>
        </div>
        <div class="act-item act-pop-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span class="act-tag" style="color:#f97316">pri</span>
        </div>
      </template>

      <!-- save-keychain: pri key → vault -->
      <template v-else-if="act === 'save-keychain'">
        <div class="act-item act-slide-in">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <div class="act-arrow">→</div>
        <div class="act-item act-glow-orange">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
      </template>

      <!-- encrypt: 3 pub keys → lock -->
      <template v-else-if="act === 'encrypt'">
        <div class="act-keys-group">
          <svg class="act-key-sm k1" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
          <svg class="act-key-sm k2" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
          <svg class="act-key-sm k3" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
        </div>
        <div class="act-arrow">→</div>
        <div class="act-item act-glow-indigo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><line x1="12" y1="15" x2="12" y2="17"/></svg>
        </div>
      </template>

      <!-- reencrypt: lock ↻ lock -->
      <template v-else-if="act === 'reencrypt'">
        <div class="act-item act-fade-cycle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><line x1="12" y1="15" x2="12" y2="17"/></svg>
        </div>
        <div class="act-arrow act-spin-once">↻</div>
        <div class="act-item act-glow-indigo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><line x1="12" y1="15" x2="12" y2="17"/></svg>
        </div>
      </template>

      <!-- decrypt: pri + lock → unlocked -->
      <template v-else-if="act === 'decrypt'">
        <div class="act-item act-pop-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <div class="act-arrow">+</div>
        <div class="act-item act-unlock">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><line x1="12" y1="15" x2="12" y2="17"/></svg>
        </div>
        <div class="act-arrow">→</div>
        <div class="act-item act-glow-green act-pop-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 14 0"/></svg>
        </div>
      </template>

      <!-- write-file -->
      <template v-else-if="act === 'write-file'">
        <div class="act-file-wrap">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <div class="file-lines">
            <div class="file-line fl1" />
            <div class="file-line fl2" />
            <div class="file-line fl3" />
          </div>
        </div>
      </template>

      <!-- send-pubkey: pub key floating right -->
      <template v-else-if="act === 'send-pubkey'">
        <div class="act-item act-float-right">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
        </div>
      </template>

      <!-- send-cipher-local: lock floating right (from Alice to reg) -->
      <template v-else-if="act === 'send-cipher-local'">
        <div class="act-item act-float-right">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><line x1="12" y1="15" x2="12" y2="17"/></svg>
        </div>
      </template>

      <!-- recv-ciphertext: lock coming in -->
      <template v-else-if="act === 'recv-ciphertext'">
        <div class="act-item act-float-in">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><line x1="12" y1="15" x2="12" y2="17"/></svg>
        </div>
      </template>

      <!-- policy-eval: GitHub API → allow/deny list -->
      <template v-else-if="act === 'policy-eval'">
        <div class="act-item act-pop-1">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          <span class="act-tag" style="color:#94a3b8">API</span>
        </div>
        <div class="act-arrow">→</div>
        <div class="policy-results act-pop-2">
          <span class="policy-allow">Alice ✓</span>
          <span class="policy-allow">Bob ✓</span>
          <span class="policy-deny">Charlie ✗</span>
        </div>
      </template>

      <!-- ===== RIGHT acts ===== -->

      <!-- store-pubkey: pub key absorbed -->
      <template v-else-if="act === 'store-pubkey'">
        <div class="act-item act-absorb">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
          <span class="act-tag" style="color:#f59e0b">pub</span>
        </div>
      </template>

      <!-- send-pubkeys: multiple pub keys floating out -->
      <template v-else-if="act === 'send-pubkeys'">
        <div class="act-keys-group">
          <svg class="act-key-sm k1" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
          <svg class="act-key-sm k2" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
          <svg class="act-key-sm k3" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
        </div>
      </template>

      <!-- store-cipher: lock absorbed -->
      <template v-else-if="act === 'store-cipher'">
        <div class="act-item act-absorb">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><line x1="12" y1="15" x2="12" y2="17"/></svg>
        </div>
      </template>

      <!-- send-cipher: lock floating left (toward Alice) -->
      <template v-else-if="act === 'send-cipher'">
        <div class="act-item act-float-out">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><line x1="12" y1="15" x2="12" y2="17"/></svg>
        </div>
      </template>

      <!-- send-cipher-right: lock floating right (toward Bob) -->
      <template v-else-if="act === 'send-cipher-right'">
        <div class="act-item act-float-right">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><line x1="12" y1="15" x2="12" y2="17"/></svg>
        </div>
      </template>

      <!-- send-pubkey-pair: pub + cipher from reg to alice -->
      <template v-else-if="act === 'send-pubkey-cipher'">
        <div class="act-keys-group">
          <svg class="act-key-sm k1" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
          <svg class="act-key-sm k2" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><line x1="12" y1="15" x2="12" y2="17"/></svg>
        </div>
      </template>

    </template>
  </div>
</template>

<style scoped>
.act-zone {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  overflow: visible;
}

.act-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
}

.act-tag {
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.act-arrow {
  font-size: 1.5rem;
  color: rgba(148,163,184,.5);
  line-height: 1;
  align-self: center;
}

.act-keys-group {
  display: flex;
  gap: 2px;
  align-items: center;
}

.act-file-wrap {
  position: relative;
  display: flex;
  align-items: center;
  animation: pop-in 0.35s cubic-bezier(.34,1.56,.64,1) both;
}

.file-lines {
  position: absolute;
  left: 6px;
  top: 11px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.file-line {
  height: 2px;
  background: #22c55e;
  border-radius: 1px;
  width: 0;
}

.fl1 { animation: line-grow 0.4s 0.3s  ease both, line-pulse 1.2s 0.7s  ease-in-out infinite; width: 10px; }
.fl2 { animation: line-grow 0.4s 0.55s ease both, line-pulse 1.2s 0.95s ease-in-out infinite; width: 8px; }
.fl3 { animation: line-grow 0.4s 0.8s  ease both, line-pulse 1.2s 1.2s  ease-in-out infinite; width: 6px; }

.policy-results {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  line-height: 1.4;
}
.policy-allow { color: #22c55e; }
.policy-deny  { color: #f87171; }

.act-key-sm  { opacity: 0; }
.k1 { animation: key-fly 1.6s 0s    ease-in-out infinite; }
.k2 { animation: key-fly 1.6s 0.2s  ease-in-out infinite; }
.k3 { animation: key-fly 1.6s 0.4s  ease-in-out infinite; }

.act-pop-1       { animation: pop-in 0.35s cubic-bezier(.34,1.56,.64,1) both, float-y 2s 0.35s ease-in-out infinite; }
.act-pop-2       { animation: pop-in 0.35s 0.15s cubic-bezier(.34,1.56,.64,1) both, float-y 2s 0.5s ease-in-out infinite; }
.act-slide-in    { animation: slide-from-left 0.4s ease both; }
.act-glow-orange { animation: glow-pulse-orange 1.2s ease-in-out infinite; }
.act-glow-indigo { animation: glow-pulse-indigo 1.2s ease-in-out infinite; }
.act-glow-green  { animation: glow-pulse-green  1.2s ease-in-out infinite; }
.act-fade-cycle  { animation: fade-cycle 1.4s ease-in-out infinite; }
.act-spin-once   { animation: spin-once  1.4s ease-in-out infinite; color: rgba(148,163,184,.5); }
.act-unlock      { animation: unlock-shake 1.4s ease-in-out infinite; }
.act-float-right { animation: float-right 1.4s ease-in-out infinite; }
.act-float-out   { animation: float-out   1.4s ease-in-out infinite; }
.act-float-in    { animation: float-in    1.4s ease-in-out infinite; }
.act-absorb      { animation: absorb      1.4s ease-in-out infinite; }

@keyframes pop-in          { from{transform:scale(0) translateY(6px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
@keyframes float-y         { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
@keyframes slide-from-left { from{transform:translateX(-10px);opacity:0} to{transform:translateX(0);opacity:1} }
@keyframes key-fly         { 0%{opacity:0;transform:translateY(-6px) scale(.6)} 25%{opacity:1;transform:translateY(0) scale(1)} 70%{opacity:1;transform:translateY(0) scale(1)} 100%{opacity:0;transform:translateY(4px) scale(.6)} }
@keyframes fade-cycle      { 0%,100%{opacity:.5;transform:scale(.9)} 50%{opacity:1;transform:scale(1.1)} }
@keyframes spin-once       { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
@keyframes unlock-shake    { 0%,100%{transform:rotate(0deg)} 20%{transform:rotate(-8deg)} 40%{transform:rotate(8deg)} 60%{transform:rotate(-4deg)} 80%{transform:rotate(4deg)} }
@keyframes float-right     { 0%,100%{transform:translateX(-4px);opacity:.3} 50%{transform:translateX(4px);opacity:1} }
@keyframes float-out       { 0%,100%{transform:translateX(0);opacity:1} 50%{transform:translateX(-6px);opacity:.4} }
@keyframes float-in        { 0%,100%{transform:translateX(6px);opacity:.3} 50%{transform:translateX(0);opacity:1} }
@keyframes absorb          { 0%,100%{transform:scale(1);opacity:1} 60%{transform:scale(.6);opacity:.6} }
@keyframes glow-pulse-orange { 0%,100%{filter:drop-shadow(0 0 2px #f97316);opacity:.8} 50%{filter:drop-shadow(0 0 8px #f97316);opacity:1} }
@keyframes glow-pulse-indigo { 0%,100%{filter:drop-shadow(0 0 2px #6366f1);opacity:.8} 50%{filter:drop-shadow(0 0 8px #6366f1);opacity:1} }
@keyframes glow-pulse-green  { 0%,100%{filter:drop-shadow(0 0 2px #22c55e);opacity:.8} 50%{filter:drop-shadow(0 0 8px #22c55e);opacity:1} }
@keyframes line-grow  { from{width:0;opacity:0} to{opacity:1} }
@keyframes line-pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
</style>
