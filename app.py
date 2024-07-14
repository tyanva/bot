from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', tab='city')

@app.route('/ranking')
def ranking():
    return render_template('index.html', tab='ranking')

@app.route('/friends')
def friends():
    return render_template('index.html', tab='friends')

@app.route('/city')
def city():
    return render_template('index.html', tab='city')

@app.route('/tasks')
def tasks():
    return render_template('index.html', tab='tasks')

@app.route('/upgrade')
def upgrade():
    return render_template('index.html', tab='upgrade')

@app.route('/game')
def game():
    return render_template('game.html')





if __name__ == '__main__':
    app.run(debug=True)
