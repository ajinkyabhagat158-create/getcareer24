from flask import Flask, render_template
import json
import os
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

def load_data():
    if os.path.exists(app.config['DATA_FILE']):
        with open(app.config['DATA_FILE'], 'r') as f:
            return json.load(f)
    return {'posts': []}

@app.route('/')
def index():
    data = load_data()
    active_posts = []
    for post in data['posts']:
        if post.get('is_active', True):
            active_posts.append(post)

    active_posts.sort(key=lambda x: x.get('date', ''), reverse=True)
    return render_template('index.html', posts=active_posts)

@app.route('/category/<category_type>')
def category_posts(category_type):
    data = load_data()
    filtered_posts = []

    for post in data['posts']:
        if (post['category'] == category_type and
                post.get('is_active', True)):
            filtered_posts.append(post)

    filtered_posts.sort(key=lambda x: x.get('date', ''), reverse=True)
    return render_template('posts.html', posts=filtered_posts, category=category_type)

@app.route('/post/<int:post_id>')
def post_detail(post_id):
    data = load_data()
    post = None

    for p in data['posts']:
        if p['id'] == post_id and p.get('is_active', True):
            post = p
            break

    if not post:
        return "Post not found", 404

    return render_template('post_detail.html', post=post)

if __name__ == '__main__':
    app.run(debug=True)