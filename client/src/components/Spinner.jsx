import ClockLoader from "react-spinners/ClockLoader";

const override = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	margin: "100px auto",
};

const Spinner = ({ loading }) => {
	return (
		<ClockLoader
			color="#242839"
			loading={loading}
			cssOverride={override}
			size={100}
			speedMultiplier={2}
		/>
	);
};

export default Spinner;
