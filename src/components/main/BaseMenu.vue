<template>
	<nav class="nav">
		<ul class="menu-list">
			<li class="menu-items coursemap">
				<button
					class="menu-items-btn"
					:class="{ active: slidesStore.currentBlockId === 0 }"
					@click.stop="clickCourseMap"
				>
					<svg
						width="34"
						height="32"
						viewBox="0 0 34 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M14.3724 30.4426H4.34954V16.7812L1.26237 16.7758L1.25003 16.7759C0.699987 16.7759 0.24906 16.4803 0.0731975 16.0044C-0.100205 15.5351 0.0413079 14.9989 0.42537 14.6702L0.430826 14.6655L15.4026 2.26366C16.7465 1.13983 17.7433 1.52063 18.6083 2.27448L33.5574 14.6673C33.9447 14.9697 34.0972 15.4911 33.937 15.9678C33.7695 16.4663 33.3084 16.7783 32.7338 16.782H29.6481V30.4425H19.6246L19.6403 29.9847C19.641 29.9648 19.6427 29.9472 19.6444 29.9339V25.3994C19.6444 24.9539 19.2821 24.5915 18.8367 24.5915H15.1606C14.7152 24.5915 14.3529 24.954 14.3529 25.3994V29.9343C14.3546 29.948 14.3563 29.9652 14.357 29.9849L14.3724 30.4426ZM5.23489 29.5572H13.4675V25.3993C13.4675 24.4657 14.2269 23.7062 15.1606 23.7062H18.8367C19.7702 23.7062 20.5297 24.4657 20.5297 25.3993V29.5572H28.7628V15.8966H32.731C33.1373 15.9078 33.1715 15.5152 33.011 15.3637L18.0424 2.9553C17.3002 2.33714 16.8954 2.13843 15.9487 2.96053L0.998712 15.3448C0.78926 15.5355 0.915029 15.9032 1.25003 15.8906L5.23489 15.8975V29.5572Z"
							fill="white"
							stroke="white"
							stroke-width="2"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</li>
			<li class="menu-items" v-for="item in menuList" :key="item" :class="item.toLowerCase()">
				<button
					class="menu-items-btn"
					:class="{ active: activeMenuItem === item }"
					@click.stop="clickMenu(item)"
					v-html="$t(item.toLowerCase())"
				></button>
				<TransitionExpand>
					<div class="dropdown" v-show="activeMenuItem === item">
						<div class="dropdown-in">
							<div class="dropdown-scroll-container">
								<component :is="item" @close="activateValue = ''" />
							</div>
						</div>
						<button class="dropdown-close-btn" @click.stop="activateValue = ''">
							<svg
								width="10"
								height="25"
								viewBox="0 0 10 25"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8 23L2 12.5L8 2"
									stroke="white"
									stroke-width="3"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</button>
					</div>
				</TransitionExpand>
			</li>
		</ul>
	</nav>
</template>

<script>
import { useSlidesStore } from "../../store/useSlidesStore.js"

export default {
	data() {
		return {
			menuList: ['Navigation', 'Library', 'Glossary'],
			activeMenuItem: "",
			activateValue: "",
		};
	},
	setup() {
		const slidesStore = useSlidesStore()

		return { slidesStore }
	},
	watch: {
		activateValue(newVal) {
			this.activeMenuItem = ""

			this.$systemAudio("menu")

			if (newVal) {
				setTimeout(() => {
					this.activeMenuItem = newVal
				}, 500)
			}
		},
	},
	methods: {
		clickCourseMap() {
			this.activateValue = 'Coursemap'
			this.slidesStore.setCurrentBlockId(0)
			this.slidesStore.setCurrentSlideId(1)
		},
		clickMenu(item) {
			if (this.activateValue === item) this.activateValue = ""
			else this.activateValue = item
		},
		clickDropdownDocument(e) {
			if (!e.target.closest(".dropdown")) this.activateValue = ""
		},
	},
	mounted() {
		document.addEventListener("click", this.clickDropdownDocument)
	},
	beforeUnmount() {
		document.removeEventListener("click", this.clickDropdownDocument)
	},
}
</script>

<style scoped>
.nav {
	position: relative;
	z-index: 10;
	width: 100%;
	height: 5rem;
	min-height: 5rem;
	max-height: 5rem;
	box-sizing: border-box;
	padding: 0 4.7rem;
	background-color: #0066ba;
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
	color: #ffffff;
}
.menu-list {
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
	list-style: none;
	display: flex;
	align-items: stretch;
	justify-content: flex-start;
}
.menu-items {
	height: 100%;
	position: relative;
	display: flex;
	align-items: stretch;
}
.menu-items-btn {
	position: relative;
	min-width: 20.25rem;
	box-sizing: border-box;
	border: 1px solid transparent;
	outline: none;
	background: transparent;
	padding: 0 2.5rem;
	cursor: pointer;
	font-style: normal;
	font-weight: 500;
	font-size: 2.1rem;
	line-height: 1;
	text-transform: capitalize;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
}
.coursemap .menu-items-btn {
	min-width: unset;
}
.menu-items-btn:hover {
	text-decoration: underline;
}
.menu-items-btn::after {
	content: "";
	width: 0.2rem;
	background: rgba(255, 255, 255, 0.5);
	height: 3rem;
	position: absolute;
	right: -0.3rem;
}
.menu-items:last-child .menu-items-btn::after {
	right: 0.2rem;
}
.menu-items:not(.coursemap) .menu-items-btn.active {
	color: #0066ba;
	background: #e2ecf1;
	border-top-right-radius: 1.3rem;
	text-decoration: none;
}
.library .menu-items-btn.active,
.glossary .menu-items-btn.active {
	border-top-left-radius: 1.3rem;
}
.menu-items:last-child .menu-items-btn.active {
	border-top-right-radius: 0rem;
}
.coursemap .menu-items-btn.active path {
	stroke: #b0b001;
	fill: #b0b001;
}
.dropdown {
	position: absolute;
	top: 100%;
	left: -8.6rem;
	box-shadow: 0.2rem 0.4rem 2rem rgba(0, 0, 0, 0.2);
	background: linear-gradient(180deg, #e2ecf1, #fff);
}
.dropdown::before {
	content: "";
	position: absolute;
	left: 0;
	right: 0;
	top: 0px;
	height: 1px;
	box-shadow: 0px 0px 30px 10px rgba(0, 0, 0, 0.2);
	z-index: 1;
}
.dropdown-in {
	position: relative;
	box-sizing: border-box;
	padding: 2rem 2.5rem 2rem 3.5rem;
	margin-bottom: 2rem;
	border-radius: 0 0 1rem 1rem;
}
.dropdown-scroll-container {
	padding-right: 1rem;
	max-height: 700px;
	overflow-y: scroll;
}
.dropdown-close-btn {
	background: #0066ba;
	width: 100%;
	height: 1rem;
	padding: 0;
	color: #fff;
	cursor: pointer;
	border: none;
	outline: none;
	display: flex;
	align-items: center;
	justify-content: center;
}
.dropdown-close-btn svg {
	margin-top: -0.2rem;
	transform: rotate(90deg);
}
</style>
