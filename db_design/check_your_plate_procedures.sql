-- Stored Procedures for check_your_plate

-- Function for recipe creation, capture the id of the generated recipe
DROP FUNCTION create_recipe;
DROP PROCEDURE display_food_nutrition;
DROP PROCEDURE add_ingredient;
DROP PROCEDURE show_recipe_ingredients;


DELIMITER //
CREATE FUNCTION create_recipe(recipeName VARCHAR(255), descrip TEXT, userIdNum INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE recipe_id INT;
    SELECT NOW() INTO @currentTime;
    INSERT INTO recipes(name, description, author, createDate) VALUES (recipeName, descrip, userIdNum, @currentTime);
    SET recipe_id = LAST_INSERT_ID();  -- Capture the id of the newly inserted recipe
    RETURN recipe_id;  -- Return the captured id
    
END //
DELIMITER ;


-- Display all nutrient of a given food (query by id)
DELIMITER //
CREATE PROCEDURE display_food_nutrition (IN foodIDNum INT)
BEGIN     
    SELECT F.name, Fn.foodID, S.id, S.name, Fn.amount, Fn.unit 
	FROM Foods F
	RIGHT JOIN Food_nutrients Fn 
	ON F.id = Fn.foodID
	INNER JOIN Substances S 
	ON Fn.SubsID = S.id
	WHERE Fn.foodID = foodIDNum ORDER BY Fn.amount DESC;
    
END //
DELIMITER ;


DELIMITER //
-- Add individaul ingredient into an existing recipe
CREATE PROCEDURE add_ingredient (recipeIdNum INT, foodID INT, amount FLOAT, useUnit INT)
BEGIN
    INSERT INTO recipe_foods(recipeId, FoodId, quantity, unit) VALUES (recipeIdNum, foodID, amount, useUnit);
END //
DELIMITER ;


-- Show all ingredients of an existing recipe
DELIMITER //
CREATE PROCEDURE show_recipe_ingredients(IN recipeIdNum INT)
BEGIN     
    SELECT R.name AS RecipeName, F.name AS FoodName, Rf.quantity, U.name AS UnitName
    FROM Recipes R
    INNER JOIN Recipe_Foods Rf ON R.id = Rf.recipeId
    INNER JOIN Foods F ON Rf.FoodID = F.id
    INNER JOIN Units U ON Rf.unit = U.id
    WHERE R.id = recipeIdNum;
END //

DELIMITER ;



-- DELIMITER //
-- -- Repeatedly add ingredient to a recipe
-- CREATE PROCEDURE repeat_add_ingredient(times INT, recipeIdNum INT, foodID INT, amount FLOAT, useUnit INT)
-- BEGIN
--     DECLARE counter INT DEFAULT 0;

--     WHILE counter < times DO
--         CALL add_ingredient(recipeIdNum, foodID, amount, useUnit);
--         SET counter = counter + 1;
--     END WHILE;
-- END //
-- DELIMITER ;



