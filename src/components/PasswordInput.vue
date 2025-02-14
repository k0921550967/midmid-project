<!-- PasswordInput.vue -->
<template>
    <div class="password-container">
      <div class="display-container">
        <div
          v-for="(digit, index) in displayDigits"
          :key="index"
          class="digit-display"
          :class="{ 'has-value': digit !== '_' }"
        >
          {{ digit }}
        </div>
      </div>
  
      <div class="keypad-container">
        <button
          v-for="number in ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫']"
          :key="number"
          @click="handleKeyPress(number)"
          class="keypad-button"
          :class="{
            'clear': number === 'C',
            'backspace': number === '⌫'
          }"
        >
          {{ number }}
        </button>
      </div>
  
      <button
        @click="handleSubmit"
        class="submit-button"
        :disabled="password.length !== 4"
      >
        確認密碼
      </button>
  
      <transition name="shake">
        <p v-if="showError" class="error-message">
          密碼錯誤，請再試試看！
        </p>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const emit = defineEmits(['submit'])
  const password = ref('')
  const showError = ref(false)
  
  const displayDigits = computed(() => {
    const digits = password.value.split('')
    while (digits.length < 4) {
      digits.push('_')
    }
    return digits
  })
  
  const handleKeyPress = (key) => {
    if (key === 'C') {
      password.value = ''
    } else if (key === '⌫') {
      password.value = password.value.slice(0, -1)
    } else if (password.value.length < 4) {
      password.value += key
    }
    showError.value = false
  }
  
  const handleSubmit = () => {
    if (password.value.length === 4) {
      emit('submit', password.value)
      if (password.value !== '3547') {
        showError.value = true
        password.value = ''
  
        // 添加震動效果
        const container = document.querySelector('.password-container')
        container.classList.add('shake')
        setTimeout(() => {
          container.classList.remove('shake')
        }, 500)
      }
    }
  }
  </script>
  
  <style scoped>
  .password-container {
    max-width: 300px;
    margin: 0 auto;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
  }
  
  .password-container::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      transparent 100%
    );
    animation: rotate 20s linear infinite;
    z-index: -1;
  }
  
  .display-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    gap: 0.5rem;
  }
  
  .digit-display {
    flex: 1;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    transition: all 0.3s;
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .has-value {
    background: rgba(59, 130, 246, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    border-color: rgba(59, 130, 246, 0.5);
  }
  
  .keypad-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  
  .keypad-button {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.75rem;
    font-size: 1.25rem;
    font-weight: bold;
    transition: all 0.2s;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .keypad-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .keypad-button:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  .clear {
    color: #EF4444;
    background: rgba(239, 68, 68, 0.1);
  }
  
  .clear:hover {
    background: rgba(239, 68, 68, 0.2);
  }
  
  .backspace {
    color: #F59E0B;
    background: rgba(245, 158, 11, 0.1);
  }
  
  .backspace:hover {
    background: rgba(245, 158, 11, 0.2);
  }
  
  .submit-button {
    width: 100%;
    padding: 0.875rem;
    background: linear-gradient(135deg, #3B82F6, #2563EB);
    color: white;
    border-radius: 0.75rem;
    font-weight: bold;
    transition: all 0.3s;
    border: none;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .submit-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
  }
  
  .submit-button:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  }
  
  .submit-button:disabled {
    background: linear-gradient(135deg, #9CA3AF, #6B7280);
    cursor: not-allowed;
    box-shadow: none;
  }
  
  .error-message {
    margin-top: 1rem;
    color: #EF4444;
    text-align: center;
    font-weight: 500;
    animation: fadeIn 0.3s ease-in-out;
  }
  
  .shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
  }
  
  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }
    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }
    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }
  
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .shake-enter-active,
  .shake-leave-active {
    transition: all 0.3s ease;
  }
  
  .shake-enter-from,
  .shake-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>