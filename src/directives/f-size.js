export default (el, binding) => {
  const width = parseFloat(getComputedStyle(el).width)

  const factor = binding.value?.factor || 0.42  // font width / font height
  const max = binding.value?.max || 44 // max font width
  const min = binding.value?.min || 28 // min font width

  const text = el.innerText

  const maxCount = width / (max * factor)

  if (text.length > maxCount) el.style.fontSize = `${Math.max(min, maxCount / text.length * max)}px`
  else el.style.fontSize = `${max}px`
}