<!-- App.vue -->
<template>
  <div id="app">
    <EscapeRoom />
  </div>
</template>

<script setup>
import EscapeRoom from './components/EscapeRoom.vue' // 修改匯入路徑
</script>

<style scoped>
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>