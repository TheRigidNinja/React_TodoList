const initState = {
  authAcess: false,
  authInfor: false,
  userID:null,
  Profile: null
};

const authReducer = (state = initState, action) =>{
    if (action.type === "UPDATE") { return { ...state, authAcess: action.data }; } 
    if (action.type === "UPDATEINFOR") { return { ...state, authInfor: action.data }; }
    if (action.type === "USERID") { return { ...state, userID: action.data }; }
    if (action.type === "PROFILE") { return { ...state, Profile: action.data }; }
    return state
}


// const mapDispatchToProps = (dispatch) => {
//     return {
//         anthAcess: (status) => { anthAcess(status) }
//     }
// }


export default authReducer