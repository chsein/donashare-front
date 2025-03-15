<template>
  <div class="flip-container" :class="{ flipped: isFlipped }">
    <div class="flip-card">
      <div class="story-card flip-front">
        <v-card style="width: 100%; height: 100%; padding: 10px">
          <label
            for="image-upload"
            class="polaroid-image"
            style="width: 100%; height: 80%"
          >
            <div class="image-container">
              <v-img
                :src="cardData.imgUrl"
                alt="Card Image"
                class="image-preview"
                contain
                cover
              />
            </div>
          </label>

          <v-divider></v-divider>
          <div class="title-container">
            {{ cardData.title }}
          </div>
        </v-card>
      </div>

      <div class="story-card flip-back">
        <v-card
          style="
            width: 100%;
            height: 100%;
            padding-top: 10px;
            padding-bottom: 10px;
            display: flex;
            flex-direction: column;
          "
        >
          <div class="logo-container1"></div>
          <div class="memo-container">
            <!-- <textarea
              v-model="memo"
              placeholder="Add your memo"
              style="
                color: white;
                text-align: center;
                width: 90%;
                height: 70%;
                font-size: 3vw;
              "
            ></textarea> -->
            {{ cardData.memo }}
          </div>
          <div class="logo-container2">
            <v-row
              justify="space-between"
              class="text-row"
              style="margin-top: 0"
            >
              <v-col class="text-left-cut" cols="auto">
                <h1>DONA</h1>
                <h1>SHARE</h1>
              </v-col>

              <v-col cols="auto">
                <h1>DONA</h1>
                <h1>SHARE</h1>
              </v-col>

              <v-col class="extra-text" cols="auto">
                <h1>DONA</h1>
                <h1>SHARE</h1>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";

export default {
  name: "CardComponent",
  props: {
    isFlipped: {
      type: Boolean,
      default: false,
    },
    cardData: {
      type: Object,
      required: true,
    },
  },

  setup(props, { emit }) {
    watch(
      () => props.isFlipped,
      (newVal) => {
        console.log("isFlipped changed to:", newVal);
      }
    );
  },
};
</script>
<style>
.flip-container {
  position: relative;
  width: 70vw;
  height: calc((70vw * 10) / 8);
  perspective: 1000px;
}

@media (min-width: 600px) {
  .flip-container {
    width: 420px;
    height: calc((420px * 10) / 8);
  }
}

.flip-card {
  position: relative; /* relative에서 absolute로 변경 */
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.story-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}
.flip-front {
  position: absolute;
  transform: rotateY(0deg);
  z-index: 2;
}

.flip-back {
  position: absolute;
  transform: rotateY(180deg);
  z-index: 1;
}

.flipped .flip-card {
  transform: rotateY(180deg);
}

.title-container {
  width: 100%;
  height: 20%; /* 제목이 차지할 높이 */
  font-size: 30px; /* 반응형 글자 크기 */
  color: black;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
}

.logo-container1 {
  width: 100%;
  flex: 1;
  background: #939393;
  box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.4);
}
.memo-container {
  width: 100%;
  flex: 6.8;
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center;
  background: #484848;
  box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.4);
  color: white;
  font-size: 30px;
}

textarea {
  background: transparent;
  padding: 10px;
  resize: none;

  text-align: center;
  vertical-align: middle;
}

.logo-container2 {
  width: 100%;
  flex: 2;
  background: #939393;
  box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.4);
  color: #ffffff;
}
.text-row {
  font-size: 3.3vw;
  white-space: nowrap;
}
@media (min-width: 600px) {
  .text-row {
    font-size: 30px;
  }
}

.text-left-cut {
  margin-left: -50px; /* 왼쪽으로 이동 */
  white-space: nowrap; /* 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 부분 숨김 */
}

.extra-text {
  width: 80px;
  white-space: nowrap;
  overflow: hidden;
}

.polaroid-image {
  flex-grow: 1;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.image-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.image-preview {
  object-fit: fill;
  object-position: center;
}
</style>
