<template>
  <div>
    <!-- <router-view v-slot="{Component}" >
  <transition name="fade" mode="out-in">
    <Component :is="Component"/>

  </transition>
  </router-view> -->
  <router-view></router-view>
  </div>
</template>




<style>
  .fade-enter-from,
  .fade-leave-to{opacity: 0;}
  
  .fade-enter-active,
  .fade-1eave-active{transition : opacity 0.5s ease-out;}
  </style>