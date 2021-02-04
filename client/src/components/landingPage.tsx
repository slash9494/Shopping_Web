import React, {useEffect} from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const LandingPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 80px;
`;

function LandingPage (props:any) {
    const onClick = () => {
        axios.get(`/api/users/logout`)
            .then(response => {
                if(response.data.success){
                    props.history.push('/login')
                } else{
                    alert('로그아웃 하는데 실패했습니다.')
                }
            })
    }

    return (
        <LandingPageContainer>
            메인
            <button onClick={onClick}>로그아웃</button>
        </LandingPageContainer>
    );
}

export default withRouter(LandingPage);