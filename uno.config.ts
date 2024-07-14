// uno.config.ts
import { defineConfig, presetUno, presetAttributify, presetIcons, presetWind } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetWind(),
  ],
  safelist: ['grid-cols-5'],
  content: {
    pipeline: {
      include: [
        './src/**/*.{js,jsx,ts,tsx}', 
      ],
    },
  },
});
