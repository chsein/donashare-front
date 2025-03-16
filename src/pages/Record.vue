<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <transition name="route" appear @before-enter="beforeEnter" @enter="enter">
      <div class="container">
        <div class="cards-container">
          <div
            class="card-item"
            v-for="(card, index) in cards"
            :key="card.id"
            :style="getCardStyle(index)"
          >
            <Card :cardData="card" :isFlipped="isFlipped" />
          </div>
        </div>

        <v-row justify="space-between" style="max-width: 80vw; width: 100%">
          <v-col cols="auto">
            <v-btn
              variant="text"
              color="white"
              style="font-size: 20px; margin-top: 20px; padding: 0"
              @click="toggleFlip"
              >Flip</v-btn
            >
          </v-col>

          <v-col cols="auto">
            <v-btn
              variant="text"
              color="white"
              style="font-size: 20px; margin-top: 20px; padding: 0"
              @click="handleNext"
              >Next</v-btn
            >
          </v-col>
        </v-row>
      </div>
    </transition>
  </v-container>
</template>

<script lang="ts">
import Card from "../components/Card.vue";
import gsap from "gsap";
import axios from "axios";
import { onMounted, ref, type CSSProperties } from "vue";

export default {
  name: "Record",
  components: {
    Card: Card,
  },

  setup() {
    const isFlipped = ref(false);
    const cards = ref<any[]>([]);
    const currentCardIndex = ref(0);

    const toggleFlip = () => {
      isFlipped.value = !isFlipped.value;
    };

    const getAllCards = async () => {
      try {
        const response = await axios.get("https://13.209.72.52:8080/cards");
        cards.value = response.data;

        console.log("Fetched cards:", response.data); // 받아온 카드 데이터 출력
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    const handleNext = () => {
      if (currentCardIndex.value < cards.value.length) {
        const firstCard =
          document.querySelectorAll(".card-item")[currentCardIndex.value];

        if (firstCard) {
          gsap.to(firstCard, {
            duration: 1,
            y: "-100vh", // 카드를 위로 날려보냄
            opacity: 0, // 투명하게 만들기
            onStart: () => {
              console.log(
                `Animation started for card ${currentCardIndex.value + 1}`
              );
            },
            onComplete: () => {
              console.log(
                `Animation completed for card ${currentCardIndex.value + 1}`
              );
              // 카드가 사라지면 첫 번째 카드 제거
              cards.value.shift();
            },
          });
        }
      } else {
        console.log("No more cards to animate");
      }
    };

    // 각 카드의 스타일 반환
    const getCardStyle = (index: number) => {
      const zIndex = cards.value.length - index; // 앞에 있는 카드가 z-index가 더 커짐
      return {
        position: `absolute`, // 카드들이 겹쳐지도록 Y축으로 이동
        zIndex: zIndex.toString(), // 카드들이 겹쳐지는 순서
      } as CSSProperties;
    };

    // 컴포넌트 마운트 시 카드 데이터를 가져옵니다
    onMounted(() => {
      getAllCards();
    });

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
      isFlipped,
      cards,
      toggleFlip,
      getAllCards,
      getCardStyle,
      handleNext,
      beforeEnter,
      enter,
    };
  },
};
</script>

<style>
.container {
  position: relative;
  width: 70vw;
  height: calc((70vw * 10) / 8);
}
@media (min-width: 600px) {
  .container {
    width: 420px;
    height: calc((420px * 10) / 8);
  }
}
.cards-container {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; /* 수평 중앙 */
  align-items: center; /* 수직 중앙 */
  flex-direction: column; /* 카드들을 수직으로 배치 */
}

.v-row {
  position: relative;
  z-index: 10; /* 버튼들이 카드들 위에 오지 않도록 설정 */
  margin-top: 20px; /* 버튼들이 카드 아래로 내려오도록 설정 */
}
</style>
