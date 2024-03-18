import * as React from "react";
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
          <div className="projectName">
              <h2>Projekt na JPWP</h2>
              <p>Taka jira lub trello ale lepsze</p>
          </div>
          <div className="topPanelOptions">
              <img
                  src={isStarFull ? starFullIcon : starEmptyIcon}
                  alt="StarIcon"
                  width={40}
                  height={40}
                  onClick={toggleStar}
              />
          </div>
      </div>
    );
}

export default TopPanel;