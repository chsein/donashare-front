<template>
  <v-app>
    <div class="background"></div>
    <AppBar />
    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="route" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import AppBar from "./components/AppBar.vue";
</script>

<style scoped>
.background {
  background-image: url("/donashare-front/assets/images/utexas.jpg");
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
}

.background::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
}

v-main {
  position: relative;
  z-index: 1;
  height: 100vh;
  display: flex;
}

/* route transition */
.route-enter-form {
  opacity: 0;
  transform: translateY(300px);
}

.route-enter-active {
  transition: ass 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateY(-300px);
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
