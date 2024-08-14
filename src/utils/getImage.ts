export function getImage(name: String) {
    return new URL(`../assets/${name}`, import.meta.url).href
}