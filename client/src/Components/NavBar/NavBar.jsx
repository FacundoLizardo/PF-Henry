import Styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={Styles.navBarContainer}>
      <div>
        Logo
      </div>
      <nav>
        <div>Link 1</div>
        <div>Link 2</div>
      </nav>
    </div>
  );
};

export default NavBar;
