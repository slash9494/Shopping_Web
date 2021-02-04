import React,{useState} from 'react'
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../../images/LYH.svg';
import './header.style.scss';

const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  @media screen and (max-width: 800px) {
    height: 10px;
    padding: 10px;
    padding-top: 30px;
  }
`;

const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  
  
  @media screen and (max-width: 800px) {
    height:1em;
    margin:0;
    
  }
`;

const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media screen and (max-width: 800px) {
    width: 50%;
  }
`;

const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

function Header () {
    const [visible,setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }
    
    return (
        <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo-container'/>
         </LogoContainer>
         <OptionsContainer>
             <OptionLink to='/shop'> SHOP </OptionLink>
             <OptionLink to='/contact'> CONTACT </OptionLink>
             {/* {
                 currentUser ?
                 <OptionLink onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
                 : <OptionLink className='option' to='/signin'> SIGN IN</OptionLink>
             } */}
             <OptionLink to='./'>SIGN OUT</OptionLink>
             <OptionLink className='option' to='/signin'> SIGN IN</OptionLink>
             {/* <CartIcon/> */}
         </OptionsContainer>
{/*      
          {   hidden ? null :
              <CartDropDown/>
            } */}
         </HeaderContainer>
    );
}

export default Header;