import React, {useState, useEffect}  from 'react';
import {API, graphqlOperation } from  'aws-amplify';

import {listPosts} from './../graphql/queries';

const Displaypost = () => {
const [posts, setPosts] = useState([])
useEffect( () => {
  getPosts();
}, []);

const getPosts = async () => {
  const result = await API.graphql(graphqlOperation(listPosts));
  setPosts(result.data.listPosts.items);
}


  return (
    <div>
      
      {posts.map((post) => (
        <div key={post.id} className="card">
          <h2>{post.postTitle}</h2>
          <p>{post.postBody}</p>
          <p>
            {" "}
            wrote by: {post.postOwnerUsername}{"  "}
            <time>{new Date(post.createdAt).toDateString()}</time>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Displaypost;
