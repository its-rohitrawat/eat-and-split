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

 export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
         <FriendsList />
      </div>
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

    <button className="button">Select</button>
  </li>
}