import "./ErrorPage.css";

export default function ErrorPage({ message }) {
	return (
		<div className='error_wrapper'>
			<h2 className='error_oops'>Oops something went wrong!</h2>
			<h3 className='error_msg'> {message}</h3>
		</div>
	);
}