<template>
  <div id="super-call">
    <div>
      呼叫车主
    </div>
  </div>
</template>
<style lang="scss">
  #super-call {
    /* span {
        background: #222;
        background: -webkit-linear-gradient(#333, #222);
        background: -moz-linear-gradient(#333, #222);
        background: -o-linear-gradient(#333, #222);
        background: -ms-linear-gradient(#333, #222);
        background: linear-gradient(#333, #222);
        border: 1px solid #444;
        border-radius: 5px 0 0 5px;
        box-shadow: 0 2px 0 #000;
        color: #888;
        display: block;
        float: left;
        font-family: 'Cabin', helvetica, arial, sans-serif;
        font-size: 13px;
        font-weight: 400;
        height: 40px;
        margin: 0;
        padding: 0 10px;
        text-shadow: 0 -1px 0 #000;
        width: 200px;
    } */
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
        animation: glow 600ms ease-out infinite alternate;
        background: #132f55;
        background: -webkit-linear-gradient(#64bbff, #132f55);
        background: -moz-linear-gradient(#64bbff, #132f55);
        background: -o-linear-gradient(#64bbff, #132f55);
        background: -ms-linear-gradient(#64bbff, #132f55);
        background: linear-gradient(#64bbff, #132f55);
        border-color: #fff;
        box-shadow: 0 0 20px rgba(0,255,0,.2), inset 0 0 20px rgba(0,255,0,.1), 0 10px 0 #000;
        color: #efe;
        font-size: 0.43rem;
        outline: none;
    }

    /*以下定义动画帧*/
    @-webkit-keyframes glow {
        0% {
            border-color: #132f56;
            box-shadow: 0 0 5px 5px rgba(100,187,255,.2), inset 0 0 5px 5px rgba(100,187,255,.1), 0 2px 0 #000;
        }
        100% {
            border-color: #0a224a;
            box-shadow: 0 0 15px 15px rgba(100,187,255,.6), inset 0 0 15px 15px rgba(100,187,255,.4), 0 15px 0 #000;
        }
    }

    /* @-moz-keyframes glow {
        0% {
            border-color: #132f56;
            box-shadow: 0 0 5px rgba(0,255,0,.2), inset 0 0 5px rgba(0,255,0,.1), 0 2px 0 #000;
        }
        100% {
            border-color: #0a224a;
            box-shadow: 0 0 20px rgba(0,255,0,.6), inset 0 0 10px rgba(0,255,0,.4), 0 2px 0 #000;
        }
    }

    @-o-keyframes glow {
        0% {
            border-color: #132f56;
            box-shadow: 0 0 5px rgba(0,255,0,.2), inset 0 0 5px rgba(0,255,0,.1), 0 2px 0 #000;
        }
        100% {
            border-color: #0a224a;
            box-shadow: 0 0 20px rgba(0,255,0,.6), inset 0 0 10px rgba(0,255,0,.4), 0 2px 0 #000;
        }
    }

    @-ms-keyframes glow {
        0% {
            border-color: #132f56;
            box-shadow: 0 0 5px rgba(0,255,0,.2), inset 0 0 5px rgba(0,255,0,.1), 0 2px 0 #000;
        }
        100% {
            border-color: #0a224a;
            box-shadow: 0 0 20px rgba(0,255,0,.6), inset 0 0 10px rgba(0,255,0,.4), 0 20px 0 #000;
        }
    }

    @keyframes glow {
        0% {
            border-color: #132f56;
            box-shadow: 0 0 5px rgba(0,255,0,.2), inset 0 0 5px rgba(0,255,0,.1), 0 2px 0 #000;
        }
        100% {
            border-color: #0a224a;
            box-shadow: 0 0 20px rgba(0,255,0,.6), inset 0 0 10px rgba(0,255,0,.4), 0 20px 0 #000;
        }
    } */
  }
</style>
