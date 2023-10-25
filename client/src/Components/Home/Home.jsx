import Styles from "./Home.module.css";
import { Carrousel } from "../Carrousel/Carrousel";

const Home = () => {
	return (
		<div className={Styles.homeContainer}>
			<Carrousel/>
		</div>
	);
};

export default Home;
