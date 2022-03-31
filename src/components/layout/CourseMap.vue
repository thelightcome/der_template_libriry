<template>
	<div class="course-map">
		<template v-for="block of slidesStore.blocks" :key="block.blockId">
			<div
				v-if="block.blockType !== 'CourseMap'"
				class="course"
				@click="setCurrentBlock(block.blockId)"
			>
				<img v-if="block.blockImage" :src="block.blockImage" />
				<span v-html="block.blockTitle"></span>
			</div>
		</template>
	</div>
</template>

<script>
import { useSlidesStore } from "../../store/useSlidesStore.js"

export default {
	setup() {
		const slidesStore = useSlidesStore()

		return { slidesStore }
	},
	methods: {
		setCurrentBlock(id) {
			this.slidesStore.setCurrentBlockId(id)
			this.slidesStore.setCurrentSlideId(1)
		},
	},
	mounted() {
		this.slidesStore.setInstruction(this.$t("chooseBlock"))
	},
}
</script>

<style scoped>
.course-map {
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	display: flex;
	align-content: center;
	align-items: stretch;
	justify-content: center;
	flex-wrap: wrap;
	box-sizing: border-box;
	padding: 5rem 6rem;
}
.course {
	text-decoration: none;
	width: 30rem;
	min-height: 25rem;
	box-sizing: border-box;
	padding-top: 2.5rem;
	padding-bottom: 2rem;
	margin: 3rem 5rem;
	background: #ffffff;
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	cursor: pointer;
}
.course img {
	margin-bottom: 2.1rem;
	width: 10rem;
	height: 10rem;
}
.course span {
	font-size: 2rem;
	line-height: 1.2;
	text-align: center;
	bottom: 0;
	display: flex;
	justify-content: center;
	padding: 0rem 3.2rem;
	align-items: center;
}
</style>
