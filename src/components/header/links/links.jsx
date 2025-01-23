import DropdownMenu from "../dropmenu/dropmenu";

const Links = () => {
  return (
    <nav className="navbar__links">
      <a href="/">Inicio</a>
      <a src="../../constructionPage/ConstructionPage.jsx">Cine</a>
      <a href="#paginaenconstruccion">Series</a>      
      <DropdownMenu />
    </nav>
  );
};

export default Links;
