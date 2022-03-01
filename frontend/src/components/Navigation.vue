<template>
<div class="card__nav">   
    <div class="nav__button" @click="showUser">
        <fa icon="user" />
    </div>
    <div v-if="display" class="nav__user">
        <div class="user__pp">
            <img src="../assets/harry.jpg" alt="profile Picture"/>
        </div>
        <div class="user__name">
        <p>Harry</p>
        <p>Potter</p>
        </div>
        <div class="user__name" v-if="modify"> <!-- Modification -->
            <input v-model="prenom" class="form__input" type="text" placeholder="Prénom"/>
            <input v-model="nom" class="form__input" type="text" placeholder="Nom"/>
        </div>
        <div class="user__email">
            <span>harry.potter@groupomania.fr</span>
        </div>
        <div class="user__email" v-if="modify"> <!-- Modification -->
            <input v-model="email" class="form__input" type="text" placeholder="Adresse mail"/>
        </div>
        <div @click="update()" class="user__update">
            Modifier
        </div>
        <div class="user__update">
            Modifier le mot de passe
        </div>
        <div class="user__delete">
            Supprimer le compte
        </div>
    </div>
    <div class="nav__button">
        <fa icon="moon" />
    </div>
    <div @click="logout()" class="nav__button">
        <fa icon="door-open" />
    </div>
</div>
</template>

<script>
export default {
    name: 'Navigation',
    data: function(){
    return{
        display: false,
        modify: false,
        prenom: '',
        nom: '',
        email: '',
        password: '',
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
        update() {
        this.modify = !this.modify;
        }
    },
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
        background: white;
        border-radius: 16px;
        min-width: 250px;
        min-height: 300px;
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
        .user__update {
            border: none;
            border-radius: 8px;
            height:30px;
            width: 100%;
            color: white;
            background: #091F43;
            text-align: center;
            padding: 5px;
            margin-top: 10px;
            font-size: 0.8em;
            transition: .4s background-color;
            &:hover {
                cursor:pointer;
                border-radius: 8px;
                color: #091F43;
                background: red;
            } 
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
            margin-top: 20px;
            font-size: 0.8em;
            transition: .4s background-color;
            &:hover {
                cursor:pointer;
                border-radius: 8px;
                color: #091F43;
                background: red;
            }
        }
    }
    .nav__button {
        position: relative;
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
        svg {
        position: absolute;
        margin: auto;
        color: red;
        align-items: center;
        } 
    }          
}
</style>
