<template>
<div class="card">
    <div class="card__head">
        <img src="../assets/icon-left-font-monochrome-black.png" alt="logo groupomania"/>
    </div> 
<!--Feed-->    
    <div class="card__feed">
        <div class="card__form">
            <div class="form__author">
                <img src="../assets/harry.jpg" alt="profile Picture"/>
            </div>
            <div class="form__content">
                <textarea class="form__input" type="text"  placeholder="Quoi de neuf, Harry ? " row="1" maxlength="250"></textarea>
                <div class="from__send">
                    <div class="form__addImg">
                        <fa icon="image" />
                    </div>
                    <div class="form__button">Poster</div>     
                </div>    
            </div>
        </div>
    <!--Publication-->   
        <div v-for="post in posts" :key="post.id_post" class="card__post">
            <div class="post"> <!-- code en dur !! A changer-->
                <div class="post__author">
                    <img src="../assets/albus.jpg" alt="profile Picture"/>
                </div>
                <div class="post__content" @click="showComment(post)">
                <div class="triangle"></div>
                    <h3>{{ post.firstName }} {{ post.name }}</h3>
                    <p>{{ post.content }}</p>
                    <div class="deleteModify"> <!-- que pour l'utilisateur -->
                        <p>Modifier</p>
                        <p>Supprimer</p>
                    </div>
                </div>
                <p class="date">{{ post.date }}</p>
            </div>  
            <div v-if="post.showw" class="post__comment">
                <div class="comment__pp">
                    <img src="../assets/draco.jpg" alt="profile Picture"/>
                </div>
                <div class="comment__content">
                    <h4>Drago Malfoy</h4>
                    <p>On est premier mais comme d'hab, ça sera pas nous ..</p>
                    <div class="deleteModify"> <!-- que pour l'utilisateur -->
                        <p>Modifier</p>
                        <p>Supprimer</p>
                    </div>
                </div> 
            </div>
            <div class="post__button">
                <div class="button" @click="whriteComment(post)">Commenter</div>
            </div> 
            <div v-if="post.whrite" class="comment">
                <textarea class="comment__whriteContent" type="text" cols="50" rows="1" maxlength="100"></textarea>
                <button class="comment__button"><fa icon="paper-plane" /></button>
            </div> 
        </div>   
    <!--End-Publication-->         
</div>
<!--End-Feed-->
<!--Navigation-->    
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
            <div class="user__email">
                <span>harry.potter@groupomania.fr</span>
            </div>
            <div class="user__update">
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
<!--End-Navigation-->    
</div>      
</template>

<script>

export default {
    name: 'Feed',
    data: function(){
        return {
            display: false,
            whrite: false,
            posts: [],
        }
    },
    mounted: function () {
        if (this.$store.state.user.id_user == -1) {
            this.$router.push('/login');
            return;
        }
        console.log(this.$store.state.posts);
        // this.$store.dispatch('getUserDatas');
        this.$store.dispatch('getPosts')
        .then (res => {this.posts = res.data});
        this.$store.dispatch('getComments');
        console.log(this.$store.state.user);
    },
    methods: {
        logout: function () {
            //ajouter un "this.$store.commit('logout');"
            this.$router.push('/login');
        },
        showUser() {
            this.display = !this.display;
        },
        showComment(post) {
        post.showw = !post.showw;
        },    
        whriteComment(post) {
        post.whrite = !post.whrite;
        },
    }, 
}

</script>

<style lang="scss" scoped>

.card {
    display: flex;
    .card__head {
    z-index: 1;
    position: absolute;    
    max-width: 100%;
    width: 600px;
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
    width: 600px;
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
                display: flex;
                flex-direction: column;
                width: 80%;
                background: white;
                padding: 20px;
                padding-right: 0px;
                padding-top: 0px;
                padding-bottom: 10px;
                margin: 25px;
                margin-bottom: 0px;
                margin-top: 0px;
                .form__input {
                    padding:8px;
                    border: none;
                    background: white;
                    font-weight: 500;
                    font-size: .8em;
                    min-width: 100px;
                    width: 100%;
                    resize : none;
                    &:hover{
                        border: none;
                        outline: none;
                    }
                    &:focus {
                        border: none;
                        outline: none;
                    }
                }
                .from__send {
                    display: flex;
                    justify-content: flex-end;
                    .form__button {
                        border: none;
                        border-radius: 8px;
                        height:30px;
                        width: 30%;
                        color: white;
                        background: #091F43;
                        margin-left: 20px;
                        text-align: center;
                        padding-top: 5px;
                        font-size: 0.8em;
                        transition: .4s background-color;
                        &:hover {
                            cursor:pointer;
                            border-radius: 8px;
                            color: #091F43;
                            background: white;
                        }   
                    }
                    .form__addImg {
                        padding: 5px;
                    }
                }    
            }

        }
    .card__post{  
        .post {
            margin: 25px;
            margin-bottom: 10px;
            max-width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
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
                h3 {
                    font-size : 1em;
                }
                p {
                    margin-top:10px;
                    margin-bottom:10px;
                    font-size: .8em;
                }
                .deleteModify {
                    display: flex;
                    justify-content: flex-end;
                    p {
                        font-size: 0.6em;
                        padding-left: 8px;
                        margin-bottom: 0px;
                    }
                }
            }
            .date {
                text-align: end;
                font-size: 0.6em;
                margin-bottom: 0px;
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
        }  
        .post__comment {
            display: flex;
            margin-left: 135px;
            .comment__pp {
            min-width: 25px;
            border: none;
            width: 25px;
            height: 25px;
            border-radius: 8px;
            box-shadow: 2px 2px 5px #b0b0b0;
            margin-right: 10px;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 8px;
                }
            }    
            .comment__content {
            width: 100%;
            padding: 8px;
            margin-right: 25px;
            border: none;
            background: #e6e6e6;
            font-weight: 500;
            font-size: .6em;
            min-width: 100px;
            border-radius: 8px 8px 8px 8px ;
            box-shadow: 3px 3px 5px #b0b0b0;
            }
            .deleteModify {
                display: flex;
                justify-content: flex-end;
                p {
                    font-size: 0.8em;
                    padding-left: 8px;

                }
            }
        }  
        .post__button{
            width: 30%;
            display:flex;
            justify-content: flex-end;
            margin-top: 20px;
            .button {
                border: none;
                border-radius: 8px;
                height:30px;
                width: 30%;
                background: transparent;
                width: 100%;
                margin-left:30px;
                margin-right:30px;
                margin-bottom: 10px;
                text-align: center;
                padding-top: 5px;
                font-size: 0.8em;
                transition: .4s background-color;
                &:hover {
                    cursor:pointer;
                    border-radius: 8px;
                    color: white;
                    background: #091F43;
                }
            }
        }
        .comment {
            display: flex;
            margin-left: 130px;
            margin-top: 10px;
            margin-right: 25px;
            margin-bottom: 10px;
            .comment__whriteContent {
                width: 100%;
                padding:8px;
                border: none;
                border-right: solid 1px #091F43;
                background: #e6e6e6;
                font-weight: 500;
                font-size: .6em;
                min-width: 100px;
                border-radius: 8px 0px 0px 8px ;
                box-shadow: 3px 3px 5px #b0b0b0;
                resize : initial;
                &:hover{
                    border: none;
                    outline: none;
                }
                &:focus {
                    border: none;
                    outline: none;
                }
            } 
            .comment__button {
                width: 40px;
                padding: 5px; 
                border: none;
                background: #e6e6e6;
                box-shadow: 5px 5px 5px #b0b0b0;
                border-radius: 0px 8px 8px 0px ;
                &:hover {
                    cursor:pointer;
                    border-radius: 0px 8px 8px 0px ;;
                    color: white;
                    background: #091F43;
                }
            }
        }
    }      
    }
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
            width: 250px;
            height: 300px;
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

}
</style>