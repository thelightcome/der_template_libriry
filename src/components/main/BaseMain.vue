<template>
	<main class="main" :style="{ ...getBgImage }">
		<component class="main-in" :is="slidesStore.getCurrentBlock.blockType" />
	</main>
</template>

<script>
import { useSlidesStore } from "../../store/useSlidesStore.js"

export default {
	setup() {
		const slidesStore = useSlidesStore()

		return { slidesStore }
	},
	computed: {
		getBgImage() {
			let imageName = this.slidesStore.getCurrentSlide?.slideBgImage || this.slidesStore.getCurrentBlock.blockBgImage
			let backgroundImage = !imageName
				? "unset"
				: `url('${imageName}')`
			return {
				backgroundImage: backgroundImage,
			}
		},
	},
}
</script>

<style scoped>
.main {
	position: relative;
	flex-grow: 1;
	overflow: hidden;
	z-index: 5;
	background-size: cover;
	background-position: center;
	display: flex;
	align-items: stretch;
}
.main-in {
	flex-grow: 1;
}
</style>
