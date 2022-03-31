<template>
  <div class="char-printer">
    <span
      v-for="(char, idx) in text.split('')"
      v-html="char"
      :key="'span-' + idx"
      :style="{ animationDelay: idx * delay + 's', animationDuration: duration + 's' }"
    ></span>
  </div>
</template>

<script>

export default {
  props: {
    text: {
      type: String,
    },
    delay: {
      type: [String, Number],
      default: 0.05
    },
    duration: {
      type: [String, Number],
      default: 0.3
    }
  }
}

</script>

<style scoped>
.char-printer {
  display: inline-block;
}

.char-printer span {
  opacity: 0;
  animation: animationOpacity forwards;
}

@keyframes animationOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>