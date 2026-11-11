import { defineShortcutsSetup } from '@slidev/types'

export default defineShortcutsSetup((nav, base) => [
  ...base,
  // Home で最初のページ(クリックも 0 に戻す)。0 でも同じ
  { name: 'first_page', key: 'home', fn: () => nav.go(1, 0) },
  { name: 'first_page_zero', key: '0', fn: () => nav.go(1, 0) },
])
