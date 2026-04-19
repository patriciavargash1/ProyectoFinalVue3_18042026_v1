<template>
    <div v-if="modelValue" class="overlay" @click.self="close">
  
      <div class="app-modal">
        <button class="app-close" @click="close">✖</button>
  
        <div class="content">
          <slot></slot>
        </div>
  
      </div>
  
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    modelValue: Boolean
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const close = () => {
    emit('update:modelValue', false);
  };
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 700;
  }
  
  .app-modal {
    background: white;
    padding: 20px;
    border-radius: 10px;
    min-width: 300px;
    position: relative;
    animation: fadeIn 0.3s ease;
  }
  
  .app-close {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: red;
    color: white;
    cursor: pointer;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  </style>