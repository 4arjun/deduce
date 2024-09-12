import { useContext } from 'react';
import UserContext from '../context/user/userContext';
import { ApiContext } from '../context/api/apiContext';
import ErrorPage from './Error/ErrorPage';
import './ProtectedRoute.css';

export function login() {
	const authRedirUrl = process.env.REACT_APP_AUTH_REDIR_URL;
	console.log('Redirecting to auth');
	const currUrl = new URL(window.location.href);
	const redirectUrl = encodeURIComponent(currUrl.toString());
	const authUrl = new URL(authRedirUrl);
	authUrl.searchParams.set('redirect_to', redirectUrl);
	window.location.href = authUrl.toString();
	return;
}

export default function ProtectedRoute(props) {
	const { userData, userLoading, userError } = useContext(UserContext);
	const { checkingLogginIn } = useContext(ApiContext);

	if (checkingLogginIn || userLoading) {
		return (
			<div className='protected__wrapper'>
				<h3 className='protected__loading_txt'>Loading...</h3>
			</div>
		);
	}

	if (userError) {
		return <ErrorPage error={userError} />;
	}

	if (!userData.loggedIn) {
		return (
			<div className='protected__wrapper'>
				<h3 className='protected__login_txt'>Please login to play</h3>
				<button className='protected__login_btn' onClick={login}>
					Login
				</button>
			</div>
		);
	}

	return props.children;
}