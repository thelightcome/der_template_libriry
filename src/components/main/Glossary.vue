<template>
	<div class="menu-wrapper" @click.stop>
		<div class="letters-container">
			<div
				class="letters"
				v-for="char in glossaryStore.chars"
				:key="char"
				:class="{
					active: char === currentChar,
					disabled: glossaryStore.getGlossaryText(char).length === 0,
				}"
				@click="currentChar = char"
				v-html="char.toUpperCase()"
			></div>
		</div>
		<div class="glossary-container">
			<div v-if="!currentChar" class="glossary-container-choose">
				<span v-html="$t('chooseLetter')"></span>
			</div>
			<div
				class="glossary-row"
				v-else
				v-for="(glossaryText, index) in glossaryStore.getGlossaryText(currentChar)"
				:key="index"
			>
				<span class="glossary-row-title" v-html="glossaryText.title"></span>
				<span class="glossary-row-text" v-html="glossaryText.text"></span>
			</div>
		</div>
	</div>
</template>

<script>
import { useGlossaryStore } from "../../store/useGlossaryStore.js"

export default {
	data() {
		return {
			currentChar: "",
		}
	},
	setup() {
		const glossaryStore = useGlossaryStore()

		return { glossaryStore }
	},
}
</script>

<style scoped>
.menu-wrapper {
	padding-top: 3rem;
	width: 58.4rem;
}
.letters-container {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
}
.letters {
	width: 4rem;
	height: 4rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background: radial-gradient(50% 50% at 50% 50%, #e2ebee 55.73%, #d8e2e7 100%);
	border-radius: 0.4rem;
	margin-right: 1rem;
	color: rgba(0, 0, 0, 0.4);
	cursor: pointer;
	font-weight: bold;
	margin-bottom: 1.9rem;
	font-size: 2rem;
	line-height: 1;
}
.letters.active {
	background: #0066ba;
	color: white;
}
.letters.disabled {
	color: rgba(188, 189, 192, 0.7);
	cursor: not-allowed;
	pointer-events: none;
}
.glossary-container {
	margin-top: 4.5rem;
	padding-right: 3rem;
	font-size: 2.3rem;
	line-height: 1.5;
	font-style: normal;
}
.glossary-container-choose span {
	display: flex;
	justify-content: center;
	color: rgba(0, 0, 0, 0.9);
}
.glossary-row {
	display: flex;
	flex-direction: column;
}
.glossary-row-title {
	font-weight: 500;
	color: #0066ba;
}
.glossary-row-text {
	font-weight: 500;
	font-size: 1.9rem;
	margin-top: 0.2rem;
	margin-bottom: 2.6rem;
	white-space: pre-line;
	color: black;
}
</style>
