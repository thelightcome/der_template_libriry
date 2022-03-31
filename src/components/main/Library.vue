<template>
	<div class="menu-wrapper">
		<div class="library-row" v-for="(pdf, ind) in libraryStore.library" :key="ind">
			<span v-html="pdf.name"></span>
			<a class="library-row-button" :href="'./pdf/' + pdf.path" download v-html="$t('download')"></a>
		</div>
	</div>
</template>

<script>
import { useLibraryStore } from "../../store/useLibraryStore.js"

export default {
	setup() {
		const libraryStore = useLibraryStore()

		return { libraryStore }
	},
}
</script>

<style scoped>
.menu-wrapper {
	width: 55.4rem;
	min-height: 15rem;
}
.library-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 40px;
	padding-left: 10px;
	padding-right: 17px;
}
.library-row span {
	font-style: normal;
	font-weight: normal;
	font-size: 21px;
	margin-right: 35px;
	line-height: 150%;
	color: #000000;
}
.library-row-button {
	text-decoration: none;
	font-style: normal;
	font-weight: normal;
	font-size: 15px;
	line-height: 100%;
	color: #0066ba;
	border: 1px solid #0066ba;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 8px 20px;
	height: 18px;
	white-space: nowrap;
}
.library-row-button:hover {
	color: white;
	background-color: #0066ba;
}
</style>
