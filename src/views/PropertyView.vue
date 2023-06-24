<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { doc } from 'firebase/firestore'
import { useDocument, useFirestore } from 'vuefire'
import { propertyPrice } from '@/helpers'
import { useLocationMap } from '@/composables/useLocationMap'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'

const { zoom, center } = useLocationMap()

const route = useRoute()
const db = useFirestore()
const docRef = doc(db, 'properties', route.params.id)
const property = useDocument(docRef)

watch(property, (property) => {
  center.value = property.location
})
</script>

<template>
  <v-row>
    <v-col cols="6">
      <div class="text-h4 font-weight-bold">
        {{ propertyPrice(property.price) }} USD
      </div>
      <div class="text-h5">{{ property.title }}</div>
      <v-chip color="primary" class="mt-4 text-capitalize font-weight-bold">{{
        property.type
      }}</v-chip>
      <v-row class="mt-6">
        <v-col>
          <div class="text-body-2">Area</div>
          <div class="text-subtitle-1 font-weight-bold">
            {{ property.area }} m2
          </div>
        </v-col>
        <v-col>
          <div class="text-body-2">Rooms</div>
          <div class="text-subtitle-1 font-weight-bold">
            {{ property.rooms }}
          </div>
        </v-col>
        <v-col>
          <div class="text-body-2">Baths</div>
          <div class="text-subtitle-1 font-weight-bold">
            {{ property.baths }}
          </div>
        </v-col>
        <v-col>
          <div class="text-body-2">Parking</div>
          <div class="text-subtitle-1 font-weight-bold">
            {{ property.parking }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-body-2">Swimming</div>
          <div class="text-subtitle-1 font-weight-bold">
            {{ property.swimming ? 'Yes' : 'No' }}
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="6">
      <img :src="property.image" class="w-100 rounded-lg" />
    </v-col>
  </v-row>
  <div class="text-h6 font-weight-bold mt-6">About this property</div>
  <div>{{ property.description }}</div>
  <div class="text-h6 font-weight-bold mt-6">Location</div>
  <div class="mt-4">
    <div style="height: 600px">
      <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
        <LMarker :lat-lng="center">
          <LPopup>{{ property.title }}</LPopup>
        </LMarker>
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></LTileLayer>
      </LMap>
    </div>
  </div>
</template>
