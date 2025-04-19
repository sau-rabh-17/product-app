export const SIGNUP = 'SIGN_UP';

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD2nvg6A-Na_lYxbDAsiKIjvw_URSI2TjA',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );
        if(!response.ok){
            throw new Error('Something Went Erong')
        }
        const resData = await response.json();
        console.log(resData);
        dispatch({ type: SIGNUP })
    }
}