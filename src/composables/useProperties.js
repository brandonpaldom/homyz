import { computed, ref } from 'vue'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref as storageRef } from 'firebase/storage'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'

export function useProperties() {
  const swimming = ref(false)

  const storage = useFirebaseStorage()
  const db = useFirestore()
  const propertiesCollection = useCollection(collection(db, 'properties'))

  const filterProperties = computed(() => {
    return swimming.value
      ? propertiesCollection.value.filter((property) => property.swimming)
      : propertiesCollection.value
  })

  async function deleteProperty(id, urlImage) {
    const docRef = doc(db, 'properties', id)
    const imageRef = storageRef(storage, urlImage)
    try {
      await Promise.all([deleteDoc(docRef), deleteObject(imageRef)])
    } catch (error) {
      console.log(error)
    }
  }

  return { swimming, propertiesCollection, filterProperties, deleteProperty }
}
