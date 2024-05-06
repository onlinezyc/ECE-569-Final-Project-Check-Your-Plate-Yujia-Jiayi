USE Check_your_plate;

DROP TABLE IF EXISTS DRIs;
DROP TABLE IF EXISTS User_Conditions;
DROP TABLE IF EXISTS PhysicalConditions;
DROP TABLE IF EXISTS User_Allergies;
DROP TABLE IF EXISTS Substance_Categories;
DROP TABLE IF EXISTS Food_Labels;
DROP TABLE IF EXISTS Food_Nutrients;
DROP TABLE IF EXISTS User_Watchlists;
DROP TABLE IF EXISTS User_DietPrefs;
DROP TABLE IF EXISTS Recipe_Foods;
DROP TABLE IF EXISTS Recipe_Labels;
DROP TABLE IF EXISTS Labels;
DROP TABLE IF EXISTS Recipes;
DROP TABLE IF EXISTS Substances;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Foods;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Genders;
DROP TABLE IF EXISTS AgeGroups;
DROP TABLE IF EXISTS Units;
DROP TABLE IF EXISTS DietPreferences;

CREATE TABLE IF NOT EXISTS Units(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(10) /* g, mg, ug, kcal*/
);

CREATE TABLE IF NOT EXISTS Genders(
	id INT PRIMARY KEY AUTO_INCREMENT,
    gender VARCHAR (20)
);

CREATE TABLE IF NOT EXISTS AgeGroups(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20),  /*'infant','toddler','child','teenager','adult','elder (65+)'*/
    description VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS DietPreferences(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),  /*('diary-free', 'vegetarian', 'lacto-vegetarian', 'pescatarian', 'pollotarian', 'vegan', 'gluten-free', 'keto', 'paleo')*/
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Users(
	id INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(50),
    email VARCHAR(70), 
    UNIQUE(email),
    gender INT,
    ageGroup INT,
    registrationDate datetime,
    FOREIGN KEY (gender) REFERENCES Genders(id),
    FOREIGN KEY (ageGroup) REFERENCES AgeGroups(id)
);

CREATE TABLE IF NOT EXISTS User_DietPrefs( /* Combined table of Users and DietPreferences*/ 
	id INT AUTO_INCREMENT, 
    UNIQUE(id),
    userId INT,
    dietId INT, 
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (dietId) REFERENCES DietPreferences(id),
    PRIMARY KEY (userId, dietId)
);

CREATE TABLE IF NOT EXISTS PhysicalConditions(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    description VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS User_Conditions( /* Combined table for Users and Physical_Conditions */
	id INT AUTO_INCREMENT,
	UNIQUE(id),
    userId INT,
    conditionId INT,
    FOREIGN KEY (userID) REFERENCES Users(id),
	FOREIGN KEY (conditionId) REFERENCES PhysicalConditions(id),
    PRIMARY KEY (userID, conditionId)
);

CREATE TABLE IF NOT EXISTS Substances(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
	description VARCHAR(255) NULL,
    allergen BOOL NULL,		/* flag if substance is reported to cause allergy */
    toxin BOOL NULL, 		/* flag if substance is reported to be toxic */
    MSC FLOAT NULL,     /* Maximum Saftey Concentration. Needs to be filled if the substance is a knonw toxin */
    uint INT,
    FOREIGN KEY (uint) REFERENCES Units(id)
);

CREATE TABLE IF NOT EXISTS User_Allergies( /* Combined table for Users and Substances */
	id INT AUTO_INCREMENT,
	UNIQUE(id),
    userId INT,
    allergenId INT,
    FOREIGN KEY (userID) REFERENCES Users(id),
	FOREIGN KEY (allergenId) REFERENCES Substances(id),
    PRIMARY KEY (userID, allergenId)
);

CREATE TABLE IF NOT EXISTS Categories(  /* For substances classification */
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(80),
	description VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS Substance_Categories( /* Combined table for Substances and Categories */
	id INT AUTO_INCREMENT,
	UNIQUE(id),
	subsId INT,
    categoryId INT,
	FOREIGN KEY (subsId) REFERENCES Substances(id), 
    FOREIGN KEY (categoryId) REFERENCES Categories(id), 
    PRIMARY KEY (subsId, categoryId)
);

CREATE TABLE IF NOT EXISTS DRIs( /* Dietary Reference Intakes */
	id INT AUTO_INCREMENT,
	UNIQUE(id),
	genderId INT,
    ageGroupId INT, 
    subsId INT,
    unit INT,
    RDA float,
    AI float,
    UL float,
	FOREIGN KEY (genderId) REFERENCES Genders(id), 
	FOREIGN KEY (ageGroupId) REFERENCES AgeGroups(id), 
	FOREIGN KEY (subsId) REFERENCES Substances(id),
    FOREIGN KEY (unit) REFERENCES Units(id),
    PRIMARY KEY (genderId, ageGroupId)
);

CREATE TABLE IF NOT EXISTS Foods( 
	id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(255),
    description text NULL
);

CREATE TABLE IF NOT EXISTS Labels(  /* For Food items classifications*/
	id INT AUTO_INCREMENT PRIMARY KEY, 
    name varchar(255),  /* eg 'meat', 'fish/seafood', 'vegatable', 'dairy', 'herb', 'conditment', etc...*/
    description varchar(255) NULL
);

CREATE TABLE IF NOT EXISTS Food_Labels( /* Combined table for Foods and Labels */
	id INT AUTO_INCREMENT, 
    UNIQUE(id),
    foodId INT, 
    labelId INT, 
    FOREIGN KEY (foodId) REFERENCES Foods(id),
    FOREIGN KEY (labelId) REFERENCES Labels(id),
    PRIMARY KEY (foodId, labelId)
);

CREATE TABLE IF NOT EXISTS Food_Nutrients( /* Combined table for Foods and Substances */
	id INT AUTO_INCREMENT, 
    UNIQUE(id),
    foodId INT, 
    subsId INT, 
    FOREIGN KEY (foodId) REFERENCES Foods(id),
    FOREIGN KEY (subsId) REFERENCES Substances(id),
    PRIMARY KEY (foodId, subsId)
);

CREATE TABLE IF NOT EXISTS Recipes(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    description TEXT,
    createDate TIMESTAMP,
    last_update TIMESTAMP NULL,
    author INT,
    updatedBy INT,
    FOREIGN KEY (author) REFERENCES Users(id),
    FOREIGN KEY (updatedBy) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS User_Watchlists( /* Combined table of Recipes and Users*/ 
	id INT AUTO_INCREMENT, 
    UNIQUE(id),
	uid INT, 
    recipeId INT,
	FOREIGN KEY (uid) REFERENCES Users(id),
    FOREIGN KEY (recipeId) REFERENCES Recipes(id),
    PRIMARY KEY (uid, recipeId)
);

CREATE TABLE IF NOT EXISTS Recipe_Labels( /* Combined table of Recipes and DietPreferences*/ 
	id INT AUTO_INCREMENT, 
    UNIQUE(id),
    recipeId INT,
    dietId INT, 
    FOREIGN KEY (recipeId) REFERENCES Recipes(id),
    FOREIGN KEY (dietId) REFERENCES DietPreferences(id),
    PRIMARY KEY (recipeId, dietId)
);

CREATE TABLE IF NOT EXISTS Recipe_Foods( /* Combined table of Recipes and Foods*/ 
	id INT AUTO_INCREMENT, 
    UNIQUE(id),
    recipeId INT,
    FoodId INT,
    quantity FLOAT,
    unit INT,
    FOREIGN KEY (recipeId) REFERENCES Recipes(id),
    FOREIGN KEY (FoodId) REFERENCES Foods(id),
    FOREIGN KEY (unit) REFERENCES Units(id),
    PRIMARY KEY (recipeId, FoodId)
);

-- CREATE TABLE IF NOT EXISTS FoodAnalyticalResults( /* Likely wont be used*/
-- 	id INT PRIMARY KEY AUTO_INCREMENT,
--     foodId INT,
--     analyasis_method VARCHAR(100), 
--     QC VARCHAR(100),
--     unit INT,
--     mean FLOAT, 
--     n INT NULL, 
--     sem INT NULL,
--     min INT NULL,
--     max INT NULL,
--     FOREIGN KEY (unit) REFERENCES Units(id),
--     FOREIGN KEY (foodId) REFERENCES Foods(id)
-- );

-- CREATE TABLE IF NOT EXISTS LiteraryReferences( /* Likely wont be used*/
-- 	refId INT PRIMARY KEY AUTO_INCREMENT, 
--     source_name VARCHAR(255),
--     first_author VARCHAR(100),
--     publication VARCHAR (255),
--     publish_month DATE NULL, 
--     publish_year YEAR
-- );

-- CREATE TABLE IF NOT EXISTS Result_References( /* Likely wont be used*/
-- 	id INT AUTO_INCREMENT, 
--     UNIQUE(id),
--     resultId INT, 
--     refId INT, 
--     FOREIGN KEY (resultId) REFERENCES (FoodAnalyticalResults),
-- 	FOREIGN KEY (refId) REFERENCES (LiteraryReferences),
--     PRIMARY KEY (resultId, refId)
-- );

