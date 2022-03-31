<template>
	<div class="question-wrapper">
		<div class="question-wrapper-inner">
			<div class="question">
				<div class="line" v-for="line in getParseText" :key="line.id">
					<span v-if="line.type === 'text'" class="text" v-html="line.data"></span>
					<span
						v-else
						class="dnd-container drop-container"
						:id="'drop' + line.id"
						@drop="dropped"
						@dragover="dragover"
					>
						<span
							v-if="container['drop' + line.id]"
							class="drag"
							v-html="container['drop' + line.id].data"
							:draggable="total === null"
							@dragstart="dragstart"
							:class="{
								correct:
									total !== null && container['drop' + line.id].id === line.id,
								uncorrect:
									total !== null && container['drop' + line.id].id !== line.id,
							}"
						></span>
					</span>
				</div>
			</div>
			<div class="dragzone">
				<span
					v-for="drag in getShuffleDrags"
					:key="drag.id"
					class="dnd-container drag-container"
					:id="'drag' + drag.id"
					@drop="dropped"
					@dragover="dragover"
				>
					<span
						v-if="container['drag' + drag.id]"
						class="drag"
						v-html="container['drag' + drag.id].data"
						:draggable="total === null"
						@dragstart="dragstart"
					></span>
				</span>
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
			container: {},
			total: null,
		}
	},
	computed: {
		getParseText() {
			return this.data.question.split("|").map((item, itemInd) => {
				return {
					id: itemInd,
					type: item.startsWith("?") ? "dnd" : "text",
					data: (item.startsWith("?") ? item.slice(1) : item).trim(),
				}
			})
		},
		getDrags() {
			return this.getParseText.filter((e) => e.type === "dnd")
		},
		getShuffleDrags() {
			return [...this.getDrags].sort(() => 0.5 - Math.random())
		},
		btnDisabled() {
			return (
				this.total !== null ||
				!Object.keys(this.container)
					.filter((k) => k.startsWith("drop"))
					.every((e) => this.container[e])
			)
		},
	},
	watch: {
		total(newVal) {
			this.$emit("submit", {
				total: newVal,
				value: this.container,
			})
		},
	},
	methods: {
		setContainers() {
			this.getDrags.forEach((item) => {
				this.container["drop" + item.id] = null
				this.container["drag" + item.id] = item
			})
		},
		dragstart(ev) {
			ev.dataTransfer.setData("dragId", ev.target.closest(".dnd-container").id)
		},
		dragover(ev) {
			ev.preventDefault()
		},
		dropped(ev) {
			ev.preventDefault()
			const dropPlace = ev.target.closest(".drop-container")
			if (!dropPlace) return
			const dragId = ev.dataTransfer.getData("dragId")
			const dropId = dropPlace.id
			let obj = this.container[dropId] || null
			this.container[dropId] = this.container[dragId]
			this.container[dragId] = obj
		},
		check() {
			this.total = this.getDrags.every((e) => {
				let obj = this.container["drop" + e.id]
				return obj && obj.id === e.id
			})
		},
	},
	mounted() {
		if (this.end !== undefined) {
			this.total = this.end.total
			this.container = this.end.value
		} else {
			this.setContainers()
		}
	},
}
</script>

<style scoped>
.question-wrapper-inner {
	border-top: 0.2rem solid #0066ba;
	padding-top: 1.5rem;
}
.question {
	font-size: 2.6rem;
	line-height: 1.5;
	white-space: pre-wrap;
	font-weight: 500;
}
.line {
	display: inline;
}
.drop-container {
	display: inline-block;
	min-width: 24.1rem;
	min-height: 3.5rem;
	box-sizing: border-box;
	border: 0.3rem dashed #c4c4c4;
	border-radius: 1rem;
	vertical-align: middle;
	margin: 0 2rem;
}
.dragzone {
	flex-grow: 1;
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	flex-wrap: wrap;
	align-content: flex-end;
	margin-bottom: 4rem;
}
.drag {
	display: inline-block;
	min-width: 24.1rem;
	min-height: 3.5rem;
	font-size: 2.6rem;
	text-align: center;
	background: #efefef;
	border-radius: 1rem;
	cursor: pointer;
	padding: 0 1rem;
}
.dragzone .drag {
	margin: 1rem 3rem;
}
.correct {
	background-color: #00a54f;
}
.uncorrect {
	background-color: #d36972;
}
</style>
