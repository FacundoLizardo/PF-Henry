import style from "./Dashboard.module.css";
import Button from "../../Components/Button/Button";

const Content = ({
	selectedButton,
	courses,
	payments,
	users,
	handleBlockUser,
}) => {
	return (
		<div className={style.containerContext}>
			<h2>Registros de {selectedButton || "Administracion"} del sistema</h2>
			{selectedButton === "Usuarios" && (
				<div className={style.courses_table_container}>
					<table className={style.courses_table}>
						<thead>
							<tr>
								<th>ID</th>
								<th>Email</th>
								<th>Nombre</th>
								<th>Apellido</th>
								<th>Estado</th>
								<th>Deshabilitar</th>
							</tr>
						</thead>
						<tbody>
							{users?.map((user) => (
								<tr key={user.id}>
									<td>{user.id}</td>
									<td>{user.email}</td>
									<td>{user.first_name}</td>
									<td>{user.last_name}</td>
									<td>
										<label className={style.container_check}>
											{user.enabled ? (
												<input type="checkbox" checked={true} />
											) : (
												<input type="checkbox" checked={false} />
											)}

											<div className={style.checkmark}></div>
										</label>
									</td>

									{user.enabled ? (
										<td>
											<Button
												text={"Deshabilitar usuario"}
												onClick={() => handleBlockUser(user)}
											/>
										</td>
									) : (
										<td>
											<Button
												text={"Habilitar usuario"}
												onClick={() => handleBlockUser(user)}
											/>
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
			{selectedButton === "Cursos" && (
				<div className={style.courses_table_container}>
					<table className={style.courses_table}>
						<thead>
							<tr>
								<th>Id</th>
								<th>Titulo</th>
								<th>Categoría</th>
								<th>Precio</th>
								<th>En venta</th>
								<th>Descuento</th>
								<th>Imagen</th>
								<th>Estado</th>
							</tr>
						</thead>
						<tbody>
							{courses?.map((course, index) => (
								<tr key={index}>
									<td>{course.id}</td>
									<td>{course.title}</td>
									<td>{course.category}</td>
									<td>${course.price}</td>
									<td>{course.onSale ? "Sí" : "No"}</td>
									<td>
										{course.percentageDiscount
											? `${course.percentageDiscount}%`
											: "N/A"}
									</td>
									<td>
										<img
											src={course.image}
											alt={course.title}
											style={{ width: "50px", height: "50px" }}
										/>
									</td>
									<td>
										<label className={style.container_check}>
											{course.enabled ? (
												<input type="checkbox" checked="checked" />
											) : (
												<input type="checkbox" />
											)}

											<div className={style.checkmark}></div>
										</label>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
			{selectedButton === "Pagos" && (
				<div className={style.courses_table_container}>
					<table className={style.courses_table}>
						<thead>
							<tr>
								<th>ID de Pago</th>
								<th>Nombre de usuario</th>
								<th>Fecha de Pago</th>
								<th>Monto</th>
								<th>Método de Pago</th>
								<th>Estado de Pago</th>
							</tr>
						</thead>
						<tbody>
							{payments?.map((payment) => (
								<tr key={payment.id}>
									<td>{payment.id}</td>
									<td>
										{payment.User.first_name} {payment.User.last_name}
									</td>
									<td>{payment.payment_date}</td>
									<td>${payment.amount}</td>
									<td>{payment.payment_method}</td>
									<td>{payment.payment_status}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default Content;
