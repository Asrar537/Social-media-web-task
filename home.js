let userData = JSON.parse(localStorage.getItem("user"));
let userName = document.getElementById("username");
let subuserName = document.getElementById("subusername");
let userImage = document.getElementById("profile-img");
let storyuserImage = document.getElementById("story-profile-img");
let slideuserImage = document.getElementById("slide-profile-img");
let postuserImage = document.getElementById("post-profile-img");
userName.innerText = `${userData.firstName}`;
subuserName.innerText = `@${userData.firstName}`;

userImage.src = `${userData.image}`;
slideuserImage.src = `${userData.image}`;
storyuserImage.src = `${userData.image}`;
postuserImage.src = `${userData.image}`;

const menuItems = document.querySelectorAll(".menu-item");
const messagesNotification = document.querySelector("#messages-notifications");
const messages = document.querySelector(".messages");
const message = document.querySelectorAll(".message");
const messageSearch = document.querySelector("#message-search");
const search = document.getElementById("search");
let searchvalue= search.value.trim();
const searchbtn = document.getElementById("search-btn");
const feeds = document.getElementById("feeds");

// ===========Side bar ================
// remove active class from all menu items
const changActiveItem = () => {
  menuItems.forEach((item) => {
    item.classList.remove("active");
  });
};

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    changActiveItem();
    item.classList.add("active");
    if (item.id != "notifications") {
      document.querySelector(".notifications-popup").style.display = "none";
    } else {
      document.querySelector(".notifications-popup").style.display = "block";
      document.querySelector(
        "#notifications .notifications-count"
      ).style.display = "none";
      setTimeout(() => {
        document.querySelector(".notifications-popup").style.display = "none";
      }, 2000);
    }
  });
});

// ==============Messages=====================

const searchMessage = () => {
  const val = messageSearch.value.toLowerCase();
  message.forEach((user) => {
    let name = user.querySelector("h5").textContent.toLowerCase();
    if (name.indexOf(val) != -1) {
      user.style.display = "flex";

    } else {
      user.style.display = "none";
    }
  });
};

messageSearch.addEventListener("keyup", searchMessage);
messagesNotification.addEventListener("click", () => {
  messages.style.boxShadow = "0 0 1rem var(--color-primary)";
  document.querySelector(
    "#messages-notifications .notifications-count"
  ).style.display = "none";

  setTimeout(() => {
    messages.style.boxShadow = "none";
  }, 2000);
});

const logout = document.getElementById("logout-btn");
logout.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.replace("index.html");
});
// ===================get posts====================
searchbtn.addEventListener('click',()=>{
   if(search.value.length >0){
    feeds.innerHTML="";
    const ApiSearch = `https://dummyjson.com/posts/search?q=${search.value}`;
    Getposts(ApiSearch);
   }else{
    Getposts('https://dummyjson.com/posts')
   }
})
async function Getposts(URL) {
  let postsArray = [];
  let UserArray= [];
  let commentsArray= [];
//   ========Fetching users==================

  const userResponse = await fetch(`https://dummyjson.com/users`);
const userResponseData = await userResponse.json();
console.log(userResponseData)
  UserArray= userResponseData.users;
//   ========Fetching comments==================
  const commentResponse = await fetch(`https://dummyjson.com/comments`);
    const commentResponseData = await commentResponse.json();
      commentsArray= commentResponseData.comments;

//   ========Fetching posts==================

  const res = await fetch(URL);
  const data = await res.json();

  console.log(data);
   postsArray = data.posts; 
   console.log(postsArray);
   for (let i = 0; i < postsArray.length; i++) {
    let user=[];
    let com= [];
    for(u= 0; u < UserArray.length; u++){
        if( UserArray[u].id === postsArray[i].userId  ){
            user = UserArray[i];
        }
    }
   
   

    for(u= 0; u < commentsArray.length; u++){
        if( commentsArray[u].id === postsArray[i].postId  ){
            com = commentsArray[i];
        }
    }
    
    const post = `
    <div class="feed">
    <div class="head">
      <div class="user">
        <div class="profile-photo">
          <img src="${user.image}" alt="${user.id}" />
        </div>
        <div class="info">
          <h3>${ user.firstName  }</h3>
          <small>Dubai, 15 minutes ago</small>
        </div>
      </div>
      <span class="edit">
        <i class="uil uil-ellipsis-h"></i>
      </span>
    </div>
    <div class="photo">
     <h2>${postsArray[i].title}</h2>
            <p style="font-size: 0.9rem;">${postsArray[i].body}</p>
    </div>
    <div class="action-buttons">
      <div class="interaction-buttons">
        <span><i class="uil uil-heart"></i></span>
        <span><i class="uil uil-comment-alt"></i></span>
        <span><i class="uil uil-share-alt"></i></span>
      </div>
      <div class="bookmark">
        <i class="uil uil-bookmark"></i>
      </div>
    </div>
    <div class="liked-by">
      <span><img src="./images/profile-13.jpg" /></span>
      <span><img src="./images/profile-11.jpg" /></span>
      <span><img src="./images/profile-15.jpg" /></span>
      <p>
        Like by
        <b>${+postsArray[i].reactions}</b>
       
      </p>
    </div>
    <div class="captions">
      <p>
        <b>Lana Rose</b>
        ${postsArray[i].tags.map((tag) => {
            return `<span class="hash-tag">#${tag}</span>`;
          })}  
      </p>
    </div>
    <div class="comments text-muted">${com.id}
      View all coomments
    </div>
  </div>
    `;
   feeds.innerHTML += post;
  // feeds.innerHTML =""
  // postsArray = data.posts;
  // console.log("counting");
  // feeds.innerHTML += feed;
}

}
document.loaded=Getposts('https://dummyjson.com/posts');

// ==================comments====================
