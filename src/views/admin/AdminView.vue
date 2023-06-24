<script setup>
import { useProperties } from '@/composables/useProperties'
import { propertyPrice } from '@/helpers'

const { propertiesCollection, deleteProperty } = useProperties()
</script>

<template>
  <h1>Manage Properties</h1>
  <div class="d-flex justify-end mt-4">
    <v-btn :to="{ name: 'new-property' }">New property</v-btn>
  </div>
  <v-row class="mt-4">
    <v-col
      v-for="property in propertiesCollection"
      :key="property.id"
      cols="12"
      sm="6"
      md="4"
      lg="3"
    >
      <v-card>
        <v-img :src="property.image" height="200px" cover
          ><v-chip
            color="primary"
            class="mt-2 ml-2 text-capitalize font-weight-bold"
            >{{ property.type }}</v-chip
          ></v-img
        >
        <v-card-item>
          <v-card-title>{{ property.title }}</v-card-title>
          <v-card-subtitle
            >{{ propertyPrice(property.price) }} USD •
            {{ property.area }} m2</v-card-subtitle
          >
        </v-card-item>
        <v-card-text class="text-truncate">{{
          property.description
        }}</v-card-text>
        <v-card-actions>
          <v-btn
            variant="tonal"
            :to="{ name: 'edit-property', params: { id: property.id } }"
            >Edit</v-btn
          >
          <v-btn
            color="error"
            @click="deleteProperty(property.id, property.image)"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
