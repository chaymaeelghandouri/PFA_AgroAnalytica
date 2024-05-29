import mysql.connector
import logging

def get_db_connection():
    try:
        connection = mysql.connector.connect(
            user='root',
            passwd='',
            host='localhost',
            port=3306,
            database='dbAgroAnalytica'
        )
        return connection
    except mysql.connector.Error as err:
        logging.error(f"Error connecting to database: {err}")
        return None

def database_exists(database: str, cursor) -> bool:
    cursor.execute("SHOW DATABASES")
    databases = cursor.fetchall()
    return any(db[0] == database for db in databases)

def table_exists(table_name, cursor) -> bool:
    try:
        cursor.execute(f"SHOW TABLES LIKE '{table_name}'")
        return cursor.fetchone() is not None
    except mysql.connector.Error as err:
        logging.error(f"Error checking table existence: {err}")
        return False

def create_database_and_tables(connection):
    cursor = connection.cursor()
    try:
        if not database_exists('dbAgroAnalytica', cursor):
            cursor.execute("CREATE DATABASE dbAgroAnalytica")
        cursor.execute("USE dbAgroAnalytica")

        if not table_exists('users', cursor):
            cursor.execute("""
                CREATE TABLE users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    organisation VARCHAR(255),
                    prenom VARCHAR(255),
                    nom VARCHAR(255),
                    email VARCHAR(255) UNIQUE,
                    password VARCHAR(255)
                )
            """)
        if not table_exists('contact', cursor):
            cursor.execute("""
                CREATE TABLE contact (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    firstname VARCHAR(255),
                    lastname VARCHAR(255),
                    email VARCHAR(255) UNIQUE,
                    message TEXT
                )
            """)
        if not table_exists('commande', cursor):
            cursor.execute("""
                CREATE TABLE commande (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    firstname VARCHAR(255),
                    lastname VARCHAR(255),
                    email VARCHAR(255),
                    Adresse TEXT,
                    produits VARCHAR(255)
                )
            """)
        connection.commit()
    except mysql.connector.Error as err:
        logging.error(f"Error creating database or tables: {err}")
        connection.rollback()
    finally:
        cursor.close()

def insert_user(connection, data):
    create_database_and_tables(connection)
    cursor = connection.cursor()
    logging.debug(f'Inserting user: {data}')
    cursor.execute("""
        INSERT INTO users (organisation, prenom, nom, email, password)
        VALUES (%s, %s, %s, %s, %s)
    """, (data['organisation'], data['prenom'], data['nom'], data['email'], data['password']))
    connection.commit()
    logging.debug('User created successfully')
    cursor.close()

def get_user(connection, email, password):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
    user = cursor.fetchone()
    cursor.close()
    return user

def insert_message(connection, data):
    cursor = connection.cursor()
    logging.debug(f'Inserting contact: {data}')
    cursor.execute("""
        INSERT INTO contact (firstname, lastname, email, message)
        VALUES (%s, %s, %s, %s)
    """, (data['firstName'], data['lastName'], data['email'], data['message']))
    connection.commit()
    logging.debug('Contact created successfully')
    cursor.close()

def get_user_by_email(connection, email):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    cursor.close()
    return user

def insert_commande(connection, data):
    cursor = connection.cursor()
    logging.debug(f'Inserting commande: {data}')
    cursor.execute("""
        INSERT INTO commande (firstname, lastname, email, Adresse, produits)
        VALUES (%s, %s, %s, %s, %s)
    """, (data['firstName'], data['lastName'], data['email'], data['Adresse'], str(data['produits'])))
    connection.commit()
    logging.debug('Commande created successfully')
    cursor.close()