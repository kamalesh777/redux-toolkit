import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import {increment, decrement, incrementByAmount, reset} from "./store/counter/counterSlice";
import { fetchUsers, deleteUser } from "./store/users";
import { useEffect } from 'react';

function App() {
  const count = useSelector(state => state.counter.value);
  const {isLoading, users, isError} = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch])



  return (
		<div className="App">
			<h2>{count}</h2>
			<button onClick={() => dispatch(increment())} type="button">
				Increment
			</button>
			<button onClick={() => dispatch(decrement())} type="button">
				Decrement
			</button>
			<button onClick={() => dispatch(reset())} type="button">
				Reset
			</button>
			<button onClick={() => dispatch(incrementByAmount(10))} type="button">
				Increment by 10
			</button>
			<hr />
			<ul>
				{isLoading && <p>Loading...</p>}
				{users &&
					users.map(u => (
						<li key={u.id} onClick={() => dispatch(deleteUser(u.id))}>
							{u.name}
						</li>
					))}
				{isError && <p>{users.isError}</p>}
			</ul>
		</div>
	);
}

export default App;
