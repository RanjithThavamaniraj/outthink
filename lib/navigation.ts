export function openCategories() {
  window.dispatchEvent(new CustomEvent("outthink:open-categories"));
}
