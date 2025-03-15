<template>
  <v-container class="fill-height" fluid>
    <transition name="route" appear @before-enter="beforeEnter" @enter="enter">
      <v-row align="center">
        <v-col align-self="start" style="text-align: left">
          <v-sheet
            elevation="0"
            class="question-text"
            style="background: transparent; color: white"
          >
            What is your unforgettable moment in University of Texas at Austin?
          </v-sheet>
          <router-link to="/post">
            <v-btn
              variant="text"
              color="white"
              style="font-size: 30px; margin-top: 20px; padding: 0"
              >Click to Share your experience</v-btn
            >
          </router-link>
        </v-col>
      </v-row>
    </transition>
  </v-container>
</template>

<script lang="ts">
import gsap from "gsap";
export default {
  name: "Main",
  setup(props, ctx) {
    const beforeEnter = (el: any) => {
      el.style.transform = "translateY(100vh)";
      el.style.opacity = 1;
    };
    const enter = (el: gsap.TweenTarget, done: any) => {
      gsap.to(el, {
        duration: 1,
        y: 0,
        opacity: 1,
        onComplete: done,
      });
    };
    return {
      beforeEnter,
      enter,
    };
  },
};
</script>

<style>
.question-text {
  position: relative;
  font-size: 100px;
  width: 70%;
}
@media (max-width: 600px) {
  .question-text {
    font-size: 80px;
  }
}
</style>
