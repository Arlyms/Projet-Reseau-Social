<template>
<div class="card__nav">   
    <div class="nav__head">
            <a href="#" class="logo">
                <img src="../assets/logo-white.png" alt="logo groupomania"/>
            </a>
        <div class="nav__link">
            <div class="nav__button" @click="showUser" title='Profil'>
                <fa icon="user" />
            </div>
            <div v-if="display" class="nav__user">
                <div class="user__addPp">
                    <img v-if="user.pictureProfile" :src="user.pictureProfile" alt=""/>
                    <img v-else src="../assets/default-user.png" alt="pp par default"/>
                    <input @change="ppFile" type="file" id="file" accept=".jpg, .jpeg, png"/>
                    <label for="file"><fa icon="camera" /></label>
                    <div v-if="filePreview" class="filePreview">
                        <img :src="filePreview" alt="file Prewiew"/>
                    </div>
                </div>    
                <div v-if="fileFields" @click="createPp()" class="addPp">Ajouter</div>
                <div class="user__info">
                    <div class="user__name" >
                    <p>{{ user.firstName }}</p>
                    <p>{{ user.name }}</p>
                    </div>
                    <div class="user__email">
                        <span>{{ user.email }}</span>
                    </div>
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
        file:'',
        filePreview:'',
    }
    },
    methods: {
        createPp: function (){
            let formData = new FormData();
            formData.append('id_user', this.user.userId);
            formData.append('pictureProfile', this.file);
            this.$store.dispatch('addPp', formData)
            .then (res => {(res); 
            this.$store.commit('updateUser', res.data.profilePicture)
            this.filePreview = '';});
        },
        showMobileNav(){
            this.mobile = window.innerWidth <= 740;
        },
        logout: function () {
            if (confirm("Voulez vous vraiment vous déconnecter ? ")) 
                this.$router.push('/login');
        },
        showUser() {
            this.display = !this.display;
        },
        deleteUser: function (id_user){
            if (confirm("Attention, Cette action est irrémédiable ")) {
                this.$store.dispatch('deleteUser', id_user),
                this.$router.push('/login');
            }
        },
        ppFile: function(event) {
            this.file = event.target.files[0];
            this.filePreview = URL.createObjectURL(this.file);
        } 
    },
    created(){
        window.addEventListener('resize',this.showMobileNav);
        this.showMobileNav();
    },
    computed : {
        ...mapState(['user']),
        fileFields: function (){
            if (this.filePreview != ""){
                return true;
            } else {
                return false;
            }
        },
    }
}
</script>


<style scoped lang="scss">

.card__nav {
    position: fixed;
    display: flex;
    z-index: 2;
    .nav__head {  
    display: flex;
    justify-content: space-between;    
    max-width: 100%;
    width: 600px;
    height : 50px;
    background-image: linear-gradient(160deg,#D1515A 0%,#091F43 70%, #091F43 100%);
    opacity: 0.9;
        a{
            img {  
                width:150px;
                margin: 12px;
            }
        }
        .nav__link {
            display: flex;    
            right: 10px;
            top: 10px;
            .nav__button {
                background-color: transparent;
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                margin: 15px;
                transition: .4s background-color;
                &:hover{
                    cursor: pointer;
                }
            }    
            .nav__user {
                z-index: 3;
                position: absolute;
                right: 0px;
                top: 50px;
                background-image: linear-gradient(rgb(255, 255, 255) 0%, #e9e9e9 100%);
                border-radius: 0px 0px 8px 8px ;
                min-width: 200px;
                min-height: 250px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: normal;
                padding: 20px;
                .user__addPp {
                    position : relative;
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
                    input[type="file"]{
                            display: none;
                    }
                    label {
                        z-index: 5;
                        position: absolute;
                        bottom: -10px;
                        right: 5px;
                        cursor: pointer;
                    }    
                    .filePreview {
                    position: absolute;     
                    top: 0;
                    border: none;
                    width: 80px;
                    height: 80px;
                    border-radius: 16px;
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            border-radius: 16px;
                        }
                    } 
                }    
                .addPp {
                    border: none;
                    border-radius: 8px;
                    height:30px;
                    width: 100%;
                    color: white;
                    background:#091F43;
                    text-align: center;
                    padding-top: 5px;
                    margin-top: 20px;
                    font-size: 0.8em;
                    transition: .4s background-color;  
                    cursor: pointer;                   
                }
                .addPp--disabled {
                    background: transparent;
                    color: #091F43;
                    cursor: not-allowed;
                }
                .user__info {
                    margin-top: 15px;
                    .user__name {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        p {
                            padding: 3px;
                            font-size: 1em;
                        }
                    }
                    .user__email {
                        font-size: 0.6em;
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
            }
        }
    } 
}

@media only screen and (max-width: 740px) {
    .card__nav {
        width: 100%;
        .nav__head{
            width: 100%;
            a{
                img { 
                    margin-left: 20px;
                    margin-top: 15px;
                }
            } 
            .nav__link {
                .nav__user {
                border-radius: 0px 0px 0px 0px ;
                width: 100%;
                height: 100vh;
                    .user__pp {
                    width: 120px;
                    height: 120px;
                    }
                    .addPp {
                        width: 70%;
                    }
                    .user__info {
                        .user__name {
                            p {
                                font-size: 1.5em;
                            }
                        }
                        .user__email {
                        margin-top: 20px;
                        font-size: 1em;
                        }
                    }   
                    .user__delete {
                            width: 70%;
                    }    
                }
            }    
        }
    }
}
</style>
