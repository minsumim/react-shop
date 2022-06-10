import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { useState, createContext } from 'react';
import data from './data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import EcoPage from './routes/Ecopage'
import axios from 'axios';
import Cart from './routes/Cart'
// jsx안에 이미지 코드를 직접 넣고싶은 경우
// import 이미지 from './img/bg.png'

export let Context1 = createContext()

function App() {

  let [shoes, setshoes] = useState(data)
  let [재고] = useState([10, 11, 12])

  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="dark" variant="dark" className="mnav">
        <Container>
        <Navbar.Brand href="/">Waste-Low</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=>{ navigate('/eco/0') }}>eco</Nav.Link>
           {/* 앞으로 한칸이동 = navigate(1) , 뒤로 한칸 이동 = navigate(-1) */}
          <Nav.Link onClick={()=>{ navigate('/feature') }}>feature</Nav.Link>
          <Nav.Link href="/cart">cart</Nav.Link>
          <Nav.Link href="#pricing">customer</Nav.Link>
        </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <div className='main-bg' 
            // style={{backgroundImage : 'url('+ 이미지 +')'}}
            ></div>

            <Container style={{marginTop:'50px', maxWidth: '90vw', padding: '0 5vw'}}>
                <Row>
                  {
                    shoes.map((a,i)=>{
                      return(
                        <List shoes = {shoes[i]} i = {i+1}
                        key = {i}/>
                      )
                    })
                  }
                </Row>
            </Container>
            <button onClick={()=>{
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((결과)=>{
                //가져온 데이터를 shoes state에 추가해주세요
                let copy = [...shoes, ...결과.data];
                setshoes(copy);
              })
              .catch(()=>{
                console.log('데이터 가져오기 실패');
              })
            }}>버튼</button>
          </>
        } />
        <Route path="/eco/:id" element={
          <Context1.Provider value = {{ shoes, 재고}}>
            <EcoPage shoes = {shoes}/>
          </Context1.Provider>
        } />

        <Route path="/feature" element={
            <Feature />
        }>
          {/* nested routes */}
          <Route path="member" element={
            <div>멤버임</div>
          } />
          <Route path="location" element={
              <Feature />
          } />
        </Route>

        <Route path='/event' element={
          <Event /> 
        }>
          <Route path='service' element={
            <div>첫 주문시 대나무 칫솔 서비스</div>
          } />
          <Route path='birthday' element={
            <div>생일기념 쿠폰받기</div>
          } />

        </Route>


        <Route path="/*" element={
          <div>에러페이지임</div>
        } />

        <Route path="/cart" element = {<Cart />}>
        </Route>
      </Routes>
      
    </div>
  );
}

function List(props){

  return(
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} style = {{width : "25vw"}}/>
      <h4 style={{marginTop:'3vw', color:'#585858'}}>
        {props.shoes.title}
      </h4>
      <p style={{color : '#585858'}}>
        {props.shoes.price}
      </p>
    </div>
  )
}


function Feature(){
  return(
    <>
      <h2>Our Feature</h2>
      {/* nested routes의 element를 보여주는 곳은 <Outlet></Outlet> */}
      <Outlet></Outlet>
    </>
  )
}

function Event(){
  return(
    <>
      <h1>오늘의 이벤트</h1>
      <Outlet></Outlet>
    </>
  )
}


export default App;
