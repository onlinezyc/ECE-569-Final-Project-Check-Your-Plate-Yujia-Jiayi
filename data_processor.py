import mysql.connector 
import json

class colors:
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    END = '\033[0m'


def read_json_file(filename):
    try:
        with open(filename) as file:
            data = json.load(file)
            print("Data acquired successfully!")
            return data 
            
    except FileNotFoundError:
        print("File not found. Please double check your path.")

    except IOError:
        print("An I/O error has occurred.")
            
    except Exception as e:
        print(f"An unexpected error occurred: {e}.")


def print_table(conn, table):
    """ Select all records within a table and print out """
    cursor = conn.cursor()  # for regular statement
    stmt = "SELECT * FROM " + table
    cursor.execute(stmt)
    print(f"\nDisplaying all records in table {table}...")
    for row in cursor.fetchall():
        print(row)
    
    cursor.close()


def add_food(conn, data):
    """ For Inserting food records into DB Foods table using prepared statement """
    cursor = conn.cursor(prepared = True)  # for prepared statement
    table = "Foods"
    counter = 0

    try:
       for key in data:
        record = data[key]
        for entry in record:
            stmt = "INSERT INTO " + table + "(name) VALUES (%s);"
            value = entry['foodName']
            cursor.execute(stmt, (value,))  # execute the prepared statement
            counter += 1
       conn.commit()  # commit only after all prepared statements have executed
       print(f"Committed {counter} changes to {table}.")

    except mysql.connector.Error as err:
        print("Error: {}".format(err))
        conn.rollback()  # Rollback in case of error
    
    finally:
        cursor.close()  # end cursor session


def add_substances(conn, data):
    """ For Inserting substances records into DB Substances table using prepared statement """
    cursor = conn.cursor(prepared = True)  # for prepared statement
    table = "Substances"  # table of interest
    col = "refID"  # column of interest
    counter = 0
    query = "SELECT COUNT(*) FROM " + table + " WHERE " + col + " = %s;"  # prepared query
    stmt = "INSERT INTO " + table + " (name, refID) VALUES (%s, %s);"  # prepared statement
    
    try:
       for key in data:
        record = data[key]
        for entry in record:
            nutrients = entry['nutrients']
            for nutrient in nutrients:
                if nutrient["sourceID"] == "":
                    id_value = 0
                else: 
                    id_value = float(nutrient["sourceID"])
                idx = id_value + int(nutrient["rank"])
                cursor.execute(query, (idx,))
                result = cursor.fetchone()
                check = result[0] == 0 
                if check:  # add substance only if substance is not in the table
                    sub_name = nutrient["name"]
                    cursor.execute(stmt, (sub_name, idx))
                    counter += 1
       
       conn.commit()  # commit only after all prepared statements have executed
       print(f"Committed {counter} changes to {table}.")

    except mysql.connector.Error as err:
        print("Error: {}".format(err))
        conn.rollback()  # Rollback in case of error
    
    finally:
        cursor.close()  # end cursor session


""" Main function """
if __name__ == "__main__":

    boarder = "\n======================== MySQL Python Client ========================\n"


    try:
        print(boarder)
        conn = mysql.connector.connect(
            host = 'localhost',
            user = input(colors.YELLOW + "Please enter your MySQL username (or press enter to access as 'root'): " + colors.END) or "root",
            password= input(colors.YELLOW + "Please enter your MySQL password: "+ colors.END),
            database = 'check_your_plate'
        )
        print(boarder)
        
        if conn.is_connected():
            print('Successfully connected to the database')

            # table_name = "Food_items"
            path = "data/food_info_digest.json"
            data = read_json_file(path)
            add_substances(conn, data)
            # add_food(conn, data) 


    except mysql.connector.Error as err:
        print(f'Error: {err}')

    finally:
        if 'conn' in locals() or 'conn' in globals() and conn.is_connected():
            conn.close()  # sever connection
            print("Ending connection...")
            print(boarder)
