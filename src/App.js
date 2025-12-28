import { useState } from "react";

const initialFriends = [{
  id: 1232,
  name: "Rohit",
  image: "https://i.pravatar.cc/150?img=3",
  balance: -70,
},
{
  id: 12323,
  name: "Paryag",
  image: "https://i.pravatar.cc/150?img=67",
  balance: 20,
},
{
  id: 12354253,
  name: "Pulkit",
  image: "https://i.pravatar.cc/150?img=4",
  balance: 0,
},
{
  id: 12323452,
  name: "Aditya",
  image: "https://i.pravatar.cc/150?img=48",
  balance: 5,
},
]

function Button({children, onClick}){
  return <button className="button" onClick={onClick}>{children}</button>
}

 export default function App() {

  const [ShowAddFnd, setShowAddFnd] = useState(false)

  function handleShowFrnd(){
    setShowAddFnd((e) => !e)
  }

  return (
    <div className="app">
      <div className="sidebar">
         <FriendsList />
         {ShowAddFnd && <FormAddFriend />}
         <Button onClick={handleShowFrnd}>{ShowAddFnd ? "Close" : "Add Friend"}</Button>
      </div>
      <FormSplitBill/>
    </div>
  );
}


function FriendsList(){
  const friends = initialFriends;
  return <ul>
    {friends.map((friend) => <Friend friend={friend} key={friend.id}/> )}
  </ul>
}

function Friend({friend}){
  return <li>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>

    {friend.balance < 0 && <p className="red">You owe {friend.name} {Math.abs(friend.balance)} Rs</p>}

    {friend.balance > 0 && <p className="green"> {friend.name} owes you {Math.abs(friend.balance)} Rs</p>}

    {friend.balance === 0 && <p>You and your friend are even!</p>}

    <Button>Select</Button>
  </li>
}



function FormAddFriend(){
  return <form className="form-add-friend">
    <label>🫂 Add friend</label>
    <input type='text' />

    <label>📸 Image URL</label>
    <input type='text' />
    <Button>Add</Button>
  </form>
}

function FormSplitBill(){
  return <form className="form-split-bill">
    <h2>Split a bill with X</h2>

    <label>💰 Bill value</label>
    <input type='text' />

    <label>👷‍♂️ Your expense</label>
    <input type='text' />

    <label>🧑‍🤝‍🧑 X's expense</label>
    <input type='text'  disabled/>

    <label>🫠 Who is paying the bill?</label>
    <select>
      <option value="user">You</option>
      <option value="friend">X</option>
    </select>

    <Button>Split Bill</Button>
  </form>
}