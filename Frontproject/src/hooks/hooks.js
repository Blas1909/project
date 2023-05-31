import jwt_decode from "jwt-decode"
import { useDispatch } from "react-redux"
import { login_success_action } from "../redux/actions/actions"

export const useIsLoggedIn = (shouldCheck) => {

    const dispatch = useDispatch()

    if(shouldCheck){
        const userInfoStorage = localStorage.getItem("user-info")
        if(userInfoStorage!==null && userInfoStorage!==undefined){
            const userInfo = JSON.parse(userInfoStorage)
            const { id } = jwt_decode(userInfo.token)
            if(`${id}` === `${userInfo.id}`){
                dispatch(login_success_action(userInfo))
                return true
            }
        }
    }
    return false;
}

