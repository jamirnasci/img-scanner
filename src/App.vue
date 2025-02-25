<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { AdMob, AdMobInitializationOptions } from '@capacitor-community/admob';
import { StatusBar } from '@capacitor/status-bar';
import { IonApp, IonRouterOutlet } from '@ionic/vue';

StatusBar.setOverlaysWebView({overlay: false})
StatusBar.show()
</script>
