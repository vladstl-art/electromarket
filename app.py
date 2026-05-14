import sqlite3
from flask import send_from_directory, Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

# Инициализация базы данных: создаем таблицы, если их нет
def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    # 1. Таблица пользователей (логин, пароль, баланс)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            balance REAL DEFAULT 10000.0
        )
    ''')
    
    # 2. Таблица истории заказов (кто купил, что купил, за сколько и когда)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            item_name TEXT NOT NULL,
            price REAL NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 3. Таблица избранного (связка юзера и ID товара)
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

# Маршрут для покупки товара
@app.route('/buy', methods=['POST'])
def buy():
    data = request.json
    username = data.get('username')
    price = data.get('price')
    item_name = data.get('itemName') # Получаем имя товара для истории

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    # Проверяем баланс пользователя
    cursor.execute("SELECT balance FROM users WHERE username=?", (username,))
    user_row = cursor.fetchone()

    if user_row and user_row[0] >= price:
        new_balance = user_row[0] - price
        
        # Обновляем баланс
        cursor.execute("UPDATE users SET balance=? WHERE username=?", (new_balance, username))
        
        # Записываем покупку в историю заказов
        cursor.execute("INSERT INTO orders (username, item_name, price) VALUES (?, ?, ?)", 
                       (username, item_name, price))
        
        conn.commit()
        conn.close()
        return jsonify({"success": True, "new_balance": new_balance})
    else:
        conn.close()
        return jsonify({"error": "Недостаточно средств на балансе или ошибка авторизации"}), 400

# Маршрут для получения данных профиля (баланс + заказы)
@app.route('/get_profile', methods=['GET'])
def get_profile():
    username = request.args.get('username')
    if not username:
        return jsonify({"error": "Юзер не указан"}), 400

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    # 1. Тянем баланс
    cursor.execute("SELECT balance FROM users WHERE username=?", (username,))
    balance_row = cursor.fetchone()
    balance = balance_row[0] if balance_row else 0
    
    # 2. Тянем историю заказов (последние сверху)
    cursor.execute("SELECT item_name, price, date FROM orders WHERE username=? ORDER BY date DESC", (username,))
    orders = [{"name": row[0], "price": row[1], "date": row[2]} for row in cursor.fetchall()]
    
    conn.close()
    return jsonify({
        "balance": balance,
        "orders": orders
    })

# Оставляем регистрацию и вход как были, но с учетом начального баланса
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO users (username, password, balance) VALUES (?, ?, ?)", (username, password, 20000.0))
        conn.commit()
        return jsonify({"message": "Success"}), 201
    except:
        return jsonify({"error": "User already exists"}), 400
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
        return jsonify({"error": "Invalid credentials"}), 401

if __name__ == '__main__':
    init_db()  # Создаем таблицы при запуске
    app.run(host='0.0.0.0', port=10000)
