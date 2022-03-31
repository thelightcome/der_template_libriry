<template>
	<div class="test-layout">
		<div
			v-if="isEnd && !ended"
			class="test-result"
			v-html="$t('testEndText')(getTestsLength, getCorrectCount)"
		></div>
		<div class="test-layout-inner">
			<div class="indexing" v-html="$t('testTitleText')(slidesStore.currentSlideId, getTestsLength)"></div>
			<component
				:is="slidesStore.getCurrentSlide?.type"
				:key="slidesStore.currentSlideId"
				:data="slidesStore.getCurrentSlide"
				:end="questions[slidesStore.currentSlideId]"
				@submit="submit"
			></component>
		</div>
	</div>
</template>

<script>
import { useSlidesStore } from "../../store/useSlidesStore.js"

export default {
	data() {
		return {
			questions: {},
			ended: false
		}
	},
	setup() {
		const slidesStore = useSlidesStore()

		return { slidesStore }
	},
	computed: {
		currentSlide() {
			return this.slidesStore.getCurrentSlide
		},
		getTestsLength() {
			if (!this.slidesStore.currentBlockId) return 0

			return this.slidesStore.getBlockSlidesLength(this.slidesStore.currentBlockId)
		},
		getCorrectCount() {
			return Object.values(this.questions).filter((elem) => elem.total === true)
				.length
		},
		isEnd() {
			return Object.keys(this.questions).length === this.getTestsLength && this.getTestsLength !== 0
		},
	},
	watch: {
		isEnd(newVal) {
			if (newVal) {
				try {
					this.$tincan.end(this.getCorrectCount, this.getTestsLength)
				} catch (e) {
					console.log(e)
				}
			}
		},
		currentSlide: {
			immediate: true,
			handler() {
				if (this.isEnd) this.ended = true
				if (this.currentSlide)
					this.slidesStore.setInstruction(this.currentSlide.instruction || "")
			},
		},
	},
	methods: {
		submit(val) {
			if (this.questions[this.slidesStore.currentSlideId]) return
			this.questions[this.slidesStore.currentSlideId] = val

			if (val.total === true) this.$systemAudio("correct")
			else this.$systemAudio("uncorrect")

			let resultText = val.total ? this.slidesStore.getCurrentSlide.correct : this.slidesStore.getCurrentSlide.incorrect

			let msg = `${resultText} ${this.$t("clickNext")}`
			this.slidesStore.setInstruction(msg)
		},
	},
}
</script>

<style scoped>
.test-layout {
	font-style: normal;
	font-weight: normal;
	color: #000000;
	font-size: 2.6rem;
	line-height: 1.5;
}
.test-result {
	width: 100%;
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}
.test-layout-inner {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	padding: 3rem 12rem;
	box-sizing: border-box;
}
.indexing {
	text-align: center;
	margin-bottom: 2rem;
}
</style>