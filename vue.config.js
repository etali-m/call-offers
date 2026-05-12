const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    client: {
      overlay: {
        // Masque les warnings non critiques au chargement
        warnings: false,
        runtimeErrors: (error) => {
          // Erreur bénigne déclenchée par TipTap Table (ResizeObserver)
          // pendant le redimensionnement/suppression de tableau — ignorée en dev
          if (error?.message?.includes('ResizeObserver loop')) {
            return false
          }
          return true
        },
      },
    },
  },
})