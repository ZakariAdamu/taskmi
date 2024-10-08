import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	// Array destructuring
	const { email, password } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Select items from our global state: i.e state.auth
	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		// check if user successfully registers, then navigate user to user dashboard
		if (isSuccess || user) {
			navigate("/");
		}
		dispatch(reset());
		// localStorage.clear();
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const onSubmit = (e) => {
		e.preventDefault();

		const userData = {
			email,
			password,
		};
		dispatch(login(userData));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="heading">
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Login and manage your tasks effectively 📝</p>
			</section>
			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							value={email}
							placeholder="Enter your email"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							value={password}
							placeholder="Enter your password"
							onChange={onChange}
						/>

						<div className="form-group">
							<button
								type="submit"
								className="btn btn-block"
								onSubmit={onSubmit}
							>
								Submit
							</button>
						</div>
					</div>
				</form>
			</section>
		</>
	);
};

export default Login;
