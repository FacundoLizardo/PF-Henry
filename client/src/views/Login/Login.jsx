import style from "./Login.module.css";

export const Login = () => {
	return (
		<div className={style.form_container}>
			<form className={style.form}>
				<div className={style.flex_column}>
					<label>Email </label>
				</div>
				<div className={style.inputForm}>
					<input
						type="text"
						className={style.input}
						placeholder="Enter your Email"
					/>
				</div>

				<div className={style.flex_column}>
					<label>Password </label>
				</div>
				<div className={style.inputForm}>
					<input
						type="password"
						className={style.input}
						placeholder="Enter your Password"
					/>
				</div>

				<div className={style.flex_row}>
					<div>
						<input type="checkbox" />
						<label>Remember me </label>
					</div>
					<span className={style.span}>Forgot password?</span>
				</div>
				<button className={style.button_submit}>Sign In</button>
				<p className={style.p}>
					Dont have an account? <span className={style.span}>Sign Up</span>
				</p>
				<p className={style.p}>Or With</p>

				<div className={style.flex_row}>
					<button className={style.btn}>Google</button>
				</div>
			</form>
		</div>
	);
};
