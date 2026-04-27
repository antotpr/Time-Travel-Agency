// Loads all images from src/assets/ dynamically — no build error if files are absent.
const modules = import.meta.glob(
  '../assets/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true }
)

// Build a map: destId → sorted array of { key, filename, url }
const destImages = {}
for (const [key, mod] of Object.entries(modules)) {
  const parts = key.split('/')
  const filename = parts[parts.length - 1]
  const folder   = parts[parts.length - 2] // 'egypt' | 'rome' | 'japan'
  if (!destImages[folder]) destImages[folder] = []
  destImages[folder].push({ key, filename, url: mod.default })
}
// Sort each folder alphabetically so index-based fallback is deterministic
for (const folder of Object.keys(destImages)) {
  destImages[folder].sort((a, b) =>
    a.key.localeCompare(b.key, undefined, { sensitivity: 'base', numeric: true })
  )
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Find the first image whose filename contains a given keyword (case-insensitive). */
function findByKeyword(imgs, keyword) {
  return imgs.find(({ filename }) =>
    filename.toLowerCase().includes(keyword.toLowerCase())
  )?.url ?? null
}

// Index fallback: sorted alphabetically → card=0, detail=1, hero=2
const VARIANT_INDEX = { card: 0, detail: 1, hero: 2 }

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Returns the resolved URL for a destination image, or null if absent.
 *
 * Resolution order:
 *   1. Filename contains the variant keyword  (e.g. "card", "detail", "hero")
 *      → works for "egypt-card.png", "Egypt Card.png", "card_egypt.webp", etc.
 *   2. Index-based fallback on sorted filenames (card=0, detail=1, hero=2)
 *      → handles any arbitrary filenames like "Égypte 1 copie 3.png"
 *
 * @param {string} id       - destination id: "egypt" | "rome" | "japan"
 * @param {'card'|'detail'|'hero'} variant
 * @returns {string|null}
 */
export function getImage(id, variant = 'card') {
  const imgs = destImages[id] || []
  if (!imgs.length) return null

  // 1. Keyword match in filename
  const hit = findByKeyword(imgs, variant)
  if (hit) return hit

  // 2. Index fallback
  const idx = VARIANT_INDEX[variant] ?? 0
  return imgs[idx]?.url ?? imgs[0]?.url ?? null
}

/**
 * Returns all images for a destination, keyed by variant + full gallery array.
 *
 * @param {string} id
 * @returns {{ cardImage: string|null, detailImage: string|null, heroImage: string|null, galleryImages: string[] }}
 */
export function getDestinationImages(id) {
  return {
    cardImage:    getImage(id, 'card'),
    detailImage:  getImage(id, 'detail'),
    heroImage:    getImage(id, 'hero'),
    galleryImages: getGalleryImages(id),
  }
}

/**
 * Returns all available images for a destination (for gallery display).
 * @param {string} id
 * @returns {string[]}
 */
export function getGalleryImages(id) {
  return (destImages[id] || []).map(({ url }) => url)
}
