from flask import Flask, config, flash, redirect, render_template, request, send_from_directory, url_for
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)
# app.secret_key = '####'

# login_manager = LoginManager()
# login_manager.init_app(app)
# login_manager.session_protection = 'strong'
# login_manager.login_view = 'login'
# login_manager.login_message = '請先登入'

# users = {'admin': {'password': '####'}}

# class User(UserMixin):
#     pass

# @login_manager.user_loader
# def user_loader(user_role):
#     if user_role != 'admin':
#         return
#     user = User()
#     user.id = user_role
#     return user

# @login_manager.request_loader
# def request_loader(request):
#     user_role = request.form.get('user_role')
#     if user_role != 'admin':
#         return
#     user = User()
#     user.id = user_role

#     user.is_authenticated = request.form['password'] == users[user_role]["password"]
#     return user

# # 根路徑，渲染 HTML 模板
# @app.route('/')
# def home():
#     return render_template('home.html')

# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'GET':
#         return render_template('login.html')
    
#     user_role = request.form['user_role']
#     if (user_role in users) and (request.form['password'] == users[user_role]['password']):
#         user = User()
#         user.id = user_role
#         login_user(user)
#         flash('登入成功')
#         return redirect(url_for('home'))
    
#     flash('登入失敗')
#     return render_template('login.html')

# @app.route('/logout')
# def logout():
#     logout_user()
#     flash('登出成功')
#     return render_template('home.html')

# 用來提供靜態檔案
@app.route('/static/<path:filename>')
def send_static(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(debug=True)