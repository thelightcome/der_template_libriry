<template>
	<div class="question-wrapper">
		<div class="question-wrapper-inner">
			<div v-html="question" @keyup="keyup" :disabled="total" @keydown="keydown"></div>
		</div>
		<button class="test-send-btn" @click="check" :disabled="isBtnDisabled" v-html="$t('send')"></button>
	</div>
</template>

<script>
export default {
	props: ["data", "end"],
	emits: ["submit"],
	data() {
		return {
			value: {},
			total: null,
		}
	},
	watch: {
		total(newVal) {
			this.$emit("submit", {
				total: newVal,
				value: this.value,
			})
		},
	},
	computed: {
		isBtnDisabled() {
			return (
				this.total !== null ||
				Object.keys(this.value).length !== this.data.value.length
			)
		},
		question() {
			let question = this.data.question

			this.data.value.forEach((elem, index) => {
				const id = index

				const className =
					this.value[id] === elem
						? "input-test-item-correct"
						: "input-test-item-uncorrect"

				const replaceText = this.total === null
					? `<span class='input-test-item' contenteditable='true' id='${id}'></span>`
					: `<span class='input-test-item ${className}'>${this.value[id]}</span>`

				question = question.replace(`\${${elem}}`, replaceText)
			})

			return question
		},
	},
	methods: {
		check() {
			if (!Object.keys(this.value).length) return (this.total = false)
			this.total = Object.values(this.value).every((elem, index) => {
				return elem.toLowerCase() === this.data.value[index].toLowerCase()
			})
		},
		keydown(e) {
			if (
				this.total !== null ||
				(e.target.textContent.length >= this.data.max - 1 && e.keyCode != 8)
			)
				e.preventDefault()
		},
		keyup(e) {
			this.value[e.target.id] = e.target.textContent
		},
	},
	mounted() {
		if (this.end !== undefined) {
			this.total = this.end.total
			this.value = this.end.value
		}
	},
}
</script>

<style>
.input-test-item {
	display: inline-block;
	background: #efefef;
	box-shadow: inset 3px 3px 4px rgb(0 0 0 / 20%);
	box-sizing: border-box;
	border: none;
	border-radius: 5px;
	font-weight: 500;
	font-size: 26px;
	text-align: center;
	line-height: 150%;
	margin: 10px;
	min-width: 239px;
	outline: none;
	word-wrap: break-word;
}
.input-test-item-correct {
	background-color: green !important;
}
.input-test-item-uncorrect {
	background-color: #d36972 !important;
}
</style>