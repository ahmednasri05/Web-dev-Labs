const express = require('express');
const app = express();
const posts = [];
let id = 0;
app.use(express.json());
app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/post', (req, res) => {
    const { title, content } = req.body;
    const post = {
        id: id++,
        title: title,
        content: content,
        comments: []
    };
    posts.push(post);
    res.send('Post added successfully');
});
app.get('/post/:id/comments', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    if (post) {
        res.send(post.comments);
    } else {
        res.status(404).send('Post not found');
    }
});
app.post('/post/:id/:comment', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = req.params.comment;
    const post = posts.find(post => post.id === id);
    if (post) {
        post.comments.push(comment);
        res.send('Comment added successfully');
    } else {
        res.status(404).send('Post not found');
    }
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
