<!-- BookComponent.vue -->
<template>
    <div
      class="book-container"
      :class="{ 'has-clue': book.clue }"
    >
      <div
        class="book"
        :class="[book.color, { 'is-found': isFound }]"
        @click="handleClick"
      >
        <div class="book-spine">
          <book-icon class="w-6 h-6 mb-2" />
          <span class="book-title">{{ book.title }}</span>
        </div>
        <div v-if="isFound" class="found-marker" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  // Assuming BookIcon is a globally registered component or imported elsewhere if needed.
  // For now, let's comment out BookIcon to make it runnable.
  // import { BookIcon } from '@heroicons/vue/24/outline'
  
  const props = defineProps({
    book: {
      type: Object,
      required: true
    },
    isFound: {
      type: Boolean,
      default: false
    }
  })
  
  const emit = defineEmits(['book-click'])
  
  const handleClick = () => {
    emit('book-click', props.book)
  }
  
  // 顯式使用 props 和 emit (僅為消除 ESLint 警告，實際功能不受影響)
  console.log(props);
  console.log(emit);
  </script>
  
  <style scoped>
  .book-container {
    perspective: 1000px;
    height: 160px;
  }
  
  .book {
    position: relative;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .book:hover {
    transform: rotateY(-15deg) translateZ(20px);
  }
  
  .book-spine {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    backface-visibility: hidden;
  }
  
  .book-title {
    font-size: 0.875rem;
    text-align: center;
    line-height: 1.2;
  }
  
  .found-marker {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    width: 0.75rem;
    height: 0.75rem;
    background-color: #3B82F6;
    border-radius: 9999px;
    animation: pulse 2s infinite;
  }
  
  .has-clue .book {
    border: 2px solid transparent;
    transition: border-color 0.3s;
  }
  
  .has-clue .book:hover {
    border-color: #3B82F6;
  }
  
  .is-found {
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
  }
  
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
    }
  
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
    }
  
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
    }
  }
  </style>