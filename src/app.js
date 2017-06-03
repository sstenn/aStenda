import GoogleLogin from 'react-google-login';
var Auth = require('./auth.js');

const userId = sessionStorage.getItem('userId');

const loginSuccess = (response) => {
  var userId   = response['profileObj']['googleId']
  var userName = response['profileObj']['name']
  var userMail = response['profileObj']['email']


  ReactDOM.render(<Auth id={userId} name={userName} mail={userMail} />, document.getElementById('app'))
}

const loginFailure = (response) => {
  console.log(response);
}


if(userId){

  ReactDOM.render(<Auth />, document.getElementById('app'));

}else{
  ReactDOM.render(
      <GoogleLogin
          clientId="486491156289-1kvp2o81li65uq6vvon9odn01crv3fq2.apps.googleusercontent.com"
          buttonText="Login"
          prompt="select_account"
          onSuccess={loginSuccess}
          onFailure={loginFailure} />, document.getElementById('app')
  );  

}


    /*let renderReact = () => {
        if(typeof gapi == 'undefined') {
            console.log('no gapi yet');
            _.debounce(renderReact, 500)();
        } else {
            ReactDOM.render(<Login />, document.getElementById("app"));
        }
    };*/

//ReactDOM.render(<Login />, document.getElementById('app'));
