<template>
  <ion-page>
    <top-bar title="Menu" />
    <ion-content :fullscreen="true">
      <div class="container">
        <h1 class="page-title">Image Text Extractor</h1>
        <div class="img-container" v-if="imgSrc != ''">
          <input type="button" value="X" id="clear-img-src" @click="clearSrc"><br>
          <img :src="imgSrc" alt="img" class="img-picked">
        </div>
        <input type="file" name="file" id="file" @change="setPath">
        <select name="lang" id="lang" v-model="lang">
          <option value="por">🇧🇷 Portuguese</option>
          <option value="eng">🇺🇸 English</option>
          <option value="spa">🇪🇸 Spanish</option>
          <option value="jpn">🇯🇵 Japanese</option>
        </select>
        <label for="file" class="simple-btn">Pick Image</label>
        <button @click="extract" class="simple-btn">Scan Text</button>
        <div class="progress-container" :style="`display: ${isProgressBarVisible};`">
          <div :style="`width:${progress};`" class="progress-bar"></div>
        </div>
        <p>
          {{ textResult }}
        </p>
        <ion-toast 
          :is-open="isToastOpen" 
          message="File not selected" 
          :duration="2000"
          @did-dismiss="handleToast"
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue';
import { IonContent, IonHeader, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/vue';
import Tesseract from 'tesseract.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const imgSrc = ref('')
const progress = ref('0%')
const textResult = ref('')
const isToastOpen = ref(false)
const router = useRouter()
const isProgressBarVisible = ref('none')
const lang = ref('eng')
const reader: FileReader = new FileReader();
const file: any = ref(null)

function clearSrc() {
  imgSrc.value = ''
  file.value = null
}

function handleToast(){
  isToastOpen.value = isToastOpen.value ? false : true
}

function extract() {
  if(!file.value){
    handleToast()
    return ;
  }
  isProgressBarVisible.value = 'block'
  Tesseract.recognize(
    imgSrc.value,
    lang.value,
    {
      logger: (m) => progress.value = `${m.progress * 100}%`, // Para mostrar o progresso
    }
  ).then(({ data: { text } }) => {
    // textResult.value = text
    isProgressBarVisible.value = 'none'
    router.push({
      name: 'result', params: {
        text: text
      }
    })
  });
  
}

function setPath(event: any) {
  file.value = event.target.files[0];
  if (file.value) {
    reader.onload = function () {
      imgSrc.value = reader.result as string
    }
    reader.readAsDataURL(file.value);
  }
}

</script>

<style scoped>
#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

#clear-img-src {
  background-color: red;
  position: relative;
  left: 93%;
  top: 3%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: white;
  border: none;
  font-weight: bold;
  font-size: 8pt;
}

.img-container {
  margin: 10px;
  border-radius: 10px;
  max-height: 400px;
}

.img-picked {
  width: 100%;
  max-height: 300px;
  box-shadow: 0px 0px 10px gray;
  transition: 1s;
}

#file {
  display: none;
}

select {
  outline: none;
  font-size: 18px;
  color: white;
  background: linear-gradient(45deg, indigo, purple);
  box-shadow: 0px 0px 10px gray;
  padding: 10px;
  margin: 10px;
  min-width: 200px;
  border-radius: 10px;
}

option {
  color: white;
  background-color: purple;
}

.progress-container {
  position: absolute;
  top: 50%;
  background-color: white;
  min-width: 200px;
  border: solid 1px gray;
  margin: 20px;
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 10px lightgray;
  transition: opacity 0.5s ease;
}

.progress-bar {
  background: linear-gradient(45deg, aqua, darkcyan);
  height: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px black;
}
</style>
