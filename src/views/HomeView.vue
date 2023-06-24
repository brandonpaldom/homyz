<script setup>
import { useProperties } from '@/composables/useProperties'
import Property from '@/components/Property.vue'
import { propertyPrice } from '@/helpers'

const { swimming, filterProperties } = useProperties()
</script>

<template>
  <h1>All Properties</h1>
  <div class="mt-4">
    <div>Filter by</div>
    <v-checkbox v-model="swimming" label="Swimming" />
  </div>
  <v-row class="">
    <Property
      v-for="property in filterProperties"
      :key="property.id"
      :property="property"
      :propertyPrice="propertyPrice"
    />
  </v-row>
</template>
