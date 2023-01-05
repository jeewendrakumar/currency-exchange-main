import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import Container from "@mui/material/Container";

const Header = () => {
  const { pathname } = useLocation();
  const base = `${pathname.slice(1).split("/").shift()}` || 'currency-converter';
  const menuItems = [
    { url: "currency-converter", label: "Currency Converter" },
    { url: "conversion-history", label: "View Conversion History" },
  ];
  return (
    <Fragment>
      <header>
        <Container maxWidth="lg">
          <nav>
            <div className="header__section">
              <div className="header__item header__logo">
                <span className="t-0 material-icons">find_replace</span>
                <span className="t-1">Currency</span>
                <span className="t-2">Exchange</span>
              </div>
              {menuItems.map((item) => {
                return (
                  <div className="header__item" key={item.url}>
                    <Link
                      key={item.url}
                      to={`/${item.url}`}
                      className={
                        "header__button " +
                        (base === item.url ? "header-item-selected" : "")
                      }
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="header__section">
              <div className="header__item">
                <Link
                  to="/conversion-history"
                  className="header__button primary"
                >
                  Logout
                </Link>
              </div>
            </div>
          </nav>
        </Container>
      </header>
    </Fragment >
  );
};

export default Header;
