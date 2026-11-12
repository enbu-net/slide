<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import { useLiveSlide } from '../composables/liveSlide'
import { stepCount, stepLabel } from '../composables/splitSteps'

// いまのページ / 全ページ数
const { currentSlideNo, clicks, total } = useNav()
const { comments } = useLiveSlide(currentSlideNo)
const label = computed(() => stepLabel(currentSlideNo.value, clicks.value, stepCount(comments.value.map(c => c.click))))
</script>

<template>
  <div class="biim-page-no font-mono">
    <span class="now">{{ label }}</span><span class="rest"><span class="sep">/</span>{{ total }}</span>
  </div>
</template>

<style scoped>
.biim-page-no {
  font-size: 1.1rem;
  line-height: 1;
  white-space: nowrap;
}
.now {
  font-weight: bold;
}
.rest {
  color: var(--biim-muted);
}
.sep {
  margin: 0 0.15em;
}
</style>
