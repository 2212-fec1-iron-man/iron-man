import React from 'react';
import styled from 'styled-components';


  const CharContainer = styled.div`
    position: relative;
    width: 370px;
    left: 0px;
    height:55px;
    margin: 0px;
    margin-top:10px
  `;

  const SingleBar = styled.div`
    display: inline-flex;
    background-color: #D3D3D3;
    height: 10px;
    width: 70px;
    margin: 0 1px;
  `;

  const Arrow = styled.div`
    overflow: hidden;
    position: absolute;
    width: 0;
    height: 0;
    left: 2px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid black;
  `;

  const Text1 = styled.span`
    // position: absolute;
    // bottom: 5px;
    // left: 13px
    font-size: 9px;
  `;

  const Text2 = styled.span`
    position: absolute;
    bottom: 5px;
    left: 75px;
    font-size: 9px;
  `;
  const Text3 = styled.span`
    position: absolute;
    bottom: 5px;
    left: 161px;
    font-size: 9px;
`;
  const Text4 = styled.span`
    position: absolute;
    right: 87px;
    bottom: 5px;
    font-size: 9px;
  `;
  const Text5 = styled.span`
    position: absolute;
    bottom: 5px;
    right: 13px;
    font-size: 9px;
  `;


const CharacteristicBreakdown = ({categoryValue, category}) => {

  const checkCategory = (category) => {
    if (category === 'Size') {
      return(
      <>
      <Text1>Too small </Text1>
      <Text2></Text2>
      <Text3>Perfect </Text3>
      <Text4></Text4>
      <Text5>Too big </Text5>
      </>
      )
    } else if (category === 'Comfort') {
      return(
      <>
      <Text1>Uncomfortable </Text1>
      <Text2></Text2>
      <Text3>All right </Text3>
      <Text4> </Text4>
      <Text5>Perfect </Text5>
      </>
      )
    } else if (category === 'Fit') {
      return(
      <>
      <Text1>Too tight </Text1>
      <Text2></Text2>
      <Text3>Perfect </Text3>
      <Text4> </Text4>
      <Text5>Too loose </Text5>
      </>
      )
    } else if (category === 'Quality') {
      return(
      <>
      <Text1>Poor </Text1>
      <Text2></Text2>
      <Text3>Average</Text3>
      <Text4> </Text4>
      <Text5>Great </Text5>
      </>
      )
    } else if (category === 'Length') {
      return(
      <>
      <Text1>Too short </Text1>
      <Text2></Text2>
      <Text3>Perfect </Text3>
      <Text4> </Text4>
      <Text5>Too long </Text5>
      </>
      )
    } else if (category === 'Width') {
      return(
      <>
      <Text1>Too narrow </Text1>
      <Text2> </Text2>
      <Text3>Perfect </Text3>
      <Text4> </Text4>
      <Text5>Too wide </Text5>
      </>
      )
    }
  }
  const arrowPosition = Math.round(categoryValue * 354 / 5)
  return (
   <CharContainer>
    <div>{category}</div>
    <Arrow style={{left: `${arrowPosition}px`}}/>
    {[1, 2, 3, 4, 5].map((index) => <SingleBar key={index}></SingleBar>)}
    {checkCategory(category)}
   </CharContainer>
  )
}

export default CharacteristicBreakdown;