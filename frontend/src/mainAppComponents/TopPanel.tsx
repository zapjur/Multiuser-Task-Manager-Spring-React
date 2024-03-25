import React from "react";
import './mainAppStyles.css'
import starEmptyIcon from '../graphics/starEmpty.png'
import starFullIcon from'../graphics/starFull.png'

function TopPanel() {

    const [isStarFull, setIsStarFull] = React.useState(false);

    const toggleStar = () => {
        setIsStarFull(!isStarFull);
    }

    return(
      <div className="topPanel">
          <div className="projectName col-md-6">
              <h2>Projekt na JPWP</h2>
              <p>Taka jira lub trello ale lepsze</p>
          </div>
          <div className="topPanelOptions col-md-6">
              <img
                  src={isStarFull ? starFullIcon : starEmptyIcon}
                  alt="StarIcon"
                  width={40}
                  height={40}
                  onClick={toggleStar}
              />
              <button className="addMemberButton">
                  Add member
                  <span className="newProjectPlusSign">+</span>
              </button>
          </div>
      </div>
    );
}

export default TopPanel;