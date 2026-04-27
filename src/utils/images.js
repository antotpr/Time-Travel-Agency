// Dynamically import all images from src/assets/ without build errors if files are missing.
// import.meta.glob returns an empty object for files that don't exist — safe fallback.
const modules = import.meta.glob('../assets/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true })

/**
 * Returns the resolved image URL for a given filename (e.g. "egypt.jpg"),
 * or null if the file does not exist in src/assets/.
 */
export function getImage(filename) {
  const key = `../assets/${filename}`
  return modules[key]?.default ?? null
}
