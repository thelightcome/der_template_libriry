<template>
	<div class="wrapper drag-drop-wrapper">
		<div class="drops-wrapper">
			<div class="drop-wrapper" v-for="drop in data.drops" :key="drop.type">
				<div class="drop-title" v-html="drop.title"></div>
				<div class="dnd-drop drop" :id="drop.type" @drop="dropped" @dragover="dragover">
					<div
						v-for="drag in container.drops[drop.type]"
						:key="drag.type"
						class="dnd-drag"
						:id="drag.id"
						v-html="drag.text"
						:draggable="true"
						@dragstart="dragstart"
					></div>
				</div>
			</div>
		</div>
		<div class="drags-wrapper">
			<template v-for="drag in container.drags" :key="drag.type">
				<div
					class="dnd-drag"
					v-if="isDropped(drag.id)"
					:id="drag.id"
					v-html="drag.text"
					:draggable="true"
					@dragstart="dragstart"
				></div>
			</template>
		</div>
	</div>
</template>

<script>
import useDragAndDrop from "../../hooks/useDragAndDrop.js"

export default {
	props: ["data"],
	emits: ["end"],
	setup(props) {
		const { allDropped, container, dragstart, dragover, dropped, isDropped } = useDragAndDrop(".dnd-drop", props.data.drags, props.data.drops, true)
		return { allDropped, container, dragstart, dragover, dropped, isDropped }
	},
}
</script>

<style scoped>
.drag-drop-wrapper {
	box-sizing: border-box;
	padding: 5rem 10rem;
	align-items: stretch;
	background-color: #aedfff;
}
.drops-wrapper {
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
}
.drop-wrapper {
	display: flex;
	justify-content: space-between;
}
.drop-title {
	position: relative;
	width: 37rem;
	height: 16.6rem;
	background: #fff;
	box-sizing: border-box;
	padding: 3.9rem 1.5rem;
	border-radius: 1rem;
	font-size: 2.8rem;
	font-weight: bold;
	line-height: 1;
	text-align: right;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0px 4.86px 4.86px 0px rgba(0, 0, 0, 0.25);
	margin-right: 1rem;
}
.drop-title:after {
	content: "";
	position: absolute;
	top: 50%;
	left: 100%;
	transform: translateY(-50%);
	height: 4rem;
	width: 0.5rem;
	background: #ffef5a;
	z-index: 1;
}
.drop {
	position: relative;
	width: 37rem;
	height: 17rem;
	box-sizing: border-box;
	border: 0.2rem dashed #0066ba;
	border-radius: 1rem;
}
.drags-wrapper {
	border: 0.2rem dashed #0066ba;
	border-radius: 1rem;
	padding: 1.8rem 1.2rem;
	box-sizing: border-box;
	width: 40rem;
	min-height: 55.4rem;
	min-width: 40rem;
	margin-left: 8rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;
}
.dnd-drag {
	position: relative;
	min-width: 36.6rem;
	width: 36.6rem;
	min-height: 16.6rem;
	box-sizing: border-box;
	padding: 3.3rem 2rem;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: left;
	cursor: pointer;
	border-radius: 1rem;
	box-shadow: 0px 4.86px 4.86px 0px rgba(0, 0, 0, 0.25);
	font-size: 2.6rem;
	font-weight: bold;
	line-height: 1;
}
.dnd-drag:after {
	content: "";
	position: absolute;
	top: 50%;
	right: 100%;
	transform: translateY(-50%);
	width: 0.5rem;
	height: 4rem;
	background: #ffef5a;
	z-index: 1;
}
</style>