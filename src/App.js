import React, { useEffect,useMemo,useReducer } from 'react';
import { Spinner } from "react-activity";
import Login from './components/login';
import Registration from './components/registration';
import WelcomePage from './components/welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthContext} from './components/context';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";




function App() {
 
  // const [islogged,setIsLogged] = useState(true);
  // const [userToken,setUserToken] = useState(null);

  const initialLoginState = {
    isLoading: true,
    userToken: null,
    userName: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
         
        };
        default:
          return{
            ...prevState
          }

    }
  };

  const [loginState, dispatch] = useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = useMemo(
    () => ({
      signIn:  (foundUser) => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        const userToken = String(foundUser[4]);
        const userName = foundUser[1];

        
        console.log("yes");
        // const userToken = String(foundUser[4]);
      
        // const userName = foundUser[3];

        
          localStorage.setItem('userToken', userToken);
          localStorage.setItem('userName',userName);
          // localStorage.setItem('userToken', userToken);
        
        // console.log('user token: ', userToken);
        dispatch({
          type: 'LOGIN',
          id: userName,
          token: userToken
        });
      },
      signOut:  () => {
        
      
          localStorage.removeItem('userToken');
          localStorage.removeItem('userName');
          // localStorage.multiRemove(['tasksItems', 'email', 'password', 'data'])
      
        dispatch({
          type: 'LOGOUT'
        });
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        
       
        dispatch({
          type: 'REGISTER',
        
        });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout( () => {
      let userToken;
      userToken = null;
      userToken = localStorage.getItem('userToken');
    
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);



  if(loginState.isLoading){
    // setInterval(() => {
    //   initialLoginState.isLoading=false;
    // }, 1000);
    return(
    <div className="Spinner">
      <Spinner color="darkorchid"/>
    </div>)
    
    
  }
 
 
  return(
    
    <AuthContext.Provider value={authContext}>
      {loginState.userToken===null?  
      <div>
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Login}/>
          <Route path="/Registration"   component={Registration}/>
        </Switch>
      </Router>
       </div>:
  <div className="App">
      
  <Router>
    <Switch>
      <Route path="/" exact={true}><WelcomePage/></Route>
    </Switch>
  </Router>


    
</div>}

    </AuthContext.Provider>
 )
  
}

export default App;
