import React,{ useEffect } from 'react';
import Channel from './Channel';
import Post from './Post';
import {logOut} from './services/firebase'
import { UserContext } from './providers/UserProvider';
import { useHistory } from 'react-router';
import '../src/style/main.css';
import { db } from './services/firebase';

function Dashboard() {
  const [channel, setChannel] = React.useState([]);
  const [selectedChannel, setSelectedChannel] = React.useState('');
  const [newPost, setNewPost] = React.useState({subject: '', body: ''});
  const [isPost, setIsPost] = React.useState(false);
  const [users, setUsers] = React.useState(false);
  const [posts, setPosts] = React.useState(false);

  let history = useHistory();
  const user = React.useContext(UserContext);

  useEffect(() => {
      if (user) {
          history.push('/dashboard');
      }else{
          history.push('/');
      }
  }, [user]);

  useEffect(() => {
      fetchUsers();
      fetchPosts();
  },[]);

    const fetchUsers = async()=>{
        const response= db.collection('Users');
        const data=await response.get();
        let list = [];
        data.docs.forEach(item=>{
          list.push(item.data())
        })
        setUsers(list);
    }

    const fetchPosts = async()=>{
        const response= db.collection('Posts');
        const data=await response.get();
        let list = [];
        data.docs.forEach(item=>{
            let obj = item.data()
            obj['key'] = item.id
          list.push(obj)
        })
        setPosts(list);
    }

  const handleClick = () => {
    setChannel(['My Channel']);
  }

  const onChannelSelect = (val) => {
    setSelectedChannel(val)
    setIsPost(false)
  }

  const onSubmit = (e) => {
    if(newPost.subject && newPost.body){
      db.collection("Posts").add({
            subject: newPost.subject,
            body: newPost.body,
            email: user.email,
            name: user.displayName,
            comments: []
        }).then(async(docRef) => {
                db.collection("Posts").doc(docRef.id).get()
                .then((docRef) => { 
                    const newData = docRef.data()
                    setNewPost({...newData, key: docRef.id}) 
                    setIsPost(true)
                })
                .catch((error) => { })
                alert("Data Successfully Submitted");
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }
  }

  const onPostChange = (e, key) => {
    if(key == 'subject'){
        setNewPost({...newPost, subject: e.target.value})
      }else if(key == 'body'){
        setNewPost({...newPost, body: e.target.value})
      }
  }
  
  const onPostSelect = (val) => {
      const userDomain = user.email.split('@')[1].split('.com')[0]
      const postDomain = val.email.split('@')[1].split('.com')[0]
      if(userDomain == postDomain){
        setNewPost(val)
        setIsPost(true)
      } else {
        alert('Cannot access this Post')
        setIsPost(false)
      }
    }

  return (
    <div className="App">
      <div className="main_dashboard">
        <div className="left_section">
            <button className="logout-button" onClick={logOut}>
                <span> logout</span>
            </button>
            <div className="dashboard">
                <p>@levelshealth.com</p>
                <button onClick={() => handleClick()}>New Channel</button>
                {channel.map(val => <p style={{cursor: 'pointer'}} onClick={() => onChannelSelect(val)}>{val}</p>)}
            </div>            
        </div>
        <div>
            {!isPost && selectedChannel && <Channel channel={selectedChannel} posts={posts} onPostChange={onPostChange} onPostSelect={onPostSelect}  onSubmit={(e) => onSubmit(e)}></Channel>}
            {isPost && <Post newPost={newPost} posts={posts} user={user}></Post>}
        </div>
      </div>     
    </div>
  );
}

export default Dashboard;