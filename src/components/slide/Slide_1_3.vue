<template>
	<div class="wrapper">
		<div class="title" v-html="data.title"></div>
		<div class="body">
			<div class="items">
				<div
					class="item"
					v-for="(item, itemInd) in data.items"
					:key="itemInd"
					:class="{ active: isActive(itemInd) }"
					@click="activate(itemInd)"
				>
					<div class="front" v-html="item.front"></div>
					<div class="back" v-html="item.back"></div>
				</div>
			</div>
			<div v-if="allClicked" class="sticker-wrap">
				<div class="sticker" :style="{
					animationDelay: 0.5 + 's',
				}">
					<p v-for="(stickText, stickId) in data.stickerText" :key="stickId">
						<span
							v-for="(char, charId) in stickText.split('')"
							:key="charId"
							:style="{
								animationDelay:
									charId * 0.05 +
									(data.stickerText[stickId - 1] || []).length * 0.05 +
									2 +
									's',
							}"
							v-html="char"
						></span>
					</p>
				</div>
				<img class="sticker-btn" :style="{
					animationDelay: 0.5 + 's',
				}" />
			</div>
		</div>
	</div>
</template>

<script>
import useActiveList from "../../hooks/useActiveList.js"

export default {
	props: ["data"],
	emits: ["end"],
	setup(props, context) {
		const { isActive, allClicked, activate } = useActiveList(props, context, "end", false)

		return { isActive, allClicked, activate }
	},
}
</script>

<style scoped>
.wrapper {
	flex-direction: column;
	justify-content: flex-start;
	padding: 11.662rem 34.873rem 11.352rem 34.873rem;
	perspective: 1000px;
}
.title {
	text-align: center;
	font-size: 2.8rem;
	font-weight: bold;
	line-height: 1.5;
	margin-bottom: 10.658rem;
	opacity: 0;
	transform: translateY(-50px);
	animation: slideTop 0.5s linear forwards;
}
@keyframes slideTop {
	0% {
		opacity: 0;
		transform: translateY(-50px);
	}
	100% {
		opacity: 1;
		transform: translateY(0px);
	}
}
.body {
	width: 100%;
	display: flex;
}
.items {
	width: 80.4rem;
	height: 46.5rem;
	margin-right: 6.675rem;
	display: flex;
	justify-content: space-between;
	align-content: space-between;
	flex-wrap: wrap;
}
.item {
	width: 38.799rem;
	height: 21.656rem;
	border-radius: 1rem;
	box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.25);
	background: #fbfdfd;
	transform: rotateX(0deg);
	transform-origin: center center;
	transform-style: preserve-3d;
	transition: 0.5s linear;
}
.item.active {
	box-shadow: 3px -3px 3px 0px rgba(0, 0, 0, 0.25);
	transform: rotateX(180deg);
}
.item > div {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	backface-visibility: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}
.front {
	transform: rotateX(0deg);
	font-size: 2.6rem;
	font-weight: bold;
	cursor: pointer;
}
.back {
	transform: rotateX(180deg);
	font-size: 2.2rem;
	line-height: 1.5;
}
.stickers-wrap {
	display: flex;
	margin-bottom: 8rem;
}
.sticker-wrap {
	position: relative;
	margin-top: 6rem;
	perspective: 600px;
	margin-right: 1.559rem;
}
.sticker-wrap:last-child {
	margin-right: 0rem;
}
.sticker-btn {
	position: absolute;
	left: 48%;
	top: 1rem;
	opacity: 0;
	transform: translate(30px, -10px) rotateY(5deg) scale(1.1);
	animation: stickerBtnAnim 1s ease-out forwards;
}
@keyframes stickerBtnAnim {
	0% {
		opacity: 0;
		transform: translate(30px, -10px) rotateY(5deg) scale(1.1);
	}
	50% {
		opacity: 1;
		transform: translate(60px, -30px) rotateY(15deg) scale(1.2);
	}
	100% {
		opacity: 1;
		transform: translate(0px, 0px) rotateY(0deg) scale(1);
	}
}
.sticker {
	width: 35.151rem;
	height: 35.151rem;
	box-sizing: border-box;
	padding: 7rem 4.2rem;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	background-color: #fbf3af;
	box-shadow: 7.41px 7.78px 25.57px 0px rgba(0, 0, 0, 0.25);
	animation: stickerAnim 1s ease-out forwards;
	transform: translate(100px, 100px) rotateY(30deg) rotateX(15deg);
	opacity: 0;
	font-size: 2.3rem;
	font-family: "DIN Pro", cursive;
	font-weight: 400;
	line-height: 1.5;
	text-align: center;
}
.sticker p {
	margin-bottom: 2.197rem;
}
.sticker span {
	opacity: 0;
	animation: charAnim 0.05s ease-out forwards;
}
@keyframes charAnim {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
@keyframes stickerAnim {
	0% {
		transform: translate(100px, 100px) rotateY(30deg) rotateX(15deg);
		opacity: 0;
	}
	10% {
		opacity: 1;
	}
	70% {
		transform: translate(0px, -20px) rotateY(-10deg) rotateX(6deg);
	}
	100% {
		transform: translate(0px, 0px) rotateY(0deg) rotateX(0deg);
		opacity: 1;
	}
}
</style>