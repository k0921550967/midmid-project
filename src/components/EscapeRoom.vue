<!-- EscapeRoom.vue -->
<template>
    <div class="escape-room">
      <h1>Escape Room</h1>
      <p class="subtitle">Find the clues to escape!</p>
  
      <div class="book-shelf">
        <BookComponent
          v-for="book in books"
          :key="book.id"
          :book="book"
          @book-click="handleBookClick"
        />
      </div>
  
      <PasswordInput
        v-if="showPasswordInput"
        @submit="handleSubmitPassword"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import BookComponent from './BookComponent.vue'
  import PasswordInput from './PasswordInput.vue'
  
  const books = ref([
    { id: 1, title: '古籍', color: 'brown', clue: '數字的秘密藏在古籍之中...' },
    { id: 2, title: '藍皮書', color: 'blue', clue: null },
    { id: 3, title: '綠色手冊', color: 'green', clue: '仔細看看綠色手冊的封面...' },
    { id: 4, title: '紅色詩集', color: 'red', clue: '詩歌中似乎隱藏著什麼...' },
  ]);
  
  const showPasswordInput = ref(false);
  
  const handleBookClick = (book) => {
    console.log('Book clicked:', book.title);
    if (book.clue) {
      alert(`線索：${book.clue}`);
    }
    if (book.id === 2) {
      showPasswordInput.value = true;
    }
  };
  
  const handleSubmitPassword = (password) => {
    console.log('Password submitted:', password);
    if (password === '3547') {
      alert('恭喜你，密碼正確！成功逃脫！');
      showPasswordInput.value = false;
    } else {
      alert('密碼錯誤，請再試一次。');
    }
  };
  </script>
  
  <style scoped>
  .escape-room {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: #f0f0f0; /* 淺灰色背景 */
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    max-width: 800px; /* 設定最大寬度 */
    margin: 2rem auto; /* 上下外距，並水平置中 */
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #333; /* 深灰色標題 */
  }
  
  .subtitle {
    font-size: 1.1rem;
    color: #777; /* 淺灰色副標題 */
    margin-bottom: 1.5rem;
  }
  
  .book-shelf {
    display: flex;
    justify-content: center; /* 水平置中書籍 */
    flex-wrap: wrap; /* 自動換行 */
    gap: 1.5rem; /* 書籍間距 */
    margin-bottom: 2rem; /* 與密碼輸入框間距 */
  }
  </style>