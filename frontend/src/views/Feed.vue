<template>
<div class="card">
    <div class="card__head">
        <img src="../assets/icon-left-font-monochrome-white.png" alt="logo groupomania"/>
    </div> 
<!--Feed-->    
    <div class="card__feed">
        <div class="card__form">
            <div class="form__author">
                <img src="../assets/harry.jpg" alt="profile Picture"/>
            </div>
            <div class="form__content">
                <textarea v-model="postContent" class="form__input" type="text"  :placeholder=" 'Quoi de neuf, ' + user.firstName + ' ?' " row="1" maxlength="250"></textarea>
                <div class="from__send">
                    <div class="form__addImg">
                        <fa icon="image" />
                    </div>
                    <div @click="createPost()"  class="form__button" :class="{'form__button--disabled' : !textFieldsPost}"> Poster </div>     
                </div>    
            </div>
        </div>
    <!--Publication-->   
        <div v-for="(post,index) in posts" :key="post.id_post" class="card__post">
            <div class="post"> <!-- code en dur !! A changer-->
                <div class="post__author">
                    <img src="../assets/albus.jpg" alt="profile Picture"/>
                </div>
                <div class="post__content" @click="showComment(post)">
                    <h3>{{ post.firstName }} {{ post.name }}</h3>
                    <p>{{ post.content }}</p>
                    <div class="deleteModify"> <!-- que pour l'utilisateur -->
                        <button @click="deletePost(post.id_post,index)">Supprimer</button>
                    </div>
                </div>
                <p class="date--post">{{ post.date }}</p>
            </div>  
            <div v-if="post.showw"  class="post__comment"> <!--1-->
                <div class="comment" v-for="comment in post.comments" :key="comment.id_comment">
                    <div class="comment__pp">
                        <img src="../assets/draco.jpg" alt="profile Picture"/>
                    </div>
                    <div class="comment__content">
                        <h4>{{ comment.firstName }} {{ comment.name }}</h4>
                        <p>{{ comment.content }}</p>
                        <div class="deleteModify"> <!-- que pour l'utilisateur -->
                            <p @click="deletePost(post.id_comment,index)">Supprimer</p>
                        </div>
                    </div> 
                    <div class="date--com">{{ comment.date }}</div>
                </div>    
            </div>
            <div class="post__button">
                <div class="button" @click="showComment(post); showWhriteComment(post)">Commenter</div>
            </div> 
            <div v-if="post.whrite" class="comment__whrite">
                <textarea v-model='commentContent' class="comment__whriteContent" type="text" cols="50" rows="1" maxlength="100"></textarea>
                <button @click="whriteComment(post.id_post,index)" class="comment__button" :class="{'comment__button--disabled' : !textFieldsComment}"><fa icon="paper-plane" /></button>
            </div> 
        </div>   
    <!--End-Publication-->         
    </div>
<!--End-Feed-->
<!--Navigation-->
<Navigation/>    
<router-view></router-view>
<!--End-Navigation-->    
</div>      
</template>

<script>
import Navigation from "../components/Navigation.vue"
import { mapState } from "vuex"

export default {
    name: 'Feed',
    data: function(){
        return {
            whrite: false,
            posts: [],
            postContent: '',
            commentContent:'',
        }
    },
    components: {
        Navigation,
    },
    mounted: function () {
        if (this.$store.state.user.id_user == -1) {
            this.$router.push('/login');
            return;
        }
        this.$store.dispatch('getPosts') // recuperation des posts
        .then (res => {this.posts = res.data});
        // this.$store.dispatch('getUserDatas');// recuperation des infos du user connecté
    },
    methods: {
        showComment(post) {
        console.log(post);
        this.$store.dispatch('getComments', post.id_post)
        .then (res => post.comments = res.data);
        post.showw = !post.showw;
        },    
        showWhriteComment(post) {
        post.whrite = !post.whrite;
        },
        whriteComment: function (postId,index) {
            console.log(index);
            console.log(this.posts[index]);
            this.$store.dispatch('createComment', {
                content: this.commentContent,
                id_user: this.user.userId,
                id_post: postId,
            }).then (response => {console.log(response); this.posts[index].comments.unshift(response.data[0]) } )
        },
        createPost: function () {
            this.$store.dispatch('createPost', {
                content: this.postContent,
                id_user: this.user.userId, 
            }).then (response => {console.log(response); this.posts.unshift(response.data[0]) } )
        },
        deletePost: function(id,index) {
            console.log(index);
            this.$store.dispatch('deletePost', id)
            .then (response => {console.log(response);
            this.posts.splice(index,1)});
        },
        deleteComment: function(id,index) {
            console.log(index);
            this.$store.dispatch('deleteComment', id)
            .then (response => {console.log(response);
            this.posts[index].comments.splice(index,1)});
        },
    },
    computed : {
            ...mapState(['user']),
        textFieldsPost: function (){
            if (this.postContent != ""){
                return true;
            } else {
                return false;
            }
        },
        textFieldsComment: function (){
            if (this.commentContent != ""){
                return true;
            } else {
                return false;
            }
        },
    },
}

</script>

<style lang="scss" scoped>

.card {
    display: flex;
    color:#091F43;
    .card__head {
    z-index: 1;
    position: absolute;    
    max-width: 100%;
    width: 600px;
    height : 10px;
    background-image: linear-gradient(160deg,#D1515A 0%,#091F43 70%, #091F43 100%);
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
    background: #ffe3e5;
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
                background: #ffe3e5;
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
                    background: #ffe3e5;
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
                    }
                    .form__button--disabled {
                        background:#ffe3e5;
                        color: #091F43;
                    }
                    .form__addImg {
                        padding: 5px;
                    }
                }    
            }
        }
    .card__post{      
        border-bottom: 1px solid#b0b0b0; // sauf le dernier ? 
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
                background-image: linear-gradient(rgb(255, 255, 255) 0%, #e9e9e9 100%);
                padding: 20px;
                padding-top: 10px;
                padding-bottom: 10px;
                border-radius: 0px 8px 8px 8px ;
                box-shadow: 5px 5px 5px #c9c9c9;
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
            .date--post {
                text-align: end;
                font-size: 0.6em;
                margin-bottom: 0px;
            }
        }  
        .post__comment{
            .comment {
                display: flex;
                margin-left: 135px;
                margin-bottom: 10px;
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
                margin-right: 10px;
                border: none;
                background-image: linear-gradient(rgb(231, 231, 231) 0%, #d8d8d8 100%);
                font-weight: 500;
                font-size: .6em;
                min-width: 100px;
                border-radius: 0px 8px 8px 8px ;
                box-shadow: 3px 3px 5px #b0b0b0;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                    h4 {
                        width: 100%;
                    }
                    p{
                        width: 70%;
                    }
                }
                .deleteModify {
                    p {
                        font-size: 0.8em;
                        padding-left: 8px;
                    }
                }
                .date--com {
                    font-size: 0.2em;
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
        .comment__whrite {
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
                    outline: none;
                }
                &:focus {
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
                transition: .4s background-color;  
            }
            .comment__button--disabled {
                color: #e6e6e6;
                background: #e6e6e6;
                width: 40px;
                padding: 5px; 
                border: none;
                box-shadow: 5px 5px 5px #b0b0b0;
                border-radius: 0px 8px 8px 0px ;
            }
        }
    }      
}
}
</style>