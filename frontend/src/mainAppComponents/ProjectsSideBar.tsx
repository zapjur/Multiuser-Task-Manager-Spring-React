import SearchBar from "./SearchBar";
import './mainAppStyles.css';
import NewProjectButton from "./NewProjectButton";

function ProjectsSideBar() {

    return (
        <div className="projectsPanel borderRightSide">
            <div className="containerSearchBar">
                <SearchBar/>
            </div>
            <div className="projectsSection">
                <div className="sectionFavorite">
                    <h6 className="sectionTitle">Favorites</h6>
                    <div className="horizontalLine"></div>
                    <p>Ej mordo flanki</p>
                    <p>Prezentacja na WWW</p>
                    <p>Projekt JPWP</p>
                </div>
                <div className="sectionAllProjects">
                    <h6 className="sectionTitle">All projects</h6>
                    <div className="horizontalLine"></div>
                    <p>Ej mordo flanki</p>
                    <p>Prezentacja na WWW</p>
                    <p>Projekt JPWP</p>
                    <p>Egzamin z angielskiego</p>
                    <p>Losowy projekt</p>
                    <p>Hackathon</p>
                </div>

            </div>
            <div className="newProjectContainer">
                <NewProjectButton/>
            </div>
        </div>
    );

}

export default ProjectsSideBar;