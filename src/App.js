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

  const [friends, setfriends] = useState(initialFriends)

  const [ShowAddFnd, setShowAddFnd] = useState(false)

  const [selectedFriend, setselectedFreind] = useState(null)

  function handleShowFrnd(){
    setShowAddFnd((e) => !e)
  }

  function handleaddfrd(friend){
    setfriends(friends => [...friends, friend])
    setShowAddFnd(false)
  }

  function handleSelectedFriend(friend){
    // setselectedFreind(friend)
    setselectedFreind((curr) => curr?.id ===friend.id ? null : friend) 
    setShowAddFnd(false)
  }

  return (

    <div className="app">
      <div className="sidebar">

         <FriendsList friends={friends} onSelection = {handleSelectedFriend} selectedFriend={selectedFriend}/>

         {ShowAddFnd && <FormAddFriend onAddFriend ={handleaddfrd}/>}

         <Button onClick={handleShowFrnd}>{ShowAddFnd ? "Close" : "Add Friend"}</Button>
      </div>
      
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend}/>}
    </div>
  );
}


function FriendsList({friends, onSelection, selectedFriend}){
  
  return <ul>
    {friends.map((friend) => <Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend}/> )}
  </ul>
}

function Friend({friend, onSelection, selectedFriend}){

  const isSelected = selectedFriend?.id === friend.id;

  return <li className={isSelected ? "selected" : ""}> 
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>

    {friend.balance < 0 && <p className="red">You owe {friend.name} {Math.abs(friend.balance)} Rs</p>}

    {friend.balance > 0 && <p className="green"> {friend.name} owes you {Math.abs(friend.balance)} Rs</p>}

    {friend.balance === 0 && <p>You and your friend are even!</p>}

    <Button onClick={() => onSelection(friend)}>{isSelected ? "Close" : "Select"}</Button>
  </li>
}



function FormAddFriend({onAddFriend}){

  const [name, setname] = useState("")
  const [image, setimage] = useState("")

  function handleAddform(e){
    e.preventDefault();

    if(!name || !image) return;

    const newFriend = {
      id: crypto.randomUUID(),
      name,
      image,
      balance: 0,
    }
    onAddFriend(newFriend)
    console.log(newFriend)

    setname("")
    setimage("")
  }
  
  return <form className="form-add-friend" onSubmit={handleAddform}>
    <label>🫂 Add friend</label>
    <input type='text' value={name} onChange={(e) => setname(e.target.value)}/>

    <label>📸 Image URL</label>
    <input type='text' value={image} onChange={(e) => setimage(e.target.value)}/>
    <Button>Add</Button>
  </form>
}

function FormSplitBill({selectedFriend}){

  const [bill, setbill] = useState("")
  const [paidbyUser, setpaidbyUser] = useState("")
  const paidbyFriend = bill ?  bill - paidbyUser : ""
  const [whosispaying, setwhosispaying] = useState("user")

  return <form className="form-split-bill">
    <h2>Split a bill with {selectedFriend.name}</h2>

    <label>💰 Bill value</label>
    <input type='text' value={bill} onChange={(e) => setbill(Number(e.target.value))}/>

    <label>👷‍♂️ Your expense</label>
    <input type='text' value={paidbyUser} onChange={(e) => setpaidbyUser(Number(e.target.value) > bill ? paidbyUser : Number(e.target.value))}/>

    <label>🧑‍🤝‍🧑 {selectedFriend.name}'s expense</label>
    <input type='text'  disabled value={paidbyFriend}/>

    <label>🫠 Who is paying the bill?</label>
    <select value={whosispaying} onChange={(e) => setwhosispaying(e.target.value)}>
      <option value="user">You</option>
      <option value="friend">{selectedFriend.name}</option>
    </select>

    <Button>Split Bill</Button>
  </form>
}