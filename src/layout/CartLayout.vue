<template>
  <header class="header">
    <div class="header__wrapper" :style="{ justifyContent: 'center' }">
      <div class="header__logo logo">
        <router-link to="/">
          <img src="../assets/logo.png" alt="Логотип" class="logo__img" />
        </router-link>
      </div>
    </div>
    <hr />
  </header>
</template>

<style scoped src="../css/layout.css"></style>
