<template>
	<div class="slide-layout">
		<component
			v-if="currentSlide"
			:is="currentSlide.type"
			:key="slidesStore.currentBlockId + '-' + slidesStore.currentSlideId"
			:data="currentSlide.data"
			@end="end"
		/>
		<div
			class="animtext-wrapper"
			:class="{ hide: !getAnimText }"
			:style="getAnimText?.dimentions"
			v-html="getAnimText?.content"
		></div>
	</div>
</template>

<script>
import { useSlidesStore } from "../../store/useSlidesStore.js"

export default {
	setup() {
		const slidesStore = useSlidesStore()

		return { slidesStore }
	},
	computed: {
		currentSlide() {
			return this.slidesStore.getCurrentSlide
		},
		getAnimText() {
			return this.slidesStore.getCurrentSlide?.animtext || null
		},
	},
	watch: {
		currentSlide: {
			immediate: true,
			handler(newVal) {
				if (newVal) {
					this.slidesStore.setInstruction(newVal.insruction)
				}
			}
		}
	},
	methods: {
		end() {
			this.slidesStore.setInstruction(this.$t("clickNext"))
		},
	},
}
</script>

<style scoped>
.animtext-wrapper {
	position: absolute;
	border-radius: 1rem;
	min-width: 73.506rem;
	padding: 5.182rem 5.631rem 5.156rem 5.831rem;
	background: #fff;
	transition: 0.7s ease-out;
	z-index: 10000;
	box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
	overflow: hidden;
}
.animtext-wrapper.hide {
	opacity: 0;
	z-index: -10000;
}
</style>