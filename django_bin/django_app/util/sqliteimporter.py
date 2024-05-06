import sqlite3
from sqlite3 import Error
from sqlimporter import SqlImporter
from helper import Helper
from sqlhelper import SqlHelper


class SqliteImporter(SqlImporter):
    """
    Import to sqlite3. This version was tested.
    """

    def __init__(self, db_file):
        super().__init__()
        self.db_file = db_file

    def _open_db(self):
        try:
            self.connection = sqlite3.connect(self.db_file)
            return True
        except Error as e:
            Helper.print_error('SQL error: {0}'.format(str(e)))
            Helper.print_error('database was: {0}'.format(self.db_file))

        return False

    def _set_primarykey(self, table_name, primary_key, col_list=[], type_list=[]):
        # ALTER TABLE table_name ADD PRIMARY KEY (primary_key)
        # doesn't work for sqlite3
        # see: https://www.sqlitetutorial.net/sqlite-primary-key/
        sql_stm = 'PRAGMA foreign_keys=off;'
        SqlHelper.execute_statement(self.connection, sql_stm)

        sql_stm = 'BEGIN TRANSACTION;'
        SqlHelper.execute_statement(self.connection, sql_stm)

        sql_stm = 'ALTER TABLE {0} RENAME TO temp_table;'.format(table_name)
        SqlHelper.execute_statement(self.connection, sql_stm)

        sql_stm = SqlHelper.sql_create_table(table_name, col_list, type_list, primary_key)
        SqlHelper.execute_statement(self.connection, sql_stm)

        sql_stm = 'INSERT INTO {0} SELECT * FROM temp_table;'.format(table_name)
        success = SqlHelper.execute_statement(self.connection, sql_stm)

        sql_stm = 'DROP TABLE temp_table;'
        SqlHelper.execute_statement(self.connection, sql_stm)

        if success:
            sql_stm = 'COMMIT;'
            SqlHelper.execute_statement(self.connection, sql_stm)
        else:
            sql_stm = 'ROLLBACK;'
            SqlHelper.execute_statement(self.connection, sql_stm)

        sql_stm = 'PRAGMA foreign_keys=on;'
        SqlHelper.execute_statement(self.connection, sql_stm)

        return success
