import {useSelector} from 'react-redux';
const User=()=>{
    const uname=useSelector((state)=>state.user.user.username);
    const ppic=useSelector((state)=>state.user.user.profilepic);
    const dpic="https://www.pngmart.com/files/23/Profile-PNG-Photo.png";
    return(
        <>
           <img src={ppic?ppic:dpic} className='profilepic'/>
           {uname}
        </>
    )
}
export default User;