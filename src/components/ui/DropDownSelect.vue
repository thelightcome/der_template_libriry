<template>
	<div class="select" :class="type || ''" :id="'id-' + id" :style="style">
		<div class="selected" @click="click">{{ value || placeholder }}</div>
		<transition name="fade">
			<div class="option-wrap" v-if="focus">
				<div
					class="options"
					v-for="(elem, index) of options"
					:key="index"
					@click="changeValue(elem)"
					v-html="elem"
				></div>
			</div>
		</transition>
		<span class="caret" :class="{ active: focus }"></span>
	</div>
</template>

<script>
export default {
	emits: ["change"],
	data() {
		return {
			val: "",
			focus: false,
		}
	},
	props: {
		value: null,
		type: String,
		options: Array,
		placeholder: null,
		id: [String, Number],
		style: Object,
		disabled: Boolean,
	},
	methods: {
		click() {
			if (this.disabled) return
			this.focus = true
		},
		changeValue(elem) {
			this.focus = false
			let $this = this
			this.$emit("change", {
				id: $this.id,
				value: elem,
			})
		},
	},
	mounted() {
		document.addEventListener("click", (e) => {
			let target = e.target.closest("#id-" + this.id + ".select")
			if (!target || target.id !== "id-" + this.id) {
				this.focus = false
			}
		})
	},
}
</script>

<style scoped>
.select {
	position: relative;
	display: inline-block;
	min-width: 200px;
	height: 38px;
	line-height: 38px;
	border: 1px solid #c4c4c4;
	cursor: pointer;
	margin: 0 1rem;
}
.select.string {
	display: inline;
}
.selected {
	position: relative;
	display: inline;
	box-sizing: border-box;
	padding: 0 35px 0 15px;
	line-height: 38px;
	font-size: inherit;
	text-align: left;
	overflow: hidden;
}
.string .selected {
	line-height: 25px;
	vertical-align: text-top;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
.option-wrap {
	position: absolute;
	left: 0;
	top: 100%;
	border: 1px solid #020202;
	padding: 8px 12px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	min-width: 350px;
	max-height: 400px;
	overflow: auto;
	vertical-align: middle;
	background: #fff;
	z-index: 15;
}
.options {
	padding: 10px;
	text-align: left;
	vertical-align: middle;
	font-size: 0.8em;
	line-height: 1.2;
	transition: 0.3s;
}
.options:nth-child(2n) {
	background: #ddd6d6;
}
.options:nth-child(2n):hover,
.options:hover {
	background: lightblue;
}
.caret {
	position: absolute;
	right: 15px;
	bottom: 5px;
	transform: translateY(-50%);
	border: 5px solid transparent;
	border-top: 5px solid #020202;
	transition: 0.3s;
}
.caret.active {
	border-top: 5px solid transparent;
	border-bottom: 5px solid #020202;
}
</style>