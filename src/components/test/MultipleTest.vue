<template>
	<div class="question-wrapper">
		<div class="question-wrapper-inner">
			<div class="question" v-html="data.question"></div>
			<div class="choices_wrap">
				<div
					class="choice"
					v-for="(choice, index) in data.choice"
					:key="choice.text"
					:class="{
						correct: total !== null && choice.value,
						uncorrect:
							total !== null && !choice.value && value.indexOf(index) !== -1,
					}"
				>
					<label>
						<input
							type="checkbox"
							:value="index"
							v-model="value"
							@click="click"
							:disabled="total !== null"
						/>
						<span class="checkbox"></span>
						<img v-if="data.hasImages" :src="choice.image" />
						<span v-else v-html="choice.text"></span>
					</label>
				</div>
			</div>
		</div>
		<button
			class="test-send-btn"
			@click="check"
			:disabled="total !== null || !value.length"
			v-html="$t('send')"
		></button>
	</div>
</template>

<script>
export default {
	props: ["data", "end"],
	emits: ["submit"],
	data() {
		return {
			value: [],
			total: null,
		};
	},
	computed: {
		trueValsLen() {
			return this.data.choice.filter((elem) => elem.value).length
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
		check() {
			let lenEqual = this.value.length === this.trueValsLen
			let allCorrect = this.value.every((ind) => this.data.choice[ind].value)

			if (lenEqual && allCorrect) this.total = true
			else this.total = false
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
.question {
	text-align: center;
	padding-bottom: 3rem;
	width: 100%;
	border-bottom: 0.2rem solid #0066ba;
}
.choices_wrap {
	flex-grow: 1;
	display: inline-flex;
	justify-content: space-between;
	flex-wrap: wrap;
	align-items: stretch;
	align-content: flex-start;
	padding-top: 3rem;
	max-height: 80%;
	min-width: 60%;
}
.choice {
	min-width: 45%;
	max-width: 45%;
	margin-bottom: 2rem;
}
.choice img {
	max-width: 25rem;
	vertical-align: middle;
}
.correct {
	color: green !important;
}
.uncorrect {
	color: #d36972 !important;
}
.choice label {
	display: flex;
	cursor: pointer;
}
input {
	display: none;
}
.checkbox {
	position: relative;
	display: inline-block;
	margin-top: 0.8rem;
	margin-right: 1.5rem;
	height: 2.6rem;
	width: 2.6rem;
	min-height: 2.6rem;
	min-width: 2.6rem;
	box-shadow: inset 3px 3px 4px rgb(0, 0, 0, 0.2);
}
.checkbox:after {
	content: "";
	width: 1.6rem;
	height: 1.6rem;
	display: block;
	z-index: 10;
	background: transparent;
	position: absolute;
	left: 0.5rem;
	top: 0.5rem;
}
.correct .checkbox:after {
	background-color: #00a54f;
}
input:checked ~ .checkbox:after {
	background-color: #0066ba;
}
</style>