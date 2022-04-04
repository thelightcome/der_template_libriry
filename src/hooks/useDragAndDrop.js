
import { reactive, computed } from 'vue'

export default (dropClass, drags, drops, limit = false) => {
  const dropPlace = drops.reduce((obj, el) => {
    obj[el.type] = []
    return obj
  }, {})

  const dragItems = [...drags].sort(() => Math.random() - 0.5)

  const container = reactive({
    drops: dropPlace,
    drags: dragItems
  })

  function dragstart(event) {
    const dragParent = event.target.closest(dropClass)
    if (dragParent) event.dataTransfer.setData("dragParentId", dragParent.id)
    event.dataTransfer.setData("dragId", event.target.id)
  }

  function dragover(event) {
    event.preventDefault()
  }

  const dropElems = container.drops
  const dragElems = container.drags

  function dropped(event) {
    event.preventDefault()
    const dropPlace = event.target.closest(dropClass)
    if (!dropPlace) return
    const dropId = dropPlace.id
    const dragId = event.dataTransfer.getData("dragId")
    const dragParentId = event.dataTransfer.getData("dragParentId")

    const drag = dragElems.find(e => e.id === +dragId)

    if (limit) {
      if (dragParentId) dropElems[dragParentId] = dropElems[dropId]
      dropElems[dropId] = []
    } else if (dragParentId) {
      dropElems[dragParentId] = dropElems[dragParentId].filter((el) => {
        return el.id !== +dragId
      })
    }

    dropElems[dropId].push(drag)
  }

  function isDropped(id) {
    return !Object.values(dropElems).some((drop) => {
      return drop.find(e => e.id === id)
    })
  }

  const allDropped = computed(() => {
    const dropElemsCount = Object.values(dropElems).reduce((acc, el) => {
      return acc + el.length
    }, 0)
    return dropElemsCount === dragElems.length
  })

  return {
    allDropped,
    container,
    dragstart,
    dragover,
    dropped,
    isDropped
  }
}