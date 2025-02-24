<template>
<ion-page>
  <top-bar title="Result"/>
  <ion-content>
    <div class="container">
      <h1 class="page-title">Extracted Text</h1>
      <textarea>{{ textResult }}</textarea>
      <button id="copy-btn" @click="copy">Copy to Clipboard</button>
      <button id="menu-btn" @click="toMenu">Menu</button>
      <ion-toast 
        trigger="open-toast" 
        message="Copied to Clipboard" 
        :duration="2000"
        :is-open="isToastOpen"
      />
    </div>
  </ion-content>
</ion-page>
</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue';
import { IonContent, IonPage, IonToast } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const textResult = ref('')
const isToastOpen = ref(false)
const route = useRoute()
const router = useRouter()

onMounted(()=>{
  textResult.value = route.params.text as string
})

function copy(){
  navigator.clipboard.writeText(textResult.value)
  isToastOpen.value = true
}
function toMenu(){
  router.back()
}
</script>

<style scoped>
textarea{
  resize: none;
  padding: 10px;
  min-height: 300px;
  width: 80%;
  outline: none;
  color: black;
  border-radius: 20px;
}
button{
  margin: 5px;
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
  min-width: 180px;
  box-shadow: 0px 0px 10px gray;
  border-radius: 10px;
  color: white;
}
#copy-btn{
  background-color: purple;
}
#menu-btn{
  background-color: indigo;
}
</style>