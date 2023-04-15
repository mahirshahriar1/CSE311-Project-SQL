import React from 'react'
import Sidenav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import "@trendmicro/react-sidenav/dist/react-sidenav.css";


export default function Mysidenav() {
  return (
    <div  >
         <Sidenav  style={{ background: '#2c3e50', color: '#FFF', position:'fixed' }}
            onSelect={(selected) => {
                console.log(selected);
            }}
        >
            <Sidenav.Toggle />
            <Sidenav.Nav defaultSelected="home">
                <NavItem >
                    <NavIcon> <i className='fa fa-fw fa-home' style={{fontsize:"1.5em"}}></i> </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
            </Sidenav.Nav>

        </Sidenav>
    </div>
  )
}

