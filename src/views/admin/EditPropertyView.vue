<script setup>
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFirestore, useDocument } from 'vuefire'
import { useField, useForm } from 'vee-validate'
import { doc, updateDoc } from 'firebase/firestore'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { validationSchema } from '@/validation/propertySchema'
import { useImage } from '@/composables/useImage'
import { useLocationMap } from '@/composables/useLocationMap'

const items = [1, 2, 3, 4, 5]

const { url, uploadImage, getImage } = useImage()
const { zoom, center, pin } = useLocationMap()

const { handleSubmit } = useForm({ validationSchema })

const title = useField('title')
const image = useField('image')
const type = useField('type', null, {
  initialValue: 'house',
})
const price = useField('price')
const area = useField('area')
const rooms = useField('rooms')
const baths = useField('baths')
const parking = useField('parking')
const description = useField('description')
const swimming = useField('swimming')

const route = useRoute()
const router = useRouter()

const db = useFirestore()
const docRef = doc(db, 'properties', route.params.id)
const property = useDocument(docRef)

watch(property, (property) => {
  title.value.value = property.title
  price.value.value = property.price
  area.value.value = property.area
  rooms.value.value = property.rooms
  baths.value.value = property.baths
  parking.value.value = property.parking
  description.value.value = property.description
  swimming.value.value = property.swimming
  center.value.value = property.center
})

const submit = handleSubmit(async (values) => {
  const { image, ...property } = values
  if (getImage.value) {
    const data = {
      ...property,
      image: url.value,
      location: center.value,
    }
    await updateDoc(docRef, data)
  } else {
    const data = {
      ...property,
      location: center.value,
    }
    await updateDoc(docRef, data)
  }
  router.push({ name: 'admin-properties' })
})
</script>

<template>
  <v-sheet>
    <h1>Edit Property</h1>
    <v-form class="mt-6">
      <v-text-field
        type="text"
        label="Property title"
        v-model="title.value.value"
        :error-messages="title.errorMessage.value"
      />
      <v-file-input
        aceept="image/jpg"
        label="Photography"
        prepend-icon="mdi-camera"
        v-model="image.value.value"
        :error-messages="image.errorMessage.value"
        @change="uploadImage"
      />
      <div class="mb-4">
        <p class="font-weight-bold">Current image:</p>
        <img v-if="getImage" :src="getImage" class="w-50 mt-4" />
        <img v-else :src="property?.image" class="w-50 mt-4" />
      </div>
      <div>Type of property</div>
      <v-radio-group
        v-model="type.value.value"
        :error-messages="type.errorMessage.value"
        inline
      >
        <v-radio label="House" value="house" />
        <v-radio label="Apartment" value="apartment" />
        <v-radio label="Office" value="office" />
      </v-radio-group>
      <v-row>
        <v-col>
          <v-text-field
            label="Price"
            v-model="price.value.value"
            :error-messages="price.errorMessage.value"
          />
        </v-col>
        <v-col>
          <v-text-field
            label="Area in m2"
            v-model="area.value.value"
            :error-messages="area.errorMessage.value"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            label="Rooms"
            :items="items"
            v-model="rooms.value.value"
            :error-messages="rooms.errorMessage.value"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            label="Baths"
            :items="items"
            v-model="baths.value.value"
            :error-messages="baths.errorMessage.value"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            label="Parking"
            :items="items"
            v-model="parking.value.value"
            :error-messages="parking.errorMessage.value"
          ></v-select>
        </v-col>
      </v-row>
      <v-textarea
        label="Description"
        v-model="description.value.value"
        :error-messages="description.errorMessage.value"
      />
      <v-checkbox
        label="Swimming pool"
        v-model="swimming.value.value"
        :error-messages="swimming.errorMessage.value"
      />
      <h2>Location</h2>
      <div class="mt-4 mb-8">
        <div style="height: 600px">
          <LMap
            v-model:zoom="zoom"
            :center="center"
            :use-global-leaflet="false"
          >
            <LMarker :lat-lng="center" draggable @moveend="pin" />
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></LTileLayer>
          </LMap>
        </div>
      </div>
      <v-btn @click="submit">Save changes</v-btn>
    </v-form>
  </v-sheet>
</template>
