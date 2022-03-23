<template>
<div class="card__nav">   
    <div class="nav__button" @click="showUser">
        <fa icon="user" />
    </div>
    <div v-if="display" class="nav__user">
        <div class="user__pp">
            <img src="../assets/harry.jpg" alt="profile Picture"/> <!-- {{ user.pictureProfile }} -->
        </div>
        <div class="user__name" >
        <p>{{ user.firstName }}</p>
        <p>{{ user.name }}</p>
        </div>
        <div class="user__email">
            <span>{{ user.email }}</span>
        </div>
        <div class="user__delete">
            <p>Supprimer le compte</p>
        </div> 
    <!--<div v-if="validate" class="card__validation">
        </div> 
    <div class="nav__button">
        <fa icon="moon" />
    </div>-->
    </div>
    <div @click="logout()" class="nav__button">
        <fa icon="door-open" />
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'Navigation',
    data: function(){
    return{
        mode: 'normal',
        display: false,
        validate: false,
    }
    },
    mounted: function (){
        console.log(this.$store.state.user);
    },
    methods: {
        logout: function () {
        this.$router.push('/login');
        },
        showUser() {
        this.display = !this.display; // remplacer user.display à terme ? 
        },
        /*showValidate() {
        this.validate = !this.validate; 
        },*/
    },
    computed : {
        ...mapState(['user'])
    }
}
</script>


<style scoped lang="scss">

.card__nav {
    position: relative;
    display: flex;
    flex-direction: column;
    .nav__user {
        z-index: 3;
        position: absolute;
        right: 82px;
        background-image: linear-gradient(white 0%, #e2e2e2 100%);
        border-radius: 7px;
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
    .nav__button {
        position: relative;
        background-color: #091F43;
        color: white;
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
            background: white;
        }
        svg {
        position: absolute;
        margin: auto;
        color: white;
        align-items: center;
        } 
    }          
}
</style>
