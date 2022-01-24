<template>
<div class="card">
    <div class="card__head">
        <img src="../assets/icon-left-font-monochrome-black.png" alt="logo groupomania"/>
    </div> 
    <div class="card__feed">
        <div class="card__form">
            <div class="form__author">
                <img src="../assets/harry.jpg" alt="profile Picture"/>
            </div>
            <div class="form__content">
                <textarea class="form__input" type="text" placeholder="Quoi de neuf, Harry ? " maxlength="250"></textarea>
            </div>
        </div>
        <div class="card__posts"> <!-- code en dur !! A changer-->
            <div class="post__author">
                <img src="../assets/albus.jpg" alt="profile Picture"/>
            </div>
            <div class="post__content">
            <div class="triangle"></div>
                <h3>Albus Dumbledore</h3>
                <p>Devinez qui gagne la coupe des quatres maisons cette année 😂</p>
                <p class="date">22 janvier, 19:41</p>
            </div>
            <div class="post__button">
                <button class="button">Liker</button> 
                <button class="button">Commenter</button>
            </div>
        </div>
        <div class="card__posts"> <!-- code en dur !! A changer-->
            <div class="post__author">
                <img src="../assets/ron.jpg" alt="profile Picture"/>
            </div>
            <div class="post__content">
            <div class="triangle"></div>
                <h3>Ronald Wesley</h3>
                <p>Quelqu'un a une baguette a me prêter ? J'ai encore cassé la mienne 😅 </p>
                <p class="date">25 janvier, 20:00</p>
            </div>
            <div class="post__button">
                <button class="button">Liker</button> 
                <button class="button">Commenter</button>
            </div>
        </div>
    </div>
    <div class="card__nav">
        <button class="nav__button"><span><fa icon="user" /></span></button>
        <button class="nav__button"><fa icon="moon" /></button>
        <button @click="logout()" class="nav__button"><fa icon="door-open" /></button>
    </div>
</div>      
</template>

<script>


export default {
    name: 'Feed',
    mounted: function () {
        console.log(this.$store.state.user);
        if (this.$store.state.user.id_user == -1) {
            this.$router.push('/login');
            return;
        }
        this.$store.dispatch('getUserDatas');
        this.$store.dispatch('getPosts');
    },
    methods: {
        logout: function () {
            //ajouter un "this.$store.commit('logout');"
            this.$router.push('/login');
        }
    }, 
}

</script>

<style lang="scss" scoped>

body {
    align-items: start;
}

.card {
    display: flex;
    .card__head {
    z-index: 1;
    position: absolute;    
    max-width: 100%;
    width: 500px;
    height : 10px;
    background: linear-gradient(transparent 0%,#b0b0b0 100%);
    border-radius: 8px 8px 0px 0px;
    padding:25px;
        img {
            position: absolute;  
            width:150px;
            left: 15px;
            top: 15px;
        }
    }
    .card__feed {
    display: flex;
    flex-direction: column;    
    position: relative;    
    max-width: 100%;
    width: 500px;
    height : 100%;
    background: white;
    border-radius: 8px 8px 8px 8px;
        .card__form {
            max-width: 100%;
            display:flex;
            justify-content: space-between;
            padding-top:60px; 
            border-bottom:  1px  solid #b0b0b0;
            .form__author {
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 16px;
                box-shadow: 2px 2px 5px #b0b0b0;
                margin-left: 25px;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 16px;
                }
            }
            .form__content {
                width: 80%;
                background: #e6e6e6;
                padding: 20px;
                padding-top: 10px;
                padding-bottom: 10px;
                border-radius: 8px 8px 8px 8px ;
                box-shadow: 5px 5px 5px #bfbfbf;
                margin: 25px;
                margin-top: 0px;
                margin-bottom: 25px;
                .form__input {
                    padding:8px;
                    border: none;
                    background: #e6e6e6;
                    font-weight: 500;
                    font-size: .8em;
                    min-width: 100px;
                    width: 100%;
                    resize : none;
                    rows: "3";
                    &:hover{
                        border: none;
                        outline: none;
                    }
                    &:focus {
                        border: none;
                        outline: none;
                    }
                }
            }

        }
        .card__posts {
            margin: 25px;
            margin-bottom: 10px;
            max-width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            
            .post__author{
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 16px;
                box-shadow: 2px 2px 5px #b0b0b0;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 16px;
                }
            }
            .post__content{
                position: relative;
                width: 80%;
                background: #cfcfcf;
                padding: 20px;
                padding-top: 10px;
                padding-bottom: 10px;
                border-radius: 0px 8px 8px 8px ;
                box-shadow: 5px 5px 5px #b0b0b0;
                p {
                    margin-top:10px;
                    margin-bottom:10px;
                    font-size: .8em;
                }
                .date {
                    text-align: end;
                    font-size: 0.6em;
                    margin-bottom: 0px;
                }
            }
            .triangle {
                position: absolute;
                left: -20px;
                top: 0px;
                width: 0;
                height: 0;
                border-left: 20px solid transparent;
                border-right: 0px solid transparent;
                border-top: 20px solid #cfcfcf;
            }
            .post__button{
                width: 100%;
                display:flex;
                justify-content: space-between;
                border-bottom:  1px  solid #b0b0b0;
                margin-top: 20px;
                .button {
                    border: none;
                    height:30px;
                    background: transparent;
                    width: 100%;
                    margin-left:30px;
                    margin-right:30px;
                    transition: .4s background-color;
                    &:hover {
                        cursor:pointer;
                        border-radius: 8px;
                        color: white;
                        background: #091F43;
                    }
                }
            }    
        }
    }
    .card__nav {
        display: flex;
        flex-direction: column;
        .nav__button {
            background: white;
            border-radius: 16px;
            border: none;
            width: 50px;
            height: 50px;
            padding: 16px;
            margin: 16px;
            margin-top: 0;
            transition: .4s background-color;
            &:hover {
                cursor:pointer;
                background: #091F43;
            }
        }
        span {
            color: red;
        }
    }

}
</style>