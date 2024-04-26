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


# def print_table(conn, table):
#     """ Select all records within a table and print out """
#     cursor = conn.cursor()  # for regular statement
#     stmt = "SELECT * FROM " + table
#     cursor.execute(stmt)
#     print(f"\nDisplaying all records in table {table}...")
#     for row in cursor.fetchall():
#         print(row)
    
#     cursor.close()


def add_substances(conn, data):
    """ For Inserting substances records into DB Substances table using prepared statement """
    cursor = conn.cursor(prepared = True)  # for prepared statement
    table = "Substances"  # table of interest
    stmt = "INSERT INTO " + table + " (name, refID) VALUES (%s, %s);"  # prepared statement
    counter = 0

    try:
       for key in data:
            value = data[key]
            cursor.execute(stmt, (value, key))
            counter += 1
       
       conn.commit()  # commit only after all prepared statements have executed
       print(f"Committed {counter} changes to {table}.")

    except mysql.connector.Error as err:
        print("Error: {}".format(err))
        conn.rollback()  # Rollback in case of error
    
    finally:
        cursor.close()  # end cursor session


def query_id_using_name(conn, table, name):
    cursor = conn.cursor()
    try:
        stmt = f"SELECT id FROM {table} WHERE name = %s;"
        cursor.execute(stmt, (name,))
        result = cursor.fetchone()
        if result:
            idx = result[0]
            return idx

        else:
            print(f"No match found for {name}")  ##
            return None
    
    except mysql.connector.Error as err:
        print("Error: {}".format(err))    

    finally:
        cursor.close()


def add_food(conn, data):
    """ For Inserting food records into DB Foods table using prepared statement """
    cursor = conn.cursor(prepared = True)  # for prepared statement
    f_counter = 0
    fn_counter = 0
    f_stmt = "INSERT INTO Foods (name) VALUES (%s);"  # prepared stmt for inserting record into table Foods
    fn_stmt = "INSERT INTO Food_nutrients (foodID, subsID) VALUES (%s, %s);"  # prepared stmt for inserting record into table Food_nutrients
    
    print("Parsing data to DB. Please wait. This may take up to 15 minutes.")
    try:
       for key in data:
        record = data[key]
        for entry in record:
            f_name = entry['foodName']
            cursor.execute(f_stmt, (f_name,))  # add new food record 
            f_counter += 1

            nutrients = entry['nutrients']
            for nutrient in nutrients:
                n_name = nutrient["name"]
                subsID = query_id_using_name(conn, 'Substances', n_name)
                if subsID == None:
                    print(f"New substance detected in food: {f_name}!")
                    # nutrient["source"]
                    # query = ""
                    # cursor.execute

                else:  # if subsID != None:
                    cursor.execute(fn_stmt, (f_counter, subsID))
                    fn_counter += 1

       conn.commit()  # commit only after all prepared statements have executed
       print(f"Committed {f_counter} changes to Foods.")
       print(f"Committed {fn_counter} changes to Food_nutrients.")     

    except mysql.connector.Error as err:
        print("Error: {}".format(err))
        conn.rollback()  # Rollback in case of error
        conn.execute("TRUNCATE TABLE Substances")  # also rolls back table Substances
     
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
            subs_path = "data/substance_list.json"  # path to substances data
            subs_data = read_json_file(subs_path)
            add_substances(conn, subs_data)


            food_path = "data/food_info_digest.json"  # path to food data
            food_data = read_json_file(food_path)
            add_food(conn, food_data)


    except mysql.connector.Error as err:
        print(f'Error: {err}')

    finally:
        if 'conn' in locals() or 'conn' in globals() and conn.is_connected():
            conn.close()  # sever connection
            print("Ending connection...")
            print(boarder)
