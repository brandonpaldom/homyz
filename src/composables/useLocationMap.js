import { ref } from 'vue'

export function useLocationMap() {
  const zoom = ref(16)
  const center = ref([19.5415882, -96.9363643])

  function pin(e) {
    const marker = e.target.getLatLng()
    center.value = [marker.lat, marker.lng]
  }

  return { zoom, center, pin }
}
