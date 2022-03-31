<template>
	<div class="question-wrapper">
		<div class="question-wrapper-inner">
			<div class="question">
				<div class="question-part" v-for="(item, ind) in question" :key="ind">
					<span v-if="typeof item === 'string'" v-html="item"></span>
					<DropDownSelect
						v-else
						type="string"
						:id="ind"
						:value="value[ind]"
						:options="item"
						:placeholder="$t('select')"
						@change="change"
						:disabled="total !== null"
						:class="{
							correct: total !== null && isCorrect(ind),
							uncorrect: total !== null && !isCorrect(ind),
						}"
					/>
				</div>
			</div>
		</div>
		<button class="test-send-btn" @click="check" :disabled="btnDisabled" v-html="$t('send')"></button>
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
	computed: {
		getSortKeys() {
			return Object.keys(this.value).sort()
		},
		question() {
			return this.data.question.split("|").map((elem) => {
				elem = elem.trim()

				if (elem[0] === "?") {
					return elem
						.slice(1)
						.split("&-&")
						.map((e) => e.trim())
				}

				return elem
			})
		},
		btnDisabled() {
			return (
				this.total !== null ||
				Object.keys(this.value).length !==
				this.question.filter((e) => typeof e !== "string").length
			)
		},
		isCorrect() {
			return (ind) => {
				let i = this.getSortKeys.indexOf(String(ind))

				return this.data.value[i] === this.value[ind]
			}
		},
	},
	watch: {
		total(newVal) {
			this.$emit("submit", {
				total: newVal,
				value: this.value,
			})
		},
	},
	methods: {
		change(data) {
			this.value[data.id] = data.value
		},
		check() {
			let keys = this.getSortKeys

			for (let ind in this.data.value) {
				if (this.data.value[ind] !== this.value[keys[ind]]) {
					this.total = false
					return
				}
			}

			this.total = true
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

<style scoped>
.question-wrapper,
.question-wrapper-inner {
	overflow: unset;
}
.question {
	border-top: 0.2rem solid #0066ba;
	padding-top: 1.5rem;
}
.question-part {
	display: inline;
}
.correct {
	background-color: #00a54f;
}
.uncorrect {
	background-color: #d36972;
}
</style>