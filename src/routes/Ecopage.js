import { type } from '@testing-library/user-event/dist/type';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import soap from '../image/soap.jpg'
import { Nav } from 'react-bootstrap' 
import { Context1 } from '../App'

// let ColorBtn = styled.button`
//   border : ${ props => props.bg };
//   background : ${ props => props.bg };
//   color : ${ props => props.bg == 'blue'? 'white' : 'black'};
//   paddig : 10px;
// `

// let NewColorBtn = styled.button(ColorBtn)`

// `

// let Box = styled.div`
//   background : grey;
//   padding : 20px;
// `


function EcoPage(props){

  let {재고, shoes} = useContext(Context1);

  let [알림, 알림변경] = useState(true);
  let [탭, 탭변경] = useState(0);
  let {id} = useParams();
  let 찾은상품 = props.shoes.find(function(x){
    return x.id == id
  });
  let [mainFade,setMainFade] = useState('');


  useEffect(()=>{
    
    let a = setTimeout(()=>{알림변경(false)},2000);
    let b = setTimeout(()=>{setMainFade('container-end')},1000);

    return()=>{
      // useEffect가 동작하기 전에 실행됨
      // 기존코드를 치우는 코드를 여기에 많이 사용함
      clearTimeout(a)
      setMainFade('')
      console.log('제거')

      // 혹은 서버에 지속적으로 데이터 요청을 하는 일을 방지하기 위해서
      // 기존 데이터 요청을 제거해 주세요

    }
  }, [])


  return(
    <div className= {`container container-start + ${mainFade}`} style={{padding : "0 7vw", 
                                        marginTop : "5vw"}}>  

        {
          알림 == true ? <Alert /> : ''
        }

        <div className="row">
          <div className="col-md-6">
            <div style={{backgroundImage : 'url('+ soap +')',
                        width : "35vw",
                        height : "20vw", 
                        backgroundSize : "cover",
                        backgroundPosition : "center", 
                        backgroundRepeat : "no-repeat", 
                        borderRadius : "1vw"}} />
          </div>
          <div className="col-md-6" style={{margin : "auto", display : "block"}}>
            <h4>{찾은상품.title}</h4>
            <p>{찾은상품.content}</p>
            <p>{찾은상품.price}원</p>
            <button className="btn btn-secondary">주문하기</button> 
            {shoes[0].title}
            {/* <ColorBtn bg="blue">냠냠</ColorBtn> */}
          </div>
        </div>

        <Nav variant="tabs" defaultActiveKey="link0" style={{marginTop : "5vh"}}>
          <Nav.Item>
            <Nav.Link eventKey="link0" onClick={()=>{
              탭변경(0);
            }}>버튼0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link1" onClick={()=>{
              탭변경(1);
            }}>버튼1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link2" onClick={()=>{
              탭변경(2);
            }}>버튼2</Nav.Link>
          </Nav.Item>
        </Nav>

        <TapContent 탭 = {탭} />
    </div>  
  )

}

function TapContent({탭}){

    let [fade, setFade] = useState('');
    let {재고, shoes} = useContext(Context1); 

    useEffect(()=>{
      setTimeout(()=>{setFade('end')},100)
      return () => {
        setFade('')
      }
    }, [탭])

    return(
      <div className={`start ${fade}`}>
        {[<div>{재고}</div>, <div>내용1</div>, <div>내용2</div>][탭]}
      </div>
    )
}


function Alert(){
  return(
    <div className='alert alert-warning'>
      2초 이내 구매시 할인
    </div> 
  )
}
  
 export default EcoPage;
  