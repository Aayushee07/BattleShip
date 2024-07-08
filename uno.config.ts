import { defineConfig, presetUno, presetAttributify, presetIcons, presetWind } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetWind(), 
  ],
})
