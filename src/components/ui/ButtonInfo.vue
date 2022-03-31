<template>
	<div class="btn-info-wrapper" :class="{ 'btn-info-active': active }" ref="wrapper">
		<button
			:style="{ left: left + 'px', top: top + 'px' }"
			:class="{ active: active }"
			@click="click"
		></button>
		<div
			class="text-wrapper"
			:class="{ hide: !active }"
			:style="{
				...getPosition,
				width: (active ? width : 0) + 'px',
				height: (active ? height : 0) + 'px',
				border: border,
			}"
		>
			<div class="in-text" v-html="text"></div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
		},
		left: {
			type: String,
		},
		top: {
			type: String,
		},
		dirX: {
			type: String,
			default: "left",
		},
		dirY: {
			type: String,
			default: "top",
		},
		width: {
			type: Number,
		},
		height: {
			type: Number,
		},
		border: {
			type: String,
		},
		auto: {
			type: Boolean,
			default: false
		}
	},
	emits: ["click"],
	data() {
		return {
			active: this.auto,
			wrapWidth: 0,
			wrapHeight: 0,
		}
	},
	computed: {
		getPosition() {
			let pX = this.dirX === "left" ? "right" : "left"
			let pY = this.dirY === "top" ? "bottom" : "top"

			return {
				[pX]:
					(pX === "left"
						? +this.left + 37.5
						: this.wrapWidth - this.left - 37.5) + "px",
				[pY]:
					(pY === "top"
						? +this.top + 37.5
						: this.wrapHeight - this.top - 37.5) + "px",
			}
		},
	},
	methods: {
		click() {
			this.active = !this.active
			this.$emit("click")
		},
	},
	mounted() {
		let style = getComputedStyle(this.$refs.wrapper)
		this.wrapWidth = parseFloat(style.width)
		this.wrapHeight = parseFloat(style.height)
	},
}
</script>

<style scoped>
.btn-info-wrapper {
	position: absolute;
	top: 0;
	left: 0;
	width: auto;
	height: auto;
}
.btn-info-wrapper.btn-info-active {
	width: 100%;
	height: 100%;
}
button {
	position: relative;
	width: 7.5rem;
	height: 7.5rem;
	box-sizing: border-box;
	padding: 0;
	border: 0.4rem solid #0066ba;
	border-radius: 50%;
	background: #fff;
	cursor: pointer;
	transition: 0.3s ease-out;
	z-index: 1;
}
button.active {
	background: #0066ba;
}
button:before,
button:after {
	content: "";
	position: absolute;
	background: #0066ba;
	left: 50%;
	transform: translateX(-50%);
}
button.active:before,
button.active:after {
	background: #fff;
}
button:before {
	width: 0.857rem;
	height: 0.857rem;
	border-radius: 50%;
	top: 1.636rem;
}
button:after {
	width: 0.804rem;
	height: 2.357rem;
	border-radius: 0.2rem;
	top: 2.814rem;
}
.text-wrapper {
	position: absolute;
	font-size: 2.2rem;
	border-radius: 1rem;
	padding: 3.5rem 4.5rem 3.3rem;
	background: #fff;
	box-sizing: border-box;
	overflow: hidden;
	overflow-y: auto;
	transition: 0.7s ease-out;
	line-height: 1;
}
.text-wrapper.hide {
	overflow: hidden;
	padding: 0rem;
	transition: 0.7s ease-out;
	transition-delay: 0.3s;
}
.text-wrapper .in-text {
	transition: 0.3s ease-out;
	transition-delay: 0.7s;
	opacity: 1;
}
.text-wrapper.hide .in-text {
	transition: 0.3s ease-out;
	opacity: 0;
}
</style>