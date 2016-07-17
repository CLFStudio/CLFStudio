<template>
    <header>
        <div class="logo"><img src="public/img/logo.png"><span>CLFStudio</span></div>
        <div class="nav">
            <ul>
                <li><a href="#album">相册</a></li>
                <li><a href="#members">成员</a></li>
                <li><a href="#join">加入我们</a></li>
            </ul>
        </div>
    </header>
</template>

<style>
    header{
        width: 100%;
        height: auto;
        top: 0;
        position: fixed;
        z-index: 99;
    }

    header .logo{
        float: left;
        height: 54px;
        opacity: 0.80;
        margin: 1rem;
        padding-left: 2rem;
        vertical-align: middle;
    }

    header .logo img{
        height: 100%;
    }
    header .logo span{
        display: inline-block;
        line-height: 54px;
        font-size: 2rem;
        color: #fff;
        font-family: 'Oxygen', sans-serif;
    }

    header .nav{
        margin: 1rem;
        float: right;
        padding-right: 2rem;
    }
    header .nav ul{
        list-style: none;
    }
    header .nav li::after{
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        float: left;
        bottom: 0.5rem;
        margin-left: -100%;
        border-bottom: 2px solid #BD573F;
        -webkit-transition: all .64s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        transition: all .64s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }
    header .nav li{
        position: relative;
        float: left;
        text-align: center;
        line-height: 54px;
        margin-left: 2rem;
    }

    header .nav  a{
        bottom: 0;
        color: #fff;
        font-size: 1rem;
        padding-bottom: 4px;
    }

    header .nav li:hover::after{
        width: 100%;
    }
</style>



