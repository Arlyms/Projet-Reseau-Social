<template>
     <div class="card">
        <div class="card-left">

            <h1 class="card__title" v-if = "mode == 'login'">Connexion</h1> <!-- Mode Connexion -->
            <h1 class="card__title" v-else>Inscription</h1> <!-- Mode Inscription -->

            <div class="card__form" v-if = "mode == 'create'"> <!-- Mode Inscription -->
                <input v-model="prenom" class="form__input" type="text" placeholder="Prénom"/>
                <input v-model="nom" class="form__input" type="text" placeholder="Nom"/>
            </div>

            <div class="card__form">
                <input v-model="email" class="form__input" type="text" placeholder="Adresse mail"/> <!-- Les deux -->
            </div>

            <div class="card__form">
                <input v-model="password" class="form__input" type="text" placeholder="Mot de passe"/> <!-- Les deux -->
            </div>

            <div class="card__form">
                <button class="card__button" :class="{'card__button--disabled' : !validatedFields}" v-if = "mode == 'login'"> <!-- Mode Connexion -->
                Connexion
                </button>
                <button class="card__button" :class="{'card__button--disabled' : !validatedFields}" v-else> <!-- Mode Inscription -->
                Créer mon compte
                </button>
            </div>

            <p class="card__subtitle card__action" v-if = "mode == 'login'" @click="switchToCreateAccount()">Créer un compte</p> <!-- Mode Connexion -->
            <p class="card__subtitle card__action" v-else @click="switchToLogin()">Se connecter</p> <!-- Mode Inscription --> 

        </div>
        
        <div class="card-right"> 
           <img class="card-right__img1" src="../assets/icon.png" alt="logo groupomania"/> 
           <img class="card-right__img2" src="../assets/icon-left-white-rongn.png" alt="logo groupomania"/>
        </div>   
    </div>     
</template>
   
<script>
 export default {  
    name: 'Login',
    data: function() {
        return {
            mode: 'login',
            prenom: '',
            nom: '',
            email: '',
            password: '',
        }
    },

    computed: {
        validatedFields: function () {
            if (this.mode == 'create') { 
                if (this.prenom != "" && this.nom != "" && this.email != "" && this.password != "" ) {
                    return true;
                } else {
                    return false;
                }  
            } else {
                if (this.email != "" && this.password != "") {
                    return true;
                } else {
                    return false;
                }   
            }
        }  
    },

    methods: {
        switchToCreateAccount: function () {
            this.mode = 'create';
        },
        switchToLogin: function () {
            this.mode = 'login';
        }
    } 
}
</script>

<style lang="scss">
.card{
    display: flex;
    .card-right {
        position: relative;
        background-image: linear-gradient(160deg,#D1515A 0%,#091F43 70%, #091F43 100%);
        max-width: 100%;
        width: 700px;
        height : 500px;
        border-radius: 0px 8px 8px 0px;
        padding:32px;
        .card-right__img1 {
            position: absolute;
            right: 0px;
            bottom: 0px;
            height: 350px;
        }
        .card-right__img2  {
            position: absolute;
            left: 20px;
            bottom: 20px;
            width: 200px;
        }
    }
    .card-left { 
    max-width: 100%;
    width: 350px;
    height : 500px;
    background: white;
    border-radius: 8px 0px 0px 8px;
    padding:32px;
    
        .card__title {
            text-align:center;
            font-weight: 800;   
        }
        
        .card__subtitle {
            text-align: center;
            font-weight: 500;
        }
        
        .card__button {
            background: #103065; // rose : F1616B / D1515A 
            color:white;
            border-radius: 8px;
            font-weight: 800;
            font-size: 15px;
            border: none;
            width: 100%;
            padding: 16px;
            transition: .4s background-color;
            &:hover {
                cursor:pointer;
                background: #091F43;
            }
        }
        
        .card__action {
            text-decoration: none;
            &:hover {
                cursor:pointer;
            }
        }
        
        .card__button--disabled {
            background:#cecece;
            color:#ececec;
            &:hover {
                cursor: not-allowed;
                background: #cecece;
            }
        }
        
        .card__form {
            display: flex;
            margin: 16px 0px;
            gap:16px;
            flex-wrap: wrap;
        }  

        .form__input {
            padding:8px;
            border: none;
            border-radius: 5px;
            background:#f2f2f2;
            font-weight: 500;
            font-size: 14px;
            flex:1;
            min-width: 100px;
            &::placeholder {
                color:#aaaaaa;
            }
        }  
    }
}    
</style>