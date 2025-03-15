<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <transition name="route" appear @before-enter="beforeEnter" @enter="enter">
      <div>
        <div class="flip-container" :class="{ flipped: isFlipped }">
          <div class="flip-card">
            <div class="story-card flip-front">
              <v-card style="width: 100%; height: 100%; padding: 10px">
                <label
                  for="image-upload"
                  class="polaroid-image"
                  style="width: 100%; height: 80%"
                >
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    @change="onImageUpload"
                    hidden
                  />
                  <div class="image-container">
                    <div
                      class="image-preview"
                      :style="{
                        backgroundImage: this.imageFile
                          ? `url(${imageFile})`
                          : 'none',
                      }"
                    ></div>
                  </div>
                </label>

                <v-divider></v-divider>
                <div>
                  <textarea
                    v-model="title"
                    placeholder="Add a Title"
                    row="1"
                    maxlength="30"
                    style="
                      color: black;
                      text-align: center;
                      width: 100%;
                      white-space: nowrap;
                      overflow: hidden;
                      font-size: 30px;
                    "
                  ></textarea>
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
                  <textarea
                    v-model="memo"
                    placeholder="Add your memo"
                    style="
                      color: white;
                      text-align: center;
                      width: 90%;
                      height: 70%;
                      font-size: 30px;
                    "
                  ></textarea>
                </div>
                <div class="logo-container2">
                  <v-row justify="space-between" class="text-row">
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
        <v-row justify="space-between">
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
              @click="submitData"
              >Submit</v-btn
            >
          </v-col>
        </v-row>
      </div>
    </transition>
  </v-container>
</template>

<script>
import { ref } from "vue";
import gsap from "gsap";
import axios from "axios";

export default {
  name: "Post",
  setup() {
    const isFlipped = ref(false);
    const imageFile = ref("");
    const title = ref("");
    const memo = ref("");

    const toggleFlip = () => {
      isFlipped.value = !isFlipped.value;
    };

    const onImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          imageFile.value = reader.result;
        };
        reader.readAsDataURL(file);
        imageFile.file = file;
        console.log(file);
      }
    };

    const submitData = async () => {
      const formData = new FormData();
      console.log(imageFile.file);
      formData.append("image", imageFile.file);
      try {
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the correct content type for file uploads
            },
          }
        );
        console.log("Upload success:", response.data);
        const imageUrl = response.data.fileUrl; // 서버에서 반환한 이미지 URL (예: "http://localhost:5000/uploads/...")

        const postData = {
          imgUrl: imageUrl, // 업로드된 이미지 URL
          title: title.value, // 제목
          memo: memo.value, // 메모
        };

        await axios.post("http://localhost:5000/cards/post", postData);

        console.log("Post created successfully:"); // 게시물이 성공적으로 생성된 후 응답 출력
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };

    const beforeEnter = (el) => {
      el.style.transform = "translateY(100vh)";
      el.style.opacity = 1;
    };
    const enter = (el, done) => {
      gsap.to(el, {
        duration: 1,
        y: 0,
        opacity: 1,
        onComplete: done,
      });
    };

    return {
      isFlipped,
      imageFile,
      title,
      memo,
      onImageUpload,
      toggleFlip,
      submitData,
      beforeEnter,
      enter,
    };
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
  font-size: 3vw;
  white-space: nowrap;
}
@media (min-width: 600px) {
  .text-row {
    font-size: 300px;
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
  cursor: pointer; /* 클릭 가능하도록 변경 */
  position: relative;
}

.image-container {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #ffffff; /* 기본 배경색 */
}

.image-preview {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
</style>
