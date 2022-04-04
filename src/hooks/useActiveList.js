
import { ref, reactive, watch, computed } from 'vue'

export default (props, context, endEvent, toggle, only, initValue, callback) => {
  let current = ref(initValue)

  const state = reactive({ activeList: [], clickedList: [] })

  if (initValue !== undefined) {
    state.activeList.push(initValue)
    state.clickedList.push(initValue)
  }

  function isActive(ind) {
    return state.activeList.indexOf(ind) !== -1
  }

  function isClicked(ind) {
    return state.clickedList.indexOf(ind) !== -1
  }

  function activate(ind) {
    current.value = ind
    if (typeof callback === 'function') callback(ind)
    if (isActive(ind)) {
      if (toggle) state.activeList = state.activeList.filter(i => i !== ind)
    } else {
      if (only) state.activeList = []
      state.activeList.push(ind)
    }

    if (!isClicked(ind)) state.clickedList.push(ind)
  }

  const allClicked = computed(() => {
    return state.clickedList.length === props.data.items.length
  })

  watch(allClicked, (currentValue) => {
    if (currentValue) {
      context.emit(endEvent)
    }
  })

  return {
    current,
    isActive,
    allClicked,
    activate
  }
}