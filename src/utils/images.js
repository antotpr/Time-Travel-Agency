// Charge dynamiquement toutes les images depuis src/assets/ et ses sous-dossiers.
// import.meta.glob ne lève jamais d'erreur si un fichier est absent — fallback null garanti.
const modules = import.meta.glob(
  '../assets/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true }
)

/**
 * Retourne l'URL résolue d'une image de destination, ou null si absente.
 *
 * Ordre de recherche :
 *   1. src/assets/{id}/{id}-{variant}.jpeg   (structure recommandée)
 *   2. src/assets/{id}/{id}-{variant}.jpg
 *   3. src/assets/{id}/{id}-{variant}.png
 *   4. src/assets/{id}.jpg                   (ancienne structure plate)
 *
 * @param {string} id      - identifiant de destination : "egypt" | "rome" | "japan"
 * @param {'card'|'hero'|'detail'} variant - type d'image
 */
export function getImage(id, variant = 'card') {
  const exts = ['jpeg', 'jpg', 'png', 'webp']

  // 1. Sous-dossier avec variante
  for (const ext of exts) {
    const key = `../assets/${id}/${id}-${variant}.${ext}`
    if (modules[key]) return modules[key].default
  }

  // 2. Sous-dossier sans variante (image unique dans le dossier)
  for (const ext of exts) {
    const key = `../assets/${id}/${id}.${ext}`
    if (modules[key]) return modules[key].default
  }

  // 3. Structure plate historique (fallback legacy)
  for (const ext of exts) {
    const key = `../assets/${id}.${ext}`
    if (modules[key]) return modules[key].default
  }

  return null
}

/**
 * Retourne toutes les images disponibles pour une destination (pour galerie).
 * @param {string} id
 * @returns {string[]} tableau d'URLs (peut être vide)
 */
export function getGalleryImages(id) {
  return ['hero', 'card', 'detail']
    .map((v) => getImage(id, v))
    .filter(Boolean)
}
