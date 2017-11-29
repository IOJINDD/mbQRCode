<template>
  <div id="super-call">
    <div>
      {{ message }}
    </div>
  </div>
</template>
<script>
  export default {
    data () {
			return {

			}
		},
		props: {
			message: {
				type: String,
				default () {
					return '呼叫车主'
				}
			}
		},
		methods: {

		}
  }

</script>
<style lang="scss">
    #super-call {
			/*这里是重点*/
			div {
				width: 100px;
				height: 100px;
				border-radius: 50%;
				text-align: center;
				line-height: 100px;
				margin: auto;
				-webkit-animation: glow 800ms ease-out infinite alternate;
				-moz-animation: glow 800ms ease-out infinite alternate;
				-o-animation: glow 800ms ease-out infinite alternate;
				-ms-animation: glow 800ms ease-out infinite alternate;

				/*这里使用了呼吸动画*/
				animation: glow 400ms ease-out infinite alternate;
				background: #132f55;
				background: -webkit-linear-gradient(#64bbff, #132f55);
				background: -moz-linear-gradient(#64bbff, #132f55);
				background: -o-linear-gradient(#64bbff, #132f55);
				background: -ms-linear-gradient(#64bbff, #132f55);
				background: linear-gradient(#64bbff, #132f55);
				border-color: #fff;
				box-shadow: 0 0 20px rgba(0, 255, 0, .2), inset 0 0 20px rgba(0, 255, 0, .1), 0 10px 0 #000;
				color: #efe;
				font-size: 0.43rem;
				outline: none;
			}

			/*以下定义动画帧*/
			@-webkit-keyframes glow {
				0% {
					border-color: #132f56;
					box-shadow: 0 0 5px 5px rgba(100, 187, 255, .2), inset 0 0 5px 5px rgba(100, 187, 255, .1), 0 2px 0 #000;
				}
				100% {
					border-color: #0a224a;
					box-shadow: 0 0 15px 15px rgba(100, 187, 255, .6), inset 0 0 15px 15px rgba(100, 187, 255, .4), 0 15px 0 #000;
				}
			}

			@keyframes glow {
				0% {
					border-color: #132f56;
					box-shadow: 0 0 5px 5px rgba(100, 187, 255, .2), inset 0 0 5px 5px rgba(100, 187, 255, .1), 0 2px 0 #000;
				}
				100% {
					border-color: #0a224a;
					box-shadow: 0 0 15px 15px rgba(100, 187, 255, .6), inset 0 0 15px 15px rgba(100, 187, 255, .4), 0 15px 0 #000;
				}
			}
		}

</style>
