import json

def read_json_file(filename):
    with open(filename) as file:
        data = json.load(file)    
    return data

def write_as_json(filename, obj):
    with open(filename, 'w') as file:
        json.dump(obj, file, indent=4)

def data_extractor(data, ff = True):
    if ff:
        data = data["FoundationFoods"]
        main_key = "FoundationFood"
        
    else:
        data = data["SurveyFoods"]
        main_key = "SurveyFoods"

    digest = {main_key : []}
    for item in data:
        foodItem = {"fdcId": None, "foodName": None, "nutrients": [], "conversions": None, "portions": None}
        foodItem["foodName"] = item["description"]
        foodItem["fdcId"] = item["fdcId"]
        foodNutrients = item["foodNutrients"]

        for record in foodNutrients:
            bin = {"sourceID": None, "rank": None, "name": None, "unit": None, "amount": None}
            if "amount" in record:
                bin["amount"] = record['amount']
            bin["sourceID"] = record["nutrient"]["number"]
            bin["rank"] = record["nutrient"]["rank"]
            bin["name"] = record["nutrient"]["name"]
            bin["unit"] = record["nutrient"]["unitName"]
            foodItem["nutrients"].append(bin)

        if "nutrientConversionFactors" in item:
            conversions = item["nutrientConversionFactors"]   
            foodItem["conversions"] = conversions

        if "foodPortions" in item:
            portions = item["foodPortions"]
            foodItem["portions"] = portions  

        digest[main_key].append(foodItem)

    return digest
    
ff_r_path = "data/USDA_foundation_food.json"  # read from path for foundation food data
ff_w_path = "data/foundation_food.json"

sf_r_path = "data/USDA_survey_food.json"  # read from path for survey food data
sf_w_path = "data/survey_food.json"

ff_data = read_json_file(ff_r_path)  # foundation food
refined_ff_data = data_extractor(ff_data)
# write_as_json(ff_w_path, refined_ff_data)  # dump as .json file


sf_data = read_json_file(sf_r_path)  # survey food
refined_sf_data = data_extractor(sf_data, False)
# write_as_json(sf_w_path, refined_sf_data)  # dump as .json file


w_path = "data/food_info_digest.json"
data = {**refined_ff_data, **refined_sf_data}  # merge the processed foundation food records and survey food records
write_as_json(w_path, data)  # dump as .json file

