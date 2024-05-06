#!/usr/bin/python3
# -*- coding: utf-8 -*-
from os import listdir
from os.path import isfile, join

from sqliteimporter import SqliteImporter


def main():
    input = "./../data"
    output = "./../media/data.db"
    importer = SqliteImporter(output)
    indices = False

    for file in listdir(input):
        if isfile(join(input, file)) and file.endswith('.csv'):
            importer.import_file('{0}/{1}'.format(input, file), indices)

    importer.print_total_result()


if __name__ == '__main__':
    main()
