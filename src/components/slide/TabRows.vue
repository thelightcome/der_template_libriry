<template>
	<div class="wrapper">
		<div class="tab">
			<div class="headers">
				<div
					class="header"
					v-for="(item, itemInd) in data.items"
					:key="itemInd"
					:class="{ active: isActive(itemInd) }"
					@click="activate(itemInd)"
					v-html="item.title"
				></div>
			</div>
			<div class="content" v-html="data.items[current].content"></div>
		</div>
	</div>
</template>

<script>
import useActiveList from "../../hooks/useActiveList.js"

export default {
	props: ["data"],
	emits: ["end"],
	setup(props, context) {
		const { current, isActive, allClicked, activate } = useActiveList(props, context, "end", false, true, 0)

		return { current, isActive, allClicked, activate }
	},
}
</script>

<style scoped>
.wrapper {
	background-color: rgb(243, 185, 164);
}
.tab {
	display: flex;
	padding: 1.5rem;
	margin-right: 3rem;
	border-radius: 1rem;
	background: #fff;
}
.headers {
	display: flex;
	flex-direction: column;
	align-items: stretch;
}
.header {
	flex-grow: 1;
	width: 74rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 2.4rem;
	line-height: 1;
	text-align: left;
	padding: 2rem;
	cursor: pointer;
	transition: background 0.3s linear;
}
.header:first-child {
	border-top-left-radius: 1rem;
}
.header:last-child {
	border-bottom-left-radius: 1rem;
}
.header.active {
	background: #f5fbff;
	font-weight: bold;
	box-shadow: inset 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.content {
	box-sizing: border-box;
	width: 65.8rem;
	height: 46rem;
	padding: 2.6rem 4rem;
	border-top-right-radius: 1rem;
	border-bottom-right-radius: 1rem;
	background: #f5fbff;
	font-size: 2.4rem;
	line-height: 1.3;
}
</style>