import { createApp } from 'vue'
import App from './App.vue'
import '../style.css' // 修改匯入路徑 (如果 style.css 放在根目錄)
// import './style.css' // 如果 style.css 放在 src 目錄，則維持不變

createApp(App).mount('#app')