<template>
<!--Feed--> 
<div class="card">  
    <!--Navigation-->
    <Navigation/>    
    <router-view></router-view>
    <!--End-Navigation--> 
    <div class="card__feed">
        <div class="card__form">
            <div class="form__author">
                <div v-if="user.admin" class="crown">
                    <fa icon="star" />
                </div>
                <img v-if="user.pictureProfile" :src="user.pictureProfile" alt="profile Picture"/>
                <img v-else src="../assets/default-user.png" alt="pp par default"/>
            </div>
            <div class="form__content">
                <textarea v-model="postContent" class="form__input" type="text"  :placeholder=" 'Quoi de neuf, ' + user.firstName + ' ?' " row="1" maxlength="250"></textarea>
                <div class="form__end">
                    <div class="form__addImg">
                        <input @change="postFile" type="file" id="file" accept=".jpg, .jpeg, png"/>
                        <label for="file"><fa icon="image" /></label>
                        <div v-if="filePreview" class="filePreview">
                            <img :src="filePreview" alt="file Prewiew"/>
                        </div>
                    </div>           
                    <div class="form__send">
                        <div @click="createPost()"  class="form__button" :class="{'form__button--disabled' : !textFieldsPost}"> Poster </div>     
                    </div>
                </div>        
            </div>
        </div>
    <!--Publication-->   
        <div v-for="(post,index) in posts" :key="post.id_post" class="card__post">
            <div class="post"> 
                <div class="post__author">
                    <div v-if="post.admin" class="crown">
                        <fa icon="star" />
                    </div>
                    <img v-if="post.pictureProfile" :src="post.pictureProfile" alt="profile Picture"/>
                    <img v-else src="../assets/default-user.png" alt="pp par default"/>
                </div>
                <div class="post__content" @click="showComment(post)">
                    <h3>{{ post.firstName }} {{ post.name }}</h3>
                    <p>{{ post.content }}</p>
                        <img :src="post.imageUrl"/>
                    <div v-if="user.userId == post.id_user || user.admin" class="delete"> 
                        <p @click="deletePost(post.id_post,index)">Supprimer</p>
                    </div>
                </div>
                <p v-if="!mobile" class="date--post">{{ post.date }}</p>
            </div>  
            <div v-if="post.showw"  class="post__comment"> 
                <div class="comment" v-for="(comment,indexC) in post.comments" :key="comment.id_comment">
                    <div class="comment__pp">
                        <img v-if="comment.pictureProfile" :src="comment.pictureProfile" alt="profile Picture"/>
                        <img v-else src="../assets/default-user.png" alt="pp par default"/>
                    </div>
                    <div class="comment__content">
                        <h4>{{ comment.firstName }} {{ comment.name }}</h4>
                        <p>{{ comment.content }}</p>
                        <div v-if="user.userId == comment.id_user || user.admin" class="deleteCom"> 
                            <p @click="deleteComment(comment.id_comment,indexC,post)">Supprimer</p>
                        </div>
                    </div> 
                    <div v-if="!mobile" class="date--com">{{ comment.date }}</div>
                </div>    
            </div>
            <div class="post__button">
                <div class="button" @click="showComment(post)">Commenter</div>
            </div> 
            <div v-if="post.whrite" class="comment__whrite">
                <textarea v-model='commentContent' class="comment__whriteContent" type="text" cols="20" rows="1" maxlength="100"></textarea>
                <button @click="whriteComment(post)" class="comment__button" :class="{'comment__button--disabled' : !textFieldsComment}"><fa icon="paper-plane" /></button>
            </div> 
        </div>   
    <!--End-Publication-->         
    </div>
<!--End-Feed-->   
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
            file:'',
            filePreview:'',
            mobile: true,
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
        this.$store.dispatch('getPosts')
        .then (res => {this.posts = res.data});
    },
    methods: {
        showMobileNav(){
            this.mobile = window.innerWidth <= 740;
        },
        showComment(post) {
            this.$store.dispatch('getComments', post.id_post)
            .then (res => post.comments = res.data);
            post.showw = !post.showw;
            this.showWhriteComment(post);
        },    
        showWhriteComment(post) {
        post.whrite = !post.whrite;
        },
        whriteComment: function (post) {
            this.$store.dispatch('createComment', {
                content: this.commentContent,
                id_user: this.user.userId,
                id_post: post.id_post,
            }).then (response => {(response); post.comments.push(response.data[0]);
            this.commentContent = '';})
        },
        createPost: function () {
            let formData = new FormData();
            formData.append('imageUrl', this.file);
            formData.append('id_user', this.user.userId);
            formData.append('content', this.postContent);
            this.$store.dispatch('createPost', formData)
            .then (response => {(response); this.posts.unshift(response.data[0]); 
            this.postContent = ''; this.file = ''; this.filePreview = '';})
        },
        deletePost: function(id,index) {
            if (confirm("Voulez vous vraiment supprimer ce post ?")){
                this.$store.dispatch('deletePost', id)
                .then (response => (response),
                this.posts.splice(index,1));
            }
        },
        deleteComment: function(idComment,index,post) {
            if (confirm("Voulez vous vraiment supprimer ce commentaire ?")){
                this.$store.dispatch('deleteComment', idComment)
                .then (response => (response),post.comments.splice(index,1));
            }    
        },
        postFile: function(event) {
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
    color:#091F43;
    .card__feed {
    display: flex;
    flex-direction: column;    
    position: relative;    
    width: 600px;
    height : 100%;
    background: #ffe3e5;
    border-radius: 8px 8px 8px 8px;
        .card__form {
            max-width: 100%;
            display:flex;
            justify-content: space-between;
            padding-top: 70px; 
            border-bottom:  1px  solid #b0b0b0;
            .form__author {
                position: relative;
                border: none;
                min-width: 50px;
                max-width: 50px;
                height: 50px;
                border-radius: 16px;
                background-image: linear-gradient(rgb(255, 255, 255) 0%, #e9e9e9 100%);
                box-shadow: 2px 2px 5px #b0b0b0;
                margin-left: 25px;
                .crown {
                    position: absolute;
                    z-index: 1;
                    right: 4px;
                    bottom: 2px;
                    font-size: 0.6em;
                    color: rgb(255, 217, 0);
                }
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
                .form__end {
                display: flex;
                justify-content: flex-end;    
                    .form__addImg {
                    padding-top: 4px;
                        input[type="file"]{
                            display: none;
                        }
                        label{
                            cursor: pointer;
                        }
                        .filePreview {
                            max-width: 300px;
                            border-radius: 8px;
                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                border-radius: 8px;
                            }
                        }
                    }    
                    .form__send {
                        display: flex;
                        justify-content: flex-end;
                        .form__button {
                            border: none;
                            border-radius: 8px;
                            height:30px;
                            width: 100px;
                            color: white;
                            background: #091F43;
                            margin-left: 20px;
                            text-align: center;
                            padding-top: 5px;
                            font-size: 0.8em;
                            transition: .4s background-color;  
                            cursor: pointer;
                        }
                        .form__button--disabled {
                            background:#ffe3e5;
                            color: #091F43;
                            cursor: not-allowed;
                        }
                    }
                }        
            }
        }
    .card__post{      
        border-top: 1px solid#b0b0b0;  
        .post {
            margin: 25px;
            margin-bottom: 10px;
            max-width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .post__author{
                position: relative;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 16px;
                box-shadow: 2px 2px 5px #b0b0b0;
                .crown {
                    position: absolute;
                    z-index: 1;
                    right: 4px;
                    bottom: 2px;
                    font-size: 0.6em;
                    color: rgb(255, 217, 0);
                }
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
                img {
                    max-width: 100%;
                    border-radius: 8px;
                }
                .delete {
                    display: flex;
                    justify-content: flex-end;
                    p {
                        font-size: 0.6em;
                        padding-left: 8px;
                        margin-bottom: 0px;
                        transition: transform .2s;
                        &:hover {
                            transform: scale(1.05);
                            color: rgb(202, 0, 0);
                            font-weight: 600;
                            cursor: pointer;
                        }
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
                .deleteCom {
                    p {
                        font-size: 0.6em;
                        padding-left: 8px;
                        margin-bottom: 0px;
                        transition: transform .2s;
                        &:hover {
                            transform: scale(1.05);
                            color: rgb(202, 0, 0);
                            font-weight: 600;
                            cursor: pointer;
                        }
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
                    padding-left: 20px;
                    padding-right: 20px;
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
                cursor: pointer;
            }
            .comment__button--disabled {
                color: #e6e6e6;
                background: #e6e6e6;
                width: 40px;
                padding: 5px; 
                border: none;
                box-shadow: 5px 5px 5px #b0b0b0;
                border-radius: 0px 8px 8px 0px ;
                cursor: not-allowed;
            }
        }
    }      
}
}

@media only screen and (max-width: 740px) {
    .card {
        .card__feed {
            width: 100%;
            .card__post{
                .post__comment {
                    .comment {
                        margin-left: 100px;
                        margin-right: 15px;
                        }
                }
            }       
        }
    }
}
</style>