import sqlite3
import os # Добавили для порта
from flask import send_from_directory, Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Инициализация базы данных
def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            balance REAL DEFAULT 20000.0
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            item_name TEXT NOT NULL,
            price REAL NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS favorites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            item_id INTEGER NOT NULL,
            UNIQUE(username, item_id)
        )
    ''')
    
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

# НОВЫЙ МАРШРУТ: Пополнение баланса (для тестов)
@app.route('/add_money', methods=['POST'])
def add_money():
    data = request.json
    username = data.get('username')
    amount = data.get('amount', 5000) # По умолчанию 5000

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET balance = balance + ? WHERE username = ?", (amount, username))
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": f"Баланс {username} пополнен!"})

@app.route('/buy', methods=['POST'])
def buy():
    data = request.json
    username = data.get('username')
    price = data.get('price')
    item_name = data.get('itemName')

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    cursor.execute("SELECT balance FROM users WHERE username=?", (username,))
    user_row = cursor.fetchone()

    if user_row and user_row[0] >= price:
        new_balance = user_row[0] - price
        cursor.execute("UPDATE users SET balance=? WHERE username=?", (new_balance, username))
        cursor.execute("INSERT INTO orders (username, item_name, price) VALUES (?, ?, ?)", 
                       (username, item_name, price))
        conn.commit()
        conn.close()
        return jsonify({"success": True, "new_balance": new_balance})
    else:
        conn.close()
        return jsonify({"error": "Недостаточно средств на балансе или ошибка авторизации"}), 400

@app.route('/get_profile', methods=['GET'])
def get_profile():
    username = request.args.get('username')
    if not username:
        return jsonify({"error": "Юзер не указан"}), 400

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    # Ищем баланс
    cursor.execute("SELECT balance FROM users WHERE username=?", (username,))
    row = cursor.fetchone()
    
    # Если юзер не найден в БД, возвращаем ошибку, а не просто 0
    if row is None:
        conn.close()
        return jsonify({"error": "Пользователь не найден"}), 404

    balance = row[0]
    
    # Тянем историю
    cursor.execute("SELECT item_name, price, date FROM orders WHERE username=? ORDER BY date DESC", (username,))
    orders = [{"name": r[0], "price": r[1], "date": r[2]} for r in cursor.fetchall()]
    
    conn.close()
    return jsonify({
        "balance": float(balance),
        "orders": orders
    })


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    try:
        # Установили начальный баланс 20 000
        cursor.execute("INSERT INTO users (username, password, balance) VALUES (?, ?, ?)", (username, password, 20000.0))
        conn.commit()
        return jsonify({"message": "Success"}), 201
    except:
        return jsonify({"error": "Пользователь уже существует"}), 400
    finally:
        conn.close()

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
    user = cursor.fetchone()
    conn.close()
    
    if user:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Неверный логин или пароль"}), 401

if __name__ == '__main__':
    init_db()
    # Адаптивный порт для Render
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
