export const validationSchema = {
  title(value) {
    if (value?.length >= 6) return true
    return 'Title to the property is required or too short'
  },
  type(value) {
    if (value) return true
    return 'Select a option'
  },
  price(value) {
    if (/^[0-9]+$/.test(value)) return true
    return 'Price must only be numbers'
  },
  area(value) {
    if (value) return true
    if (/^[0-9]+$/.test(value)) return true
    return 'Area must only be numbers'
  },
  rooms(value) {
    if (value) return true
    return 'Select an amount'
  },
  baths(value) {
    if (value) return true
    return 'Select an amount'
  },
  parking(value) {
    if (value) return true
    return 'Select an amount'
  },
  description(value) {
    if (value) return true
    return 'Add a description'
  },
}

export const imageSchema = {
  image(value) {
    if (value) return true
    return 'Image is required'
  },
}
