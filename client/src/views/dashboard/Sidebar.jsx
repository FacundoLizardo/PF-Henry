import style from "./Dashboard.module.css";
import Button from "../../Components/Button/Button";
import logo from "../../assets/logo.png";
export const Sidebar = ({ onButtonClick }) => {
	return (
		<div className={style.menuContext}>
			<h1 className={style.panelAdminTitle}>
				Panel de Administracion
				<img src={logo} width={"180px"} />
			</h1>
			<ul className={style.menu}>
				<Button text={"Usuarios"} onClick={() => onButtonClick("Usuarios")}>
					Users
				</Button>
				<Button text={"Cursos"} onClick={() => onButtonClick("Cursos")}>
					courses
				</Button>
				<Button text={"Pagos"} onClick={() => onButtonClick("Pagos")}>
					payments
				</Button>
			</ul>
		</div>
	);
};
