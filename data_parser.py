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
    else:
        data = data["SurveyFoods"]
    digest = {"foundationFood" : []}
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

        digest['foundationFood'].append(foodItem)

    return json.dumps(digest, indent=4)
    
ff_r_path = "data/USDA_foundation_food.json"  # read from path for foundation food data
ff_w_path = "data/foundation_food_digest.json"  # write to path for foundation food data

data = read_json_file(ff_r_path)  # foundation food
refined_data = data_extractor(data)
write_as_json(ff_w_path, refined_data)


sf_r_path = "data/USDA_survey_food.json"  # read from path for survey food data
sf_w_path = "data/survey_food_digest.json"  # write to path for survey food data

data = read_json_file(sf_r_path)  # survey food
refined_data = data_extractor(data, False)
print(refined_data)
write_as_json(sf_w_path, refined_data)

