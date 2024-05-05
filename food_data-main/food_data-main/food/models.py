from django.db import models



class User(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='user id')
    username = models.CharField(max_length=20, verbose_name='user name')
    password = models.CharField(max_length=20, verbose_name='password')
    email = models.EmailField(verbose_name='email')
    phone = models.CharField(max_length=11, verbose_name='phone')

    img = models.ImageField(upload_to='user/', verbose_name='imge', default='user/default.jpg')

    sex = models.CharField(max_length=10, verbose_name='M/F', default='M')

    age = models.IntegerField(verbose_name='Age', default=18)

    height = models.FloatField(verbose_name='Height', default=170)

    weight = models.FloatField(verbose_name='Weight', default=60)

    blood_pressure = models.CharField(max_length=20, verbose_name='血压', default='120/80')

    diabetes = models.TextField(verbose_name='diabetes', default='false')

    pregnancy = models.TextField(verbose_name='preganent', default='true')

    class Meta:
        db_table = 'user'
        verbose_name = 'user'
        verbose_name_plural = verbose_name



class Recipe(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='recipe id')
    name = models.CharField(max_length=20, verbose_name='recipe name')

    description = models.TextField(verbose_name='description')

    author = models.TextField(verbose_name='author')

    create_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')

    class Meta:
        db_table = 'recipe'
        verbose_name = 'recipe'
        verbose_name_plural = verbose_name



class RecipeFood(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='id')
    recipe_id = models.IntegerField(verbose_name='recipe_id')
    food_id = models.IntegerField(verbose_name='food_id')

    amount = models.FloatField(verbose_name='amount', default=0)

    class Meta:
        db_table = 'recipe_food'
        verbose_name = 'recipe_food'
        verbose_name_plural = verbose_name



class Food(models.Model):
    """
    用于存储食品数据的表。
    列：
    - fdc_id：表的主键。
    - data_type：文本字段，表示数据类型。
    - description：文本字段，表示食品描述。
    - food_category_id：整数字段，表示食品类别的ID。
    - publication_date：文本字段，表示食品数据的发布日期。
    """
    fdc_id = models.IntegerField(primary_key=True, verbose_name="fdc_id")
    data_type = models.TextField(verbose_name="data_type")
    description = models.CharField(max_length=64, verbose_name="description")
    food_category_id = models.IntegerField(verbose_name="food_category_id")
    publication_date = models.TextField(verbose_name="publication_date")

    class Meta:
        db_table = "food"
        verbose_name = "food"
        verbose_name_plural = "food"
        indexes = [
            models.Index(fields=['description'])
        ]
        ordering = ['-fdc_id']


class Nutrient(models.Model):
    """
    用于存储营养素数据的表。
    列：
    - id：表的主键。
    - name：文本字段，表示名称。
    - unit_name：文本字段，表示单位名称。
    - nutrient_nbr：浮点数字段，表示营养素编号。
    - rank：整数字段，表示排名。
    """
    id = models.IntegerField(primary_key=True, verbose_name="ID")
    name = models.TextField(verbose_name="name")
    unit_name = models.TextField(verbose_name="unit_name")
    nutrient_nbr = models.FloatField(verbose_name="nutrient_nbr")
    rank = models.IntegerField(verbose_name="rank")

    class Meta:
        db_table = "nutrient"
        verbose_name = "nutrient"
        verbose_name_plural = "nutrient"
        ordering = ['id']



class FoodNutrient(models.Model):
    """
    用于存储食品营养素数据的表。
    列：
    - id：表的主键。
    - fdc_id：整数字段，表示食品的FDC ID。
    - nutrient_id：整数字段，表示营养素的ID。
    - amount：浮点数字段，表示量。
    - data_points：整数字段，表示数据点。
    - derivation_id：整数字段，表示派生ID。
    - min：浮点数字段，表示最小值。
    - max：浮点数字段，表示最大值。
    - median：浮点数字段，表示中位数。
    - footnote：文本字段，表示脚注。
    - min_year_acquired：整数字段，表示最小年份获取。
    """
    id = models.IntegerField(primary_key=True, verbose_name="ID")
    fdc_id = models.IntegerField(verbose_name="food id")
    nutrient_id = models.IntegerField(verbose_name="nutrient_id")
    amount = models.FloatField(verbose_name="amount")
    data_points = models.IntegerField(verbose_name="data_points")
    derivation_id = models.IntegerField(verbose_name="derivation_id")
    min = models.FloatField(verbose_name="min")
    max = models.FloatField(verbose_name="max")
    median = models.FloatField(verbose_name="median")
    footnote = models.TextField(verbose_name="footnote")
    min_year_acquired = models.IntegerField(verbose_name="min_year_acquired")

    class Meta:
        db_table = "food_nutrient"
        verbose_name = "food_nutrient"
        verbose_name_plural = "food_nutrient"
        ordering = ['fdc_id']



class FoodAttribute(models.Model):
    """
    用于存储食品属性数据的表。
    列：
    - id：表的主键。
    - fdc_id：整数字段，表示食品的FDC ID。
    - seq_num：整数字段，表示序列号。
    - food_attribute_type_id：整数字段，表示食品属性类型的ID。
    - name：文本字段，表示属性名称。
    - value：文本字段，表示属性值。
    """
    id = models.IntegerField(primary_key=True, verbose_name="ID")
    fdc_id = models.IntegerField(verbose_name="FDC ID")
    seq_num = models.IntegerField(verbose_name="seq_num")
    food_attribute_type_id = models.IntegerField(verbose_name="food_attribute_type_id")
    name = models.TextField(verbose_name="name")
    value = models.TextField(verbose_name="value")

    class Meta:
        db_table = "food_attribute"
        verbose_name = "food_attribute"
        verbose_name_plural = "food_attribute"



class FoodAttributeType(models.Model):
    """
    用于存储食品属性类型数据的表。
    列：
    - id：表的主键。
    - name：文本字段，表示属性类型名称。
    - description：文本字段，表示属性类型描述。
    """
    id = models.IntegerField(primary_key=True, verbose_name="ID")
    name = models.TextField(verbose_name="name")
    description = models.TextField(verbose_name="description")

    class Meta:
        db_table = "food_attribute_type"
        verbose_name = "food_attribute_type"
        verbose_name_plural = "food_attribute_type"



class FoodCalorieConversionFactor(models.Model):
    """
    用于存储食品热量转换因子数据的表。
    列：
    - food_nutrient_conversion_factor_id：表的主键。
    - protein_value：浮点数字段，表示蛋白质值。
    - fat_value：浮点数字段，表示脂肪值。
    - carbohydrate_value：浮点数字段，表示碳水化合物值。
    """
    food_nutrient_conversion_factor_id = models.IntegerField(primary_key=True, verbose_name="食品营养素转换因子ID")
    protein_value = models.FloatField(verbose_name="protein_value")
    fat_value = models.FloatField(verbose_name="fat_value")
    carbohydrate_value = models.FloatField(verbose_name="carbohydrate_value")

    class Meta:
        db_table = "food_calorie_conversion_factor"
        verbose_name = "food_calorie_conversion_factor"
        verbose_name_plural = "food_calorie_conversion_factor"



class FoodComponent(models.Model):
    """
    用于存储食品组成成分数据的表。
    列：
    - id：表的主键。
    - fdc_id：整数字段，表示食品的FDC ID。
    - name：文本字段，表示组成成分的名称。
    - pct_weight：浮点数字段，表示百分比重量。
    - is_refuse：布尔字段，表示是否为废物。
    - gram_weight：浮点数字段，表示克重。
    - data_points：整数字段，表示数据点。
    - min_year_acquired：整数字段，表示最小年份获取。
    """
    id = models.IntegerField(primary_key=True, verbose_name="ID")
    fdc_id = models.IntegerField(verbose_name="FDC ID", null=True, blank=True)
    name = models.TextField(verbose_name="name")
    pct_weight = models.FloatField(verbose_name="pct_weight")
    is_refuse = models.BooleanField(verbose_name="is_refuse")
    gram_weight = models.FloatField(verbose_name="gram_weight")
    data_points = models.IntegerField(verbose_name="data_points")
    min_year_acquired = models.IntegerField(verbose_name="min_year_acquired")

    class Meta:
        db_table = "food_component"
        verbose_name = "food_component"
        verbose_name_plural = "food_component"

        ordering = ['id']



class AcquisitionSamples(models.Model):
    """
    用于存储采集样品数据的表。
    列：
    - fdc_id_of_sample_food：整数字段，表示样品食品的FDC ID。
    - fdc_id_of_acquisition_food：整数字段，表示采集食品的FDC ID。
    """
    id = models.AutoField(primary_key=True, verbose_name="ID")
    fdc_id_of_sample_food = models.IntegerField(verbose_name="样品食品FDC ID")
    fdc_id_of_acquisition_food = models.IntegerField(verbose_name="采集食品FDC ID")

    class Meta:
        db_table = "acquisition_samples"
        verbose_name = "采集样品"
        verbose_name_plural = "采集样品"


# 农业样品表
class AgriculturalSamples(models.Model):
    """
    用于存储农业样品数据的表。
    列：
    - fdc_id：表的主键。
    - acquisition_date：日期字段，表示样品采集日期。
    - market_class：文本字段，表示样品的市场类别。
    - treatment：文本字段，表示样品的处理方式。
    - state：文本字段，表示样品的州份。
    """
    fdc_id = models.IntegerField(primary_key=True, verbose_name="FDC ID")
    acquisition_date = models.DateField(verbose_name="采集日期")
    market_class = models.TextField(verbose_name="市场类别")
    treatment = models.TextField(verbose_name="处理方式")
    state = models.TextField(verbose_name="州份")

    class Meta:
        db_table = "agricultural_samples"
        verbose_name = "农业样品"
        verbose_name_plural = "农业样品"


# 食品营养素转换因子表
class FoodNutrientConversionFactor(models.Model):
    """
    用于存储食品营养素转换因子数据的表。
    列：
    - id：表的主键。
    - fdc_id：整数字段，表示食品的FDC ID。
    """
    id = models.IntegerField(primary_key=True, verbose_name="ID")
    fdc_id = models.IntegerField(verbose_name="FDC ID")

    class Meta:
        db_table = "food_nutrient_conversion_factor"
        verbose_name = "食品营养素转换因子"
        verbose_name_plural = "食品营养素转换因子"


# 食品分量表
class FoodPortion(models.Model):
    """
    用于存储食品分量数据的表。
    列：
    - id：表的主键。
    - fdc_id：整数字段，表示食品的FDC ID。
    - seq_num：整数字段，表示序列号。
    - amount：浮点数字段，表示量。
    - measure_unit_id：整数字段，表示度量单位的ID。
    - portion_description：文本字段，表示分量描述。
    - modifier：文本字段，表示修改器。
    - gram_weight：浮点数字段，表示克重。
    - data_points：整数字段，表示数据点。
    - footnote：文本字段，表示脚注。
    - min_year_acquired：整数字段，表示最小年份获取。
    """
    id = models.IntegerField(primary_key=True, verbose_name="ID")
    fdc_id = models.IntegerField(verbose_name="FDC ID")
    seq_num = models.IntegerField(verbose_name="序列号")
    amount = models.FloatField(verbose_name="量")
    measure_unit_id = models.IntegerField(verbose_name="度量单位ID")
    portion_description = models.TextField(verbose_name="分量描述", null=True)
    modifier = models.TextField(verbose_name="修改器")
    gram_weight = models.FloatField(verbose_name="克重")
    data_points = models.IntegerField(verbose_name="数据点")
    footnote = models.TextField(verbose_name="脚注", null=True)
    min_year_acquired = models.IntegerField(verbose_name="最小年份获取")

    class Meta:
        db_table = "food_portion"
        verbose_name = "食品分量"
        verbose_name_plural = "食品分量"


# 食品蛋白质转换因子表
class FoodProteinConversionFactor(models.Model):
    """
    用于存储食品蛋白质转换因子数据的表。
    列：
    - food_nutrient_conversion_factor_id：表的主键。
    - value：浮点数字段，表示值。
    """
    food_nutrient_conversion_factor_id = models.IntegerField(primary_key=True, verbose_name="食品营养素转换因子ID")
    value = models.FloatField(verbose_name="值")

    class Meta:
        db_table = "food_protein_conversion_factor"
        verbose_name = "食品蛋白质转换因子"
        verbose_name_plural = "食品蛋白质转换因子"


# 食品更新日志表
class FoodUpdateLogEntry(models.Model):
    """
    用于存储食品更新日志数据的表。
    列：
    - id：表的主键。
    - description：文本字段，表示描述。
    - last_updated：文本字段，表示最后更新日期。
    """
    id = models.IntegerField(primary_key=True, verbose_name="ID")
    description = models.TextField(verbose_name="描述", null=True, blank=True)
    last_updated = models.TextField(verbose_name="最后更新日期")

    class Meta:
        db_table = "food_update_log_entry"
        verbose_name = "食品更新日志"
        verbose_name_plural = "食品更新日志"


# 基础食品表
class FoundationFood(models.Model):
    """
    用于存储基础食品数据的表。
    列：
    - fdc_id：表的主键。
    - ndb_number：整数字段，表示NDB编号。
    - footnote：文本字段，表示脚注。
    """
    fdc_id = models.IntegerField(primary_key=True, verbose_name="FDC ID")
    ndb_number = models.IntegerField(verbose_name="NDB编号")
    footnote = models.TextField(verbose_name="脚注")

    class Meta:
        db_table = "foundation_food"
        verbose_name = "基础食品"
        verbose_name_plural = "基础食品"


# 输入食品表
class InputFood(models.Model):
    """
    用于存储输入食品数据的表。
    列：
    - id：表的主键。
    - fdc_id：整数字段，表示食品的FDC ID。
    - fdc_of_input_food：整数字段，表示输入食品的FDC ID。
    - seq_num：整数字段，表示序列号。
    - amount：整数字段，表示量。
    - sr_code：文本字段，表示SR码。
    - sr_description：文本字段，表示SR描述。
    - unit：文本字段，表示单位。
    - portion_code：文本字段，表示分量码。
    - portion_description：文本字段，表示分量描述。
    - gram_weight：浮点数字段，表示克重。
    - retention_code：文本字段，表示保留码。
    - survey_flag：文本字段，表示调查标志。
    """
    id = models.IntegerField(primary_key=True, verbose_name="ID")
    fdc_id = models.IntegerField(verbose_name="FDC ID")
    fdc_of_input_food = models.IntegerField(verbose_name="输入食品FDC ID")
    seq_num = models.IntegerField(verbose_name="序列号")
    amount = models.IntegerField(verbose_name="量")
    sr_code = models.TextField(verbose_name="SR码")
    sr_description = models.TextField(verbose_name="SR描述")
    unit = models.TextField(verbose_name="单位")
    portion_code = models.TextField(verbose_name="分量码")
    portion_description = models.TextField(verbose_name="分量描述")
    gram_weight = models.FloatField(verbose_name="克重")
    retention_code = models.TextField(verbose_name="保留码")
    survey_flag = models.TextField(verbose_name="调查标志")

    class Meta:
        db_table = "input_food"
        verbose_name = "输入食品"
        verbose_name_plural = "输入食品"


# 实验方法表
class LabMethod(models.Model):
    """
    用于存储实验方法数据的表。
    列：
    - id：表的主键。
    - description：文本字段，表示描述。
    - technique：文本字段，表示技术。
    """
    id = models.IntegerField(primary_key=True, verbose_name="ID")
    description = models.TextField(verbose_name="描述")
    technique = models.TextField(verbose_name="技术")

    class Meta:
        db_table = "lab_method"
        verbose_name = "实验方法"
        verbose_name_plural = "实验方法"


# 实验方法代码表
class LabMethodCode(models.Model):
    """
    用于存储实验方法代码数据的表。
    列：
    - lab_method_id：整数字段，表示实验方法的ID。
    - code：文本字段，表示代码。
    """
    id = models.AutoField(primary_key=True, verbose_name="ID")
    lab_method_id = models.IntegerField(verbose_name="实验方法ID")
    code = models.TextField(verbose_name="代码")

    class Meta:
        db_table = "lab_method_code"
        verbose_name = "实验方法代码"
        verbose_name_plural = "实验方法代码"


# 实验方法营养素表
class LabMethodNutrient(models.Model):
    """
    用于存储实验方法营养素数据的表。
    列：
    - lab_method_id：整数字段，表示实验方法的ID。
    - nutrient_id：整数字段，表示营养素的ID。
    """
    id = models.AutoField(primary_key=True, verbose_name="ID")
    lab_method_id = models.IntegerField(verbose_name="实验方法ID")
    nutrient_id = models.IntegerField(verbose_name="营养素ID")

    class Meta:
        db_table = "lab_method_nutrient"
        verbose_name = "实验方法营养素"
        verbose_name_plural = "实验方法营养素"


# 市场采购表
class MarketAcquisition(models.Model):
    """
    用于存储市场采购数据的表。
    列：
    - fdc_id：表的主键。
    - brand_description：文本字段，表示品牌描述。
    - expiration_date：日期字段，表示过期日期。
    - label_weight：文本字段，表示标签重量。
    - location：文本字段，表示位置。
    - acquisition_date：日期字段，表示采集日期。
    - sales_type：文本字段，表示销售类型。
    - sample_lot_nbr：文本字段，表示样品批号。
    - sell_by_date：日期字段，表示销售日期。
    - store_city：文本字段，表示商店城市。
    - store_name：文本字段，表示商店名称。
    - store_state：文本字段，表示商店州份。
    - upc_code：文本字段，表示UPC码。
    """
    fdc_id = models.IntegerField(primary_key=True, verbose_name="FDC ID")
    brand_description = models.TextField(verbose_name="品牌描述")
    expiration_date = models.DateField(verbose_name="过期日期")
    label_weight = models.TextField(verbose_name="标签重量")
    location = models.TextField(verbose_name="位置")
    acquisition_date = models.DateField(verbose_name="采集日期")
    sales_type = models.TextField(verbose_name="销售类型")
    sample_lot_nbr = models.TextField(verbose_name="样品批号")
    sell_by_date = models.DateField(verbose_name="销售日期")
    store_city = models.TextField(verbose_name="商店城市")
    store_name = models.TextField(verbose_name="商店名称")
    store_state = models.TextField(verbose_name="商店州份")
    upc_code = models.TextField(verbose_name="UPC码")

    class Meta:
        db_table = "market_acquisition"
        verbose_name = "市场采购"
        verbose_name_plural = "市场采购"


# 测量单位表
class MeasureUnit(models.Model):
    """
    用于存储测量单位数据的表。
    列：
    - id：表的主键。
    - name：文本字段，表示名称。
    """
    id = models.IntegerField(primary_key=True, verbose_name="ID")
    name = models.TextField(verbose_name="名称")

    class Meta:
        db_table = "measure_unit"
        verbose_name = "测量单位"
        verbose_name_plural = "测量单位"


# 营养素表


# 样品食品表
class SampleFood(models.Model):
    """
    用于存储样品食品数据的表。
    列：
    - fdc_id：整数字段，表示食品的FDC ID。
    """
    fdc_id = models.IntegerField(primary_key=True, verbose_name="FDC ID")

    class Meta:
        db_table = "sample_food"
        verbose_name = "样品食品"
        verbose_name_plural = "样品食品"


# 子样品食品表
class SubSampleFood(models.Model):
    """
    用于存储子样品食品数据的表。
    列：
    - fdc_id：表的主键。
    - fdc_id_of_sample_food：整数字段，表示样品食品的FDC ID。
    """
    fdc_id = models.IntegerField(primary_key=True, verbose_name="FDC ID")
    fdc_id_of_sample_food = models.IntegerField(verbose_name="样品食品FDC ID")

    class Meta:
        db_table = "sub_sample_food"
        verbose_name = "子样品食品"
        verbose_name_plural = "子样品食品"


# 子样品结果表
class SubSampleResult(models.Model):
    """
    用于存储子样品结果数据的表。
    列：
    - food_nutrient_id：表的主键。
    - adjusted_amount：浮点数字段，表示调整后的数量。
    - lab_method_id：整数字段，表示实验方法的ID。
    - nutrient_name：文本字段，表示营养素名称。
    """
    food_nutrient_id = models.IntegerField(primary_key=True, verbose_name="食品营养素ID")
    adjusted_amount = models.FloatField(verbose_name="调整后的数量")
    lab_method_id = models.IntegerField(verbose_name="实验方法ID")
    nutrient_name = models.TextField(verbose_name="营养素名称")

    class Meta:
        db_table = "sub_sample_result"
        verbose_name = "子样品结果"
        verbose_name_plural = "子样品结果"
