<script setup>
import { RouterView, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const { isAuth } = storeToRefs(auth)
</script>

<template>
  <v-app>
    <v-app-bar flat>
      <v-container
        class="fill-heigth d-flex align-center justify-space-between"
      >
        <!-- <v-avatar class="me-2 ms-4" color="grey-darken-1" size="32" /> -->
        <v-app-bar-title>Homyz</v-app-bar-title>
        <div>
          <div v-if="isAuth">
            <v-btn :to="{ name: 'home' }">Home</v-btn>
            <v-btn :to="{ name: 'admin-properties' }">Admin</v-btn>
            <v-btn @click="auth.logout">Logout</v-btn>
          </div>
          <div v-else>
            <v-btn :to="{ name: 'home' }">Home</v-btn>
            <v-btn :to="{ name: 'login' }">Login</v-btn>
          </div>
        </div>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-sheet class="rounded-lg py-8 px-4">
          <RouterView />
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>
