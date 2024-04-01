## Database Design for "Check Your Plate" Application

### **Users Table**
- `UserID` (Primary Key)
- `Email`
- `Password`
- `Gender` (Optional)
- `Age` (Optional)
- `RegistrationDate`

### **Food Items Table**
- `FoodID` (Primary Key)
- `Name`
- `CategoryID`

### **Food Categories Table**
- `CategoryID` (Primary Key)
- `CategoryName`

### **Nutrients Table**
- `NutrientID` (Primary Key)
- `Name`
- `RecommendedDailyAmount`

### **FoodNutrients Table**
- `FoodNutrientID` (Primary Key)
- `FoodID` (Foreign Key)
- `NutrientID` (Foreign Key)
- `Amount`

### **Recipes Table**
- `RecipeID` (Primary Key)
- `UserID` (Foreign Key, Nullable for public recipes)
- `Title`
- `Description`
- `CreationDate`
- `LastUpdateDate`

### **RecipeIngredients Table**
- `RecipeIngredientID` (Primary Key)
- `RecipeID` (Foreign Key)
- `FoodID` (Foreign Key)
- `Quantity`

### **UserWatchlist Table**
- `WatchlistID` (Primary Key)
- `UserID` (Foreign Key)
- `RecipeID` (Foreign Key)

### **HealthAlerts Table**
- `AlertID` (Primary Key)
- `UserID` (Foreign Key)
- `FoodID` (Foreign Key)
- `Description`
- `AlternativeFoodID` (Foreign Key, points to `FoodItems` for alternatives)

### **UserDietPreferences Table**
- `PreferenceID` (Primary Key)
- `UserID` (Foreign Key)
- `NutrientID` (Foreign Key)
- `MinAmount`
- `MaxAmount`
