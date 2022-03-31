<template>
	<div class="menu-wrapper">
		<template v-for="block of slidesStore.blocks">
			<div :key="block.blockId" v-if="block.blockType !== 'CourseMap'" class="menu-list">
				<div
					class="block"
					@click="openSlide(block.blockId, 1)"
					v-html="block.blockId + '. ' + block.blockTitle"
				></div>
				<ul v-if="block.blockType === 'SlideLayout' || block.blockType === 'TestLayout'">
					<li
						class="slide"
						v-for="slide of block.blockSlides"
						:key="slide.slideId"
						:class="{
							[slide.level || 'default']: true,
							active: isActive(block.blockId, slide.slideId),
							visited: isVisited(block.blockId, slide.slideId),
						}"
						@click="openSlide(block.blockId, slide.slideId)"
						:title="slide.level"
						v-html="block.blockId + '.' + slide.slideId + ' ' + slide.slideTitle"
					></li>
				</ul>
			</div>
		</template>
	</div>
</template>

<script>
import { useSlidesStore } from "../../store/useSlidesStore.js"

export default {
	emits: ["close"],
	data() {
		return {
			visited: {},
		}
	},
	setup() {
		const slidesStore = useSlidesStore()

		return { slidesStore }
	},
	computed: {
		slideId() {
			return this.slidesStore.currentSlideId
		},
		isActive() {
			return (blockId, slideId) => {
				return (
					blockId == this.slidesStore.currentBlockId &&
					slideId == this.slideId
				)
			}
		},
		isVisited() {
			return (blockId, slideId) => {
				return this.visited[`${blockId}-${slideId}`]
			}
		},
	},
	watch: {
		slideId: {
			immediate: true,
			handler(newVal) {
				if (this.slidesStore.currentBlockId > 0)
					this.visited[`${this.slidesStore.currentBlockId}-${newVal}`] = true
			},
		},
	},
	methods: {
		openSlide(blockId, slideId) {
			this.$emit("close")
			this.slidesStore.setCurrentBlockId(blockId)
			this.slidesStore.setCurrentSlideId(slideId)
		},
	},
	beforeMount() {
		this.visited = {}
	},
}
</script>

<style scoped>
.menu-wrapper {
	max-height: 750px;
	width: 35rem;
	color: #000;
	font-style: normal;
	font-weight: 400;
	font-size: 1.7rem;
	line-height: 1.2;
	cursor: pointer;
}
.menu-list {
	margin-bottom: 2rem;
}
.block {
	margin-bottom: 2rem;
}
.slide {
	position: relative;
	display: block;
	list-style-type: none;
	margin-block-start: 0;
	margin-block-end: 0.3vw;
	margin-inline-start: 0px;
	margin-inline-end: 0px;
	padding-inline-start: 0vw;
	margin-bottom: 0.5rem;
}
.slide.visited {
	color: #767676;
}
.slide.active {
	color: green;
}
.slide:before {
	content: "";
	position: absolute;
	top: 50%;
	left: -2rem;
	width: 1rem;
	height: 1rem;
	border-radius: 50%;
	transform: translateY(-50%);
}
.slide.default:before {
	background-color: rgb(94, 94, 94);
}
.slide.low:before {
	background-color: rgb(30, 110, 50);
}
.slide.medium:before {
	background-color: rgb(189, 247, 30);
}
.slide.hard:before {
	background-color: rgb(245, 40, 40);
}
</style>
