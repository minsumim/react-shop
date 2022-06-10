import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { changeName } from '../store'

function Cart(){

    let state = useSelector((state)=> {return state})
    let dispatch = useDispatch()

    return(
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>id</th>
                        <th>Product Name</th>
                        <th>{state.user}</th>
                    </tr>
                </thead>
                <tbody>
                  {
                      state.cart.map((a,i)=>{
                        return(
                        <tr key = {i}>
                            <td>{i+1}</td>
                            <td>{state.cart[i].id}</td>
                            <td>{state.cart[i].name}</td>
                            <td><button onClick={()=>{
                                dispatch(changeName())
                            }}>+</button></td>
                        </tr>
                        )
                      })
                  }
                </tbody>
            </Table>
        </div>
    )
}


export default Cart;
