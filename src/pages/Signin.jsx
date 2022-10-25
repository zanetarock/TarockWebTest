import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../redux/user/slice";
export default function SignIn() {
  const userId = useSelector(state =>  state.user.token.userId )
  const userData = useSelector(state => state.user.token.userData )
  const dispatch = useDispatch();

  const handleClick = (e) => {
    let userId = 0; //change
    if (e.target.value === 'signin') {
      fetchUser(userId);
  
    }else if(e.target.value==='signout'){
      signout()
    }
  }


  const fetchUser = async (userId) => {
    dispatch(signIn(userId))
  }

  const signout=()=>{
    console.log('signout');
    dispatch(userSlice.actions.logOut())

  }
  return (
    <div>
      <h1>aaa</h1>
      <h1>{userId==null?<div>no user</div>:userId}</h1>
      <h2>{userData==null?<div>no user</div>:userData.name}</h2>
      <button value={"signin"} onClick={handleClick}>signin</button>
      <button value={"signout"}  onClick={handleClick}>signout</button>
      <button ><Link to="/">home</Link></button>

    </div>
  );
}
