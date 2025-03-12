from flask import Flask, config, flash, redirect, render_template, request, send_from_directory, url_for
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)
app.secret_key = '####'

login_manager = LoginManager()
login_manager.init_app(app)   
login_manager.session_protection = 'strong'
login_manager.login_view = 'login'
login_manager.login_message = '請先登入'

class User(UserMixin):
    pass

users = {'admin': {'password': '####'}}

@login_manager.user_loader
def user_loader(user_id):
    if user_id not in users:
        return
    
    user = User()
    user.id =user_id
    return user

@login_manager.request_loader
def request_loader(request):
    username = request.form.get('username')
    if username != 'admin':
        return
    user = User()
    user.id = username

    user.is_authenticated = request.form['password'] == users[username]["password"]
    return user

# 根路徑，渲染 HTML 模板
@app.route('/')
def index():
    return render_template('Home.html')

# Example additional routes
@app.route('/home')
def home():
    return render_template('Home.html')

@app.route('/donate')
def donate():
    return render_template('Donate.html')

@app.route('/robots')
def robots():
    return render_template('Robots.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    
    username = request.form['username']
    if request.form['password'] == users[username]['password']:
        user = User()
        user.id = username
        login_user(user)
        return redirect(url_for('dashboard'))
    
    flash('登入失敗')
    return render_template('login.html')

@app.route('/logout')
def logout():
    logout_user()
    flash('登出成功')
    return render_template('home.html')

@app.route('/dashboard')
@login_required
def dashboard():
    if current_user.is_active:
        # return "Logged in as" + current_user.id + "Login is_active: Ture"
        return render_template('Dashboard.html')

# 用來提供靜態檔案
@app.route('/static/<path:filename>')
def send_static(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(debug=True)