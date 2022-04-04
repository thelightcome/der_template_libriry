<template>
	<div class="wrapper">
		<div class="tab">
			<div class="headers">
				<div
					class="header"
					v-for="(item, itemInd) in data.items"
					:key="itemInd"
					v-html="item.title"
					:class="{ active: isActive(itemInd) }"
					@click="activate(itemInd)"
				></div>
			</div>
			<div class="content" :key="current" v-html="data.items[current].content"></div>
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
	background-color: rgb(174, 240, 220);
}
.tab {
	width: 81.444rem;
	margin-right: 10.554rem;
}
.headers {
	display: flex;
	align-items: stretch;
}
.header {
	position: relative;
	flex-grow: 1;
	padding-bottom: 2.655rem;
	cursor: pointer;
	font-size: 2.6rem;
	font-weight: bold;
	line-height: 1.5;
	color: #c2c2c2;
	text-align: center;
	transition: 0.3s linear;
}
.header.active {
	color: #0066ba;
}
.header:after {
	content: "";
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	transform: translateY(-50%);
	height: 0.4rem;
	background-color: #e3e3e3;
	border-radius: 0.2rem;
	transition: 0.3s linear;
}
.header.active:after {
	background-color: #0066ba;
	height: 0.8rem;
	border-radius: 0.4rem;
}
.content {
	font-size: 2.6rem;
	line-height: 1.5;
	margin-top: 2.955rem;
}
.content {
	transform: translate(0px, 30px);
	opacity: 0;
	animation: slideTop 0.5s linear forwards;
}
@keyframes slideTop {
	0% {
		opacity: 0;
		transform: translate(0px, 30px);
	}
	100% {
		opacity: 1;
		transform: translate(0px, 0px);
	}
}
</style>