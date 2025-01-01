from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

# 根路徑，渲染 HTML 模板
@app.route('/')
def home():
    return render_template('Home.html')

# 用來提供靜態檔案
@app.route('/static/<path:filename>')
def send_static(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(debug=True)
