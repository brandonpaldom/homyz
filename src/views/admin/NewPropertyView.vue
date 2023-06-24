<script setup>
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import { collection, addDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { validationSchema, imageSchema } from '@/validation/propertySchema'
import { useImage } from '@/composables/useImage'
import { useLocationMap } from '@/composables/useLocationMap'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'

const router = useRouter()

const { url, uploadImage, getImage } = useImage()
const { zoom, center, pin } = useLocationMap()

const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema,
  },
})

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
const swimming = useField('swimming', null, {
  initialValue: false,
})

const items = [1, 2, 3, 4, 5]

const db = useFirestore()

const submit = handleSubmit(async (values) => {
  const { image, ...property } = values

  const docRef = await addDoc(collection(db, 'properties'), {
    ...property,
    image: url.value,
    location: center.value,
  })

  if (docRef.id) {
    router.push({ name: 'admin-properties' })
  }

  console.log('Document written with ID:', docRef.id)
})
</script>

<template>
  <v-sheet>
    <h1>New Property</h1>
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
      <div v-if="getImage" class="mb-4">
        <p class="font-weight-bold">Property image:</p>
        <img :src="getImage" class="w-50 mt-4" />
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
      <v-btn @click="submit">Add property</v-btn>
    </v-form>
  </v-sheet>
</template>
