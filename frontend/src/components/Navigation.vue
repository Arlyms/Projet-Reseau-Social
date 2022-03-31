<template>
<div class="card__nav">   
    <div class="nav__head">
        <a href="#" class="logo">
            <img v-if ="!mobile"  src=".../assets/icon-left-font-monochromewhite.png" alt="logo groupomania"/>
            <img v-else src=".../assets/icon-monochromewhite.png" alt="logo groupomania"/>
        </a>
        <div class="nav__link">
            <div class="nav__button" @click="showUser" title='Profil'>
                <fa icon="user" />
            </div>
            <div v-if="display" class="nav__user"><object data="" type=""></object>
                <div class="user__pp">
                </div>
                <div class="user__name" >
                <p>{{ user.firstName }}</p>
                <p>{{ user.name }}</p>
                </div>
                <div class="user__email">
                    <span>{{ user.email }}</span>
                </div>
                <div @click="deleteUser(user.userId)" class="user__delete">
                    <p>Supprimer le compte</p>
                </div> 
            </div>
            <div @click="logout()" class="nav__button">
                <fa icon="door-open" />
            </div>
        </div>
    </div>         
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'Navigation',
    data: function(){
    return{
        display: false,
        mobile: true,
    }
    },
    mounted: function (){
        console.log(this.$store.state.user);
    },
    methods: {
        showMobileNav(){
            this.mobile = window.innerWidth <= 990;
        },
        logout: function () {
        this.$router.push('/login');
        },
        showUser() {
        this.display = !this.display; // remplacer user.display à terme ? 
        },
        deleteUser: function (id_user){
            this.$store.dispatch('deleteUser', id_user),
            this.$router.push('/login');
        }
    },
    created(){
        this.showMobileNav();
    },
    computed : {
        ...mapState(['user'])
    }
}
</script>


<style scoped lang="scss">

.card__nav {
    position: fixed;
    display: flex;
    z-index: 2;
    .nav__head {
    position: relative;  
    max-width: 100%;
    width: 600px;
    height : 10px;
    background-image: linear-gradient(160deg,#D1515A 0%,#091F43 70%, #091F43 100%);
    padding:25px;
    opacity: 0.9;
        img {
            position: absolute;  
            width:150px;
            left: 15px;
            top: 15px;
        }
    }
    .nav__link {
        position: absolute;
        display: flex;
        right: 10px;
        top: 10px;
        .nav__button {
            background-color: transparent;
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            margin: 4px;
            margin-left: 16px;
            transition: .4s background-color;
            &:hover{
                cursor: pointer;
            }
        }    
        .nav__user {
            z-index: 3;
            position: absolute;
            right: -10px;
            top: 40px;
            background-image: linear-gradient(rgb(255, 255, 255) 0%, #e9e9e9 100%);
            border-radius: 0px 0px 8px 8px ;
            min-width: 200px;
            min-height: 250px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            .user__pp {
                border: none;
                width: 80px;
                height: 80px;
                border-radius: 16px;
                box-shadow: 2px 2px 5px #b0b0b0;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 16px;
                }
            }
            .user__name {
                display: flex;
                p {
                    padding: 3px;
                }
            }
            .user__email {
                font-size: 0.6em;
            }
            .user__delete {
                border: none;
                border-radius: 8px;
                height:30px;
                width: 100%;
                color: white;
                background: red;
                text-align: center;
                padding-top: 5px;
                margin-top: 50px;
                font-size: 0.8em;
                transition: .4s background-color;
                &:hover {
                    cursor:pointer;
                    border-radius: 8px;
                    color: #091F43;
                    background: red;
                }
            }
            .card__validation {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translate(-50%,-50%);
                z-index: 4;
                height: 150px;
                width: 300px;
                background-color: white;
                border-radius: 8px;
            }
        }
    }          
}
</style>
