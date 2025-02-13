import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDoorOpen, faDoorClosed} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom'

function Doorinfo(props) {

    const navigate = useNavigate();
    //let {levelParam} = useParams();

    const goto = () => {
      if(props.isOpen){
            navigate(`/game/${props.door}`)
          window.location.reload()
        }
    };

    return(
        <div ref={props.refer} onClick={goto}  className={`d-flex door-info cursor-pointer ${props.isOpen && 'hover'} pr-1 justify-content grey-3 ${props.current ? "current-door" : ""}`}>
            <FontAwesomeIcon icon={props.isOpen ? faDoorOpen : faDoorClosed} className="door mr-2" />
            <div className="info">
                <p className={`door-name tex ${props.bor ? "tex-tra" : ""}`}>Door {props.door}</p>
                {//<p className={`points grey-2 tex font-weight-bold ${props.bor ? "tex-tra" : ""}`}>{props.point} PTS</p>
                }
            </div>
            <div className="img-cont">
                {props.isOpen && <img src={props.img ? props.img : require('../../../assets/images/profile.png')} className="winner-img d-block mx-auto" alt="" />}
                {props.isOpen && <p className="name">{props.isOpen}</p>}
            </div>
        </div>
    );
}

export default Doorinfo;