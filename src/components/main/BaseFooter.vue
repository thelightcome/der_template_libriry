<template>
	<footer class="footer">
		<AudioControl class="footer-audio" />
		<VolumeControl />
		<div class="footer-information">
			<span class="footer-information-text" v-html="slidesStore.instruction"></span>
		</div>
		<FooterControls v-if="slidesStore.currentBlockId !== 0" />
	</footer>
</template>

<script>
import { useSlidesStore } from "../../store/useSlidesStore.js"

export default {
	setup() {
		const slidesStore = useSlidesStore()

		return { slidesStore }
	},
}
</script>

<style scoped>
.footer {
	position: relative;
	z-index: 10;
	width: 100%;
	height: 4.5rem;
	max-height: 4.5rem;
	min-height: 4.5rem;
	box-sizing: border-box;
	padding-right: 2.5rem;
	background-color: #0066ba;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.footer-audio {
	position: absolute;
	bottom: 100%;
	left: 0;
	width: 100%;
}
.footer-information {
	flex-grow: 1;
	font-style: normal;
	font-size: 2.6rem;
	color: #ffffff;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.footer-information-text {
	align-items: center;
	justify-content: flex-end;
	vertical-align: text-top;
	padding-bottom: 0.5rem;
}
</style>
