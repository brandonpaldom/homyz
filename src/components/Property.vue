<script setup>
defineProps({
  property: {
    type: Object,
    required: true,
  },
  propertyPrice: Function,
})
</script>

<template>
  <v-col cols="12" sm="6" md="4" lg="3">
    <v-card>
      <v-img :src="property.image" height="200px" cover>
        <v-chip
          color="primary"
          class="mt-2 ml-2 text-capitalize font-weight-bold"
          >{{ property.type }}</v-chip
        >
      </v-img>
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
        <v-btn :to="{ name: 'property', params: { id: property.id } }"
          >View details</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-col>
</template>
