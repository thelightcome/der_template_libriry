<template>
	<div class="question-wrapper">
		<div class="question-wrapper-inner">
			<div class="question" v-html="data.question"></div>
			<div class="dropzone-wrap" :class="{ row: data.row }">
				<div class="drop-titles">
					<div
						class="drop-title"
						v-for="cols in Object.keys(data.choice)"
						:key="cols"
						:style="{ maxWidth: 100 / Object.keys(data.choice).length + '%' }"
						v-html="cols"
					></div>
				</div>
				<div class="dropzones">
					<div
						class="dropzone"
						v-for="(cols, index) in Object.keys(data.choice)"
						:key="cols"
						:data-id="index"
						@drop.prevent="drop"
						@dragover.prevent="allowDrop"
						:style="{ maxWidth: 100 / Object.keys(data.choice).length + '%' }"
					>
						<div class="correct" v-if="total !== null">
							<div
								class="choice"
								v-for="choice of Object.values(data.choice)[index]"
								:key="choice"
								v-html="choice"
							></div>
						</div>
					</div>
				</div>
				<div class="choices">
					<div
						class="choice"
						v-for="(choice, index) in choices"
						v-show="total === null"
						:key="choice"
						:draggable="total === null"
						:id="index"
						@dragstart="dragstart"
						v-html="choice"
					></div>
				</div>
			</div>
		</div>
		<button class="test-send-btn" @click="check" :disabled="total !== null" v-html="$t('send')"></button>
	</div>
</template>

<script>
export default {
	props: ["data", "end"],
	emits: ["submit"],
	data() {
		return {
			answer: {},
			total: null,
		}
	},
	computed: {
		choices() {
			return Object.entries(this.data.choice)
				.reduce((accumulator, currentValue) => {
					return accumulator.concat(currentValue[1])
				}, [])
				.sort(() => 0.5 - Math.random())
		},
	},
	watch: {
		total(newVal) {
			this.$emit("submit", {
				total: newVal,
				value: this.answer,
			})
		},
	},
	methods: {
		dragstart(event) {
			if (event.target.id) event.dataTransfer.setData("id", event.target.id)
			if (!isNaN(event.target.parentNode.dataset.id))
				event.dataTransfer.setData("from", event.target.parentNode.dataset.id)
		},
		allowDrop(event) {
			event.preventDefault()
		},
		drop(event) {
			event.preventDefault()
			let data = event.dataTransfer.getData("id"),
				from = event.dataTransfer.getData("from"),
				element = document.getElementById(data)

			if (!!from && !isNaN(event.target.dataset.id) && element.textContent) {
				this.answer[from] = this.answer[from].filter((elem) => {
					return elem !== element.textContent
				})
			}
			if (data && element && this.answer[event.target.dataset.id]) {
				this.answer[event.target.dataset.id].push(element.textContent)
				event.target.appendChild(element)
			}
		},
		check() {
			let choices = Object.values(this.data.choice)
			for (let col in choices) {
				for (let elem in choices[col]) {
					if (!this.answer[col].includes(choices[col][elem])) {
						this.total = false
						return
					}
				}
			}
			this.total = true
		},
	},
	mounted() {
		if (this.end !== undefined) {
			this.total = this.end.total
			this.answer = this.end.value
		} else {
			Object.keys(this.data.choice).forEach((el, index) => {
				this.answer[index] = []
			})
		}
	},
}
</script>

<style scoped>
.question {
	text-align: center;
	margin-bottom: 3rem;
}
.dropzone-wrap {
	border-top: 2px solid #0066ba;
	padding: 1.5rem 0rem;
	flex-grow: 1;
	overflow: hidden;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.dropzone-wrap.row {
	flex-direction: row;
}
.dropzone-wrap > div {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
}
.dropzone-wrap.row > div {
	flex-direction: column;
	flex: 1 0 12.5%;
	align-items: flex-start;
	height: 100%;
}
.dropzone-wrap.row > div > div {
	width: 90%;
	margin-bottom: 25px;
	line-height: 1.2;
}
.drop-title {
	font-size: 22px;
	line-height: 120%;
	text-align: center;
	color: #000000;
	margin-bottom: 15px;
}
.dropzone-wrap.row .drop-title {
	text-align: left;
}
.dropzone {
	height: 230px;
	margin: 10px 25px;
	flex: 1 0 12.5%;
	border: 3px dashed #c4c4c4;
	box-sizing: border-box;
	border-radius: 10px;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
	flex-wrap: wrap;
	padding: 5px;
}
.choices {
	justify-content: flex-start !important;
}
.row .choices {
	justify-content: space-around !important;
}
.choice {
	display: inline-block;
	background: #efefef;
	border-radius: 5px;
	padding: 6px 7px;
	font-size: 2.2rem;
	line-height: 1;
	margin: 3px;
	cursor: grab;
}
.correct .choice {
	color: green !important;
}
</style>