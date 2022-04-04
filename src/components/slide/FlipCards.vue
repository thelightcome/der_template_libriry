<template>
	<div class="wrapper">
		<div class="body">
			<div class="items">
				<div
					class="item"
					v-for="(item, itemInd) in data.items"
					:key="itemInd"
					:class="{ active: isActive(itemInd) }"
					@click="activate(itemInd)"
				>
					<div class="front" v-html="item.front"></div>
					<div class="back" v-html="item.back"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import useActiveList from "../../hooks/useActiveList.js"

export default {
	props: ["data"],
	emits: ["end"],
	setup(props, context) {
		const { isActive, allClicked, activate } = useActiveList(props, context, "end", false, false)

		return { isActive, allClicked, activate }
	},
}
</script>

<style scoped>
.wrapper {
	flex-direction: column;
	justify-content: flex-start;
	padding: 11.352rem 11.352rem;
	perspective: 1000px;
	background-color: rgb(126, 209, 230);
}
.body {
	width: 100%;
	display: flex;
	flex-grow: 1;
}
.items {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-content: space-between;
	flex-wrap: wrap;
}
.item {
	width: 45%;
	height: 45%;
	border-radius: 1rem;
	box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.25);
	background: #fbfdfd;
	transform: rotateX(0deg);
	transform-origin: center center;
	transform-style: preserve-3d;
	transition: 0.5s linear;
}
.item.active {
	box-shadow: 3px -3px 3px 0px rgba(0, 0, 0, 0.25);
	transform: rotateX(180deg);
}
.item > div {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	backface-visibility: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}
.front {
	transform: rotateX(0deg);
	font-size: 2.6rem;
	font-weight: bold;
	cursor: pointer;
}
.back {
	transform: rotateX(180deg);
	font-size: 2.2rem;
	font-weight: bold;
	line-height: 1.5;
}
</style>