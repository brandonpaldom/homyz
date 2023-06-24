import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VBtn } from 'vuetify/components'

const theme = {
  dark: true,
}

export default createVuetify({
  theme: {
    defaultTheme: 'theme',
    themes: {
      theme,
    },
  },
  aliases: {
    VBtnSecondary: VBtn,
  },
  defaults: {
    VBtn: {
      color: 'primary',
      variant: 'flat',
    },
    VBtnSecondary: {
      color: 'secondary',
      variant: 'tonal',
    },
    VTextField: {
      color: 'primary',
      variant: 'outlined',
    },
    VFileInput: {
      color: 'primary',
      variant: 'outlined',
    },
    VSelect: {
      color: 'primary',
      variant: 'outlined',
    },
    VTextarea: {
      color: 'primary',
      variant: 'outlined',
    },
    VCheckbox: {
      color: 'primary',
    },
  },
  components,
  directives,
})
