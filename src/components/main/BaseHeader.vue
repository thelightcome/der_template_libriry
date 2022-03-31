<template>
	<header class="base-header">
		<div
			class="base-header-title"
			:key="getTitle"
			ref="title"
			v-f-size="{ factor: 0.42, max: 44, min: 28 }"
			v-html="getTitle"
		></div>
		<div class="base-header-line"></div>
		<div class="base-header-subtitle" :key="getSubtitle">
			<CharPrinter :text="getSubtitle" />
		</div>
	</header>
</template>

<script>
import { useSlidesStore } from "../../store/useSlidesStore.js"

export default {
	setup() {
		const slidesStore = useSlidesStore()

		return { slidesStore }
	},
	computed: {
		getTitle() {
			return this.slidesStore.getCurrentBlock.blockTitle
		},
		getSubtitle() {
			return this.slidesStore.getCurrentSlide ?
				`${this.slidesStore.getCurrentBlock.blockId}.${this.slidesStore.getCurrentSlide.slideId}. ${this.slidesStore.getCurrentSlide.slideTitle}`
				: ""
		},
	},
}

</script>

<style scoped>
.base-header {
	position: relative;
	z-index: 10;
	width: 100%;
	height: 11.5rem;
	max-height: 11.5rem;
	min-height: 11.5rem;
	box-sizing: border-box;
	padding: 0 4.7rem;
}

.base-header-title {
	height: 6.5rem;
	display: flex;
	align-items: center;
	font-style: normal;
	font-weight: bold;
	font-size: 4.4rem;
	line-height: 1.5;
	color: #0066ba;
}

.base-header-line {
	border: 0.2rem solid #e9ebec;
}

.base-header-subtitle {
	height: 3.9rem;
	display: flex;
	align-items: center;
	font-style: normal;
	font-weight: normal;
	font-size: 2.6rem;
	line-height: 1.5;
	letter-spacing: 0.02em;
	color: #000000;
}
</style>
