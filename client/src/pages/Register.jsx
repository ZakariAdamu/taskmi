import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	// Array destructuring
	const { name, email, password, confirmPassword } = formData;

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

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
		} else {
			const userData = {
				name,
				email,
				password,
			};

			dispatch(register(userData));
		}

		if (isLoading) {
			return <Spinner />;
		}
	};

	return (
		<>
			<section className="heading">
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>
			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="name"
							name="name"
							value={name}
							placeholder="Enter your name"
							onChange={onChange}
						/>
					</div>
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
							<input
								type="password"
								className="form-control"
								id="confirmPassword"
								name="confirmPassword"
								value={confirmPassword}
								placeholder="Confirm your password"
								onChange={onChange}
							/>
						</div>
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

export default Register;
