// Login users
let Username = document.getElementById('username');
let Password = document.getElementById('password');
function checkLogin() {
    if (JSON.parse(localStorage.getItem("user")).token) {
      window.location.replace("home.html");
    }
  }
  
async function LoginApi(){

   
        //   Get user
        const res = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: Username.value,
            password: Password.value,
          }),
        });
        const data = await res.json();
    
        //   save user
        let user = null;
        user = { ...data };
        console.log(user.token);
    
        //   check token
        if (user.token) {
          localStorage.setItem("user", JSON.stringify(user));
          window.location.replace("home.html");
        } else {
          alert("please enter valid Info");
        }



//     fetch('https://dummyjson.com/auth/login', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
    
//     username: Username.value,
//     password: Password.value,
//     // expiresInMins: 60, // optional
//   })
// })
// .then(res => res.json(),
//     // localStorage.setItem('token', res.body.token)

// )
// .then(
//     function(data)
//     {
    
//     localStorage.setItem('token',JSON.stringify(data.token));
//     localStorage.setItem('login', true);
//     localStorage.setItem('id',JSON.stringify(data.id));
//     localStorage.setItem('email',JSON.stringify(data.email));
//     localStorage.setItem('firstname',JSON.stringify(data.firstName));
//     localStorage.setItem('lastname',JSON.stringify(data.lastName));
//     localStorage.setItem('gender',JSON.stringify(data.gender));
//     localStorage.setItem('username',JSON.stringify(data.username));
//     localStorage.setItem('image',JSON.stringify(data.image));
   
//     window.location.href = "home.html";
    
  
// });

}

