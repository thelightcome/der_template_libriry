
import { reactive, watch, computed } from 'vue'

export default (props, context, eventName, toggle) => {
  const state = reactive({ activeList: [], clickedList: [] })

  function isActive(ind) {
    return state.activeList.indexOf(ind) !== -1
  }

  function isClicked(ind) {
    return state.clickedList.indexOf(ind) !== -1
  }

  function activate(ind) {
    if (isActive(ind)) {
      if (toggle) state.activeList = state.activeList.filter(i => i !== ind)
    } else {
      state.activeList.push(ind)
    }

    if (!isClicked(ind)) state.clickedList.push(ind)
  }

  const allClicked = computed(() => {
    return state.clickedList.length === props.data.items.length
  })

  watch(allClicked, (currentValue) => {
    if (currentValue) {
      context.emit(eventName)
    }
  })

  return {
    isActive,
    allClicked,
    activate
  }
}